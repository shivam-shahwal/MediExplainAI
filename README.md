# MediExplain AI 🩺

> **Educational Medical Report Explanation Tool powered by AI**

MediExplain AI is an educational web application that helps users understand complex medical terminology, laboratory measurements, and medical reports in simple, easy-to-understand language.

The application uses **Google Gemini AI** to analyze uploaded medical reports and provide educational explanations while clearly communicating that it is **not a diagnostic or medical advice tool**.

---

## ✨ Features

- 📄 **Medical PDF Report Analysis**
  - Upload medical reports in PDF format.
  - Supports multi-page reports.
  - AI analyzes report text, tables, layout, and visual information.

- 🤖 **AI-Powered Explanations**
  - Uses Google Gemini AI.
  - Converts complex medical terminology into simpler explanations.
  - Helps users understand laboratory measurements and report information.

- 📊 **Lab Result Understanding**
  - Identifies values outside the reference ranges printed on the report.
  - Provides educational context around medical measurements.

- 🔒 **Privacy-Focused Processing**
  - Uploaded files are processed in memory.
  - Files are not permanently stored.
  - No medical reports are saved to persistent storage.

- ⚠️ **Medical Disclaimer**
  - Clearly communicates that the application is for educational purposes only.
  - Does not diagnose diseases or prescribe treatments.

- 📱 **Responsive Interface**
  - Designed for desktop and mobile devices.
  - Clean and user-friendly interface.

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- Multer

### AI
- Google Gemini API
- `@google/genai`

### Deployment
- Vercel
- GitHub

---

## 🏗️ Project Structure

```text
MediExplain-AI/
│
├── api/
│   └── index.ts              # Express API & Gemini integration
│
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/                # Application pages
│   └── ...
│
├── public/                   # Static assets
├── assets/                   # Project assets
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json               # Vercel serverless configuration
└── README.md
