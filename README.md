# 🏥 SIH Hospital Demo

A full-stack **Hospital Management System** built with a **Next.js (React.js)** frontend and a **Spring Boot** backend, following a modern client-server REST architecture.

---

## 📌 Project Resources

| Resource | Description | Access Link |
|---|---|---|
| **Live Frontend** | Deployed production React.js application | [Open Application](https://sih-hospital-demo.vercel.app) |
| **API Collection** | Postman collection with backend REST APIs for testing | [Open Postman Collection](https://www.postman.com/springboot-2098/sihhospitaldemo/folder/52teqr9/new-folder) |
| **Drive Link** | Drive folder link for information | [Open Drive folder](https://drive.google.com/drive/folders/18Il3JUkfUguMZlyOFug7bDgh_krOESxk?usp=sharing) |
| **System Workflow** | Architecture and deployment workflow of the application | [View Workflow](#-system-workflow) |

---

## 🏗️ System Workflow

The application follows a **client-server architecture**, where the React.js frontend communicates with the Spring Boot backend through REST APIs, with each layer independently deployed for scalability and reliability.

### Workflow Overview

| Layer | Technology / Service | Responsibility |
|---|---|---|
| **Frontend** | React.js (Next.js) | Provides the user interface and sends requests to the backend |
| **Frontend Deployment** | Vercel | Hosts the production React.js application |
| **API Communication** | Axios | Handles HTTP requests between the frontend and backend |
| **Backend** | Spring Boot | Provides REST APIs and handles application/business logic |
| **Backend Deployment** | Render | Hosts the production backend service |
| **API Testing** | Postman | Used to test and verify backend API endpoints |

### Request Flow

```
User
  │
  ▼
React.js Frontend (Vercel)
  │
  │  HTTP Request / Response
  ▼
Axios
  │
  ▼
Spring Boot REST API (Render)
  │
  ▼
Backend Services
```

---

## 🔗 API Collection

The Postman collection contains all backend endpoints required for development, integration, and API testing.

📂 **[Open Postman API Collection](https://www.postman.com/springboot-2098/sihhospitaldemo/folder/52teqr9/new-folder)**

---

## 🌐 Live Application

The frontend is deployed on **Vercel** and communicates with the deployed **Spring Boot** backend through REST APIs.

🔗 **[Open SIH Hospital Demo](https://sih-hospital-demo.vercel.app)**

---

## 🛠️ Tech Stack Summary

| Category | Technology |
|---|---|
| Frontend Framework | React.js (Next.js) |
| Backend Framework | Spring Boot (Java) |
| HTTP Client | Axios |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| API Testing Tool | Postman |

---

## 📄 License

This project is developed as part of **Smart India Hackathon (SIH)** — Hospital Management System demo.
