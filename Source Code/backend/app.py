# ==========================================================
# 🚀 MAX SPEED HFS-VAE CICIDS2017 BACKEND (STABLE – PORT 5001)
# ==========================================================

import os
import multiprocessing
import time
import traceback

# ==========================================================
# 🔥 CPU + TF PERFORMANCE SETTINGS
# ==========================================================
cpu_count = multiprocessing.cpu_count()

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["OMP_NUM_THREADS"] = str(cpu_count)
os.environ["TF_NUM_INTRAOP_THREADS"] = str(cpu_count)
os.environ["TF_NUM_INTEROP_THREADS"] = str(cpu_count)

import tensorflow as tf

tf.config.optimizer.set_jit(True)
tf.config.threading.set_intra_op_parallelism_threads(cpu_count)
tf.config.threading.set_inter_op_parallelism_threads(cpu_count)

# ==========================================================
# Imports
# ==========================================================
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
from tensorflow.keras.models import load_model, Model
from tensorflow.keras import backend as K

# ==========================================================
# Flask App
# ==========================================================
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
PREDICT_FOLDER = "predictions"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PREDICT_FOLDER, exist_ok=True)

# ==========================================================
# Custom Sampling Layer
# ==========================================================
def sampling(args):
    z_mean, z_log_var = args
    epsilon = K.random_normal(shape=K.shape(z_mean))
    return z_mean + K.exp(0.5 * z_log_var) * epsilon

# ==========================================================
# Load Models (ONCE)
# ==========================================================
print("🚀 Loading models...")

hfs_vae = load_model(
    "hfs_vae_model.h5",
    custom_objects={"sampling": sampling},
    compile=False
)

encoder = Model(
    inputs=hfs_vae.inputs,
    outputs=hfs_vae.layers[-3].output
)

@tf.function(jit_compile=True)
def encode_fast(inputs):
    return encoder(inputs, training=False)

scaler = joblib.load("scaler.pkl")
FEATURES = joblib.load("features.pkl")
xgb_model = joblib.load("xgb_model.pkl")

input_shapes = [int(inp.shape[-1]) for inp in hfs_vae.inputs]

print("✅ Models loaded successfully")

# ==========================================================
# ⚡ CSV PREDICTION ENGINE (SAFE)
# ==========================================================
def predict_csv(file_path):

    chunk_size = 200000
    total_flows = total_attacks = total_normal = 0

    output_file = os.path.join(
        PREDICT_FOLDER,
        "predicted_" + os.path.basename(file_path)
    )

    write_header = True

    reader = pd.read_csv(
        file_path,
        chunksize=chunk_size,
        engine="c",
        encoding="ISO-8859-1",
        low_memory=False
    )

    print("⚡ Prediction started...")

    for chunk in reader:

        model_input = chunk[FEATURES].to_numpy(dtype=np.float32, copy=False)
        np.nan_to_num(model_input, copy=False, posinf=0, neginf=0)
        np.clip(model_input, -1e6, 1e6, out=model_input)

        model_input = scaler.transform(model_input)

        splits = np.split(
            model_input,
            np.cumsum(input_shapes)[:-1],
            axis=1
        )

        latent = encode_fast(splits).numpy()

        scores = xgb_model.predict_proba(latent)[:, 1]
        labels = (scores > 0.10).astype(np.int8)

        total_flows += len(labels)
        total_attacks += labels.sum()
        total_normal += len(labels) - labels.sum()

        # SAFE label handling
        label_cols = [c for c in chunk.columns if "label" in c.lower()]
        if label_cols:
            real_class = np.where(
                chunk[label_cols[0]].values == "BENIGN",
                "BENIGN",
                "ATTACK"
            )
        else:
            real_class = ["UNKNOWN"] * len(chunk)

        predicted_class = np.where(labels == 1, "ATTACK", "BENIGN")

        chunk["Attack_Score"] = scores
        chunk["Class"] = real_class
        chunk["Predicted_Label"] = labels
        chunk["Predicted_Class"] = predicted_class

        chunk.to_csv(
            output_file,
            mode="a",
            header=write_header,
            index=False
        )

        write_header = False
        print(f"⚡ {total_flows:,} flows processed")

    print("🚀 Prediction finished")

    return {
        "total_flows": int(total_flows),
        "normal": int(total_normal),
        "attacks": int(total_attacks),
        "output_csv": output_file
    }

# ==========================================================
# API ROUTE
# ==========================================================
@app.route("/predict_csv", methods=["POST"])
def predict_from_csv():

    start_time = time.time()
    file_path = None

    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        result = predict_csv(file_path)
        result["processing_time_sec"] = round(time.time() - start_time, 2)

        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

    finally:
        if file_path and os.path.exists(file_path):
            os.remove(file_path)

# ==========================================================
# RUN SERVER (PORT 5001 – FINAL)
# ==========================================================
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001,
        debug=False,
        use_reloader=False,
        threaded=True
    )
