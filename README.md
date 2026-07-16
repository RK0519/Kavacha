# Kavacha (ಕವಚ) 🛡️

[![Hackathon Achievement](https://img.shields.io/badge/Advaya%202.0-Recognized-Gold?style=for-the-badge&logo=github)](https://github.com/RK0519/Kavacha)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-blue?style=for-the-badge&logo=expo)](https://expo.dev)

**Kavacha** (meaning *Shield* or *Armor*) is an award-winning fintech cybersecurity solution designed to protect rural banking users from the growing threat of financial fraud and digital phishing. Developed and recognized at the **Advaya 2.0 Hackathon**, Kavacha bridges the digital divide by combining advanced threat triage with an accessible, localized mobile interface.

---

## 🌟 Key Features

* **Bilingual Interface (English & ಕನ್ನಡ):** Designed to support rural banking accessibility, ensuring non-English speakers can confidently navigate online banking security.
* **Dynamic Voice-Guided Navigation:** Powered by a customized Expo-based audio engine, guiding users step-by-step through security features with native Kannada and English voice prompts.
* **Phishing & Scam Detector:** An intuitive interface where users can upload or paste suspicious SMS text, emails, or call logs to analyze phishing risks using pattern-matching algorithms.
* **3-Tier Smart Risk Triage:** An automated engine that classifies processed threats into three actionable severity tiers:
  * 🟢 **Low Risk:** Informational warnings and standard safety recommendations.
  * 🟡 **Moderate Risk:** Suggested account lockdowns, password resets, and educational walkthroughs.
  * 🔴 **High Risk:** Instant emergency response options.
* **One-Tap Emergency Response:** Instant triggers to dial local law enforcement (Cyber Police) and directly contact primary public sector/rural banks to freeze compromised accounts.
* **Background Scan Simulation:** An interactive, in-app demonstration of how automated, non-intrusive background SMS and call scanning protects the device in real-time.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React Native with **Expo** (Cross-platform iOS & Android)
* **Voice Synthesis Engine:** Expo Speech / Customized Audio Utilities
* **Backend Logic:** Node.js, Express (Phishing pattern analysis and triage engine)
---

## 🏗️ System Architecture

    A[User Input: SMS / Email / Voice] --> B[Kavacha App Interface]
    B --> C{Language Engine}
    C -->|English| D[Visual & Voice Guidance]
    C -->|Kannada| E[Visual & Voice Guidance]
    B --> F[Threat Detection Engine]
    F -->|Pattern Matching Algorithms| G{3-Tier Risk Triage}
    G -->|High Risk| H[Emergency Response: Bank/Police Contact]
    G -->|Moderate Risk| I[Security Lockdown Protocol]
    G -->|Low Risk| J[Safety Alerts & Best Practices]

🚀 Getting Started
Follow these instructions to run the Kavacha mobile client locally.

Prerequisites
Make sure you have Node.js installed on your machine. You will also need the Expo Go app installed on your physical iOS or Android device to test the mobile interface.

1. Clone the Repository
git clone [https://github.com/your-username/Kavacha.git](https://github.com/your-username/Kavacha.git)
cd Kavacha

2. Install Dependencies
npm install

3. Start the Expo Server
npx expo start

4. Run on Device
Scan the QR code displayed in your terminal using your phone's camera (iOS) or the Expo Go app (Android) to launch Kavacha instantly.

🏆 Hackathon Recognition
Kavacha was built as a collaborative group project and recognized at Advaya 2.0, a premier hackathon organized by BGSIT. The project was highly praised for its real-world utility, localized approach to cybersecurity, and focus on financial inclusion for rural populations.
