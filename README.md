# 🔐 HFS-VAE  
## Hierarchical Feature-Splitting Variational Autoencoder for Interpretable and Robust Network Intrusion Detection

---



## 👥 Team Info

- **22471A05D1 — Shaik Mohammad Thaheer**  
  🔗 https://www.linkedin.com/in/skthaheer/ 
  **Work Done:** Dataset preprocessing, feature grouping, evaluation, paper writing

- **22471A0585 — Derangula Durga Rao**  
  🔗 https://www.linkedin.com/in/durga-rao-derangula-708648276/
  **Work Done:** XGBoost classifier integration, hyperparameter tuning

- **22471A05C9 — Shaik Mannepalli Mastanvali**  
  🔗 https://www.linkedin.com/in/siddi-venkatesh-5689a4319/  
  **Work Done:** Visualization (PCA, MLE), result analysis, documentation

---

## 🧠 Abstract

Modern enterprise networks face increasingly complex cyber threats, making robust and interpretable Network Intrusion Detection Systems (NIDS) essential. While deep learning–based anomaly detection models such as Variational Autoencoders (VAEs) achieve strong detection performance, they often lack transparency and robustness.

This project proposes **HFS-VAE**, a **Hierarchical Feature-Splitting Variational Autoencoder** that partitions network traffic features into semantic groups and processes them through parallel encoder branches. The fused latent representation improves anomaly localization, interpretability, and robustness.

Experiments on **CICIDS2017** and **NSL-KDD** demonstrate competitive detection performance with strong Average Precision and clear latent separation, highlighting the practical applicability of HFS-VAE for enterprise-scale intrusion detection.

---

## 📚 Paper Reference (Inspiration)

**NIDS-Vis: Improving the Generalized Adversarial Robustness of Network Intrusion Detection System**  
K. He, D. D. Kim, M. R. Asghar  
https://doi.org/10.1016/j.cose.2024.104028  

This IEEE/Elsevier paper inspired the feature-partitioning strategy, robustness evaluation, and visualization-driven analysis adopted in this project.

---

## 🚀 Our Improvement Over Existing Paper

- Extended NIDS-Vis from IoT-only datasets to **enterprise-scale datasets**
- Used **CICIDS2017 and NSL-KDD** instead of IoT-limited traffic
- Introduced **hierarchical multi-branch VAE encoders**
- Added **classifier fusion using XGBoost**
- Integrated **distributional loss and robustness regularization**
- Improved **latent interpretability** using PCA, MLE, and boundary analysis

---

## 🛠️ About the Project

### What the project does
Detects malicious network traffic using a deep learning–based anomaly detection framework.

### Why it is useful
Traditional IDS struggle with zero-day attacks and provide little explanation. HFS-VAE balances detection accuracy with interpretability.

### Project Workflow

Network Traffic  
→ Preprocessing & Feature Grouping  
→ Parallel VAE Encoders  
→ Fused Latent Representation  
→ XGBoost Classifier  
→ Intrusion Prediction

---

## 📊 Dataset Used

### CICIDS2017
https://www.unb.ca/cic/datasets/ids-2017.html  

- Enterprise-like network traffic
- 80 numerical features
- 15+ attack categories

### NSL-KDD
https://www.unb.ca/cic/datasets/nsl.html  

- Improved version of KDD’99
- 41 features
- Reduced redundancy and imbalance

Labels are converted to **Benign (0)** and **Attack (1)**.

---

## 📦 Dependencies Used

- Python 3.10
- PyTorch
- Scikit-learn
- XGBoost
- NumPy
- Pandas
- Matplotlib

---

## 🔍 EDA & Preprocessing

- Removal of missing and infinite values
- Dropping IP addresses, ports, and identifiers
- Min–Max normalization
- Feature grouping into:
  - Flow-level features
  - Packet-level features
  - Protocol and flag indicators
- One-class anomaly detection using benign-only training

---

## 🏋️ Model Training Info

- Architecture: Hierarchical multi-branch Variational Autoencoder
- Parallel encoders with fused latent space
- Optimizer: Adam
- Learning rate: 1e-3
- Batch size: 256
- Epochs: 100
- Classifier: XGBoost trained on latent embeddings

---

## 🧪 Model Testing / Evaluation

### Evaluation Metrics
- Average Precision (AP)
- F1-Score
- AUC-ROC

### Analysis Methods
- PCA-based latent visualization
- Maximum Likelihood Estimation (MLE)
- Precision–Recall threshold optimization

Evaluation performed on both **CICIDS2017** and **NSL-KDD** datasets.

---

## 📈 Results

### CICIDS2017
- Average Precision: **0.8412**
- F1-Score: **0.7463**
- AUC: **~0.88**

### NSL-KDD
- Average Precision: **0.9234**
- F1-Score: **0.7371**

Latent-space visualizations show clear separation between benign and attack samples, validating effective feature disentanglement.

---

## ⚠️ Limitations & Future Work

### Limitations
- Recall is lower than precision at strict thresholds
- Evaluation limited to two benchmark datasets

### Future Work
- Adaptive thresholding to improve recall
- Real-time and streaming IDS support
- Optimization for IoT and edge devices
- Evaluation on additional modern datasets

---

## 🚀 Deployment Info

- Suitable for enterprise NIDS pipelines
- Lightweight inference (<5 ms per flow)
- Modular and scalable architecture
- Easy integration with SOC / SIEM systems

---

## 📌 Conclusion

HFS-VAE provides a **structured, interpretable, and robust** intrusion detection framework that bridges academic research and real-world cybersecurity deployment. While recall optimization remains an open challenge, the model demonstrates strong precision, clear latent separation, and practical usability.

---

⭐ If you find this project useful, consider giving it a star!
