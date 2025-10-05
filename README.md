# ResumeRAG – Resume Retrieval & Candidate Matching Web Service

## Project Overview

**ResumeRAG** is a full-stack web application that allows users to:

- Upload resumes (PDF, DOCX, TXT, or ZIP containing multiple resumes)
- Create job listings with descriptions and requirements
- Automatically match resumes to jobs based on requirement matching and generate scores
- Retrieve top candidate matches for a job, along with missing requirements and evidence snippets

This project includes:

- **Backend**: Node.js, Express, MongoDB (Atlas or local)
- **Frontend**: React (Vite) consuming the REST API
- **Features**: Resume parsing, TF-IDF search, job creation, candidate matching, CORS-enabled for frontend-backend communication

---

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Backend API](#backend-api)
6. [Deployment](#deployment)
7. [License](#license)
8. [Author](#author)

---

## Features

- Upload single or multiple resumes (support for `.zip` archives)
- Parse resumes into text and sentences for analysis
- Create jobs with requirement extraction from description
- Match resumes to jobs and calculate scores based on missing requirements
- Evidence snippets highlight matching parts of resumes
- TF-IDF-based query search on uploaded resumes

---

## Technologies

- **Backend**: Node.js, Express, Mongoose, Multer, PDF-Parse, Mammoth, Natural (NLP)
- **Database**: MongoDB Atlas / Local
- **Frontend**: React, Axios, Vite
- **Deployment**: Render (Backend), Vercel (Frontend)
- **File Handling**: ZIP extraction (adm-zip), UUID naming, PII redaction

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (Atlas cluster recommended)
- npm / yarn

### Clone the Repository

git clone <https://github.com/Jaivanth9/ResumeRAG>
cd backend
Install Dependencies
npm install

Start the Server (Local)
npm start


Server runs on http://localhost:4000 by default.

cd frontend
Install Dependencies
npm install

Start the Server (Local)
npm run dev

Server runs on http://localhost:5173 by default.

### Environment Variables

Create a .env file in the backend directory:

PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/resumerag?retryWrites=true&w=majority&tls=true
UPLOAD_DIR=uploads


Frontend .env file (React/Vite):

VITE_API=https://yourbackend-url.onrender.com

---

### Backend API Endpoints
Resumes

POST /api/resumes – Upload single or ZIP resumes

GET /api/resumes – List resumes with optional query and pagination

GET /api/resumes/:id – Get full text (PII-redacted for non-recruiters)

POST /api/resumes/ask – Query resumes using TF-IDF

Jobs

POST /api/jobs – Create a new job with description

POST /api/jobs/:id/match – Match resumes to job, return top candidates

## Deployment
Backend (Render)

Create a new Web Service on Render

Connect your GitHub repository

Root Directory: backend

Build Command: npm install

Start Command: npm start

Add environment variables in Render dashboard

Frontend (Vercel)

Deploy frontend React project to Vercel

Add environment variable: VITE_API=https://<your-backend-url>

Ensure CORS on backend allows frontend origin

## License

MIT License – Free to use and modify


---

You can create a new file called `README.md` in your **VS Code project root**, paste this content, and it will render beautifully with proper Markdown formatting.  

If you want, I can also create a **Frontend README** that includes **how to connect Axios calls to this backend** and **Vite environment setup** for your React app.  

Do you want me to make that too?

## Author

**Jaivanth Koppula**  
- GitHub: [https://github.com/Jaivanth9](https://github.com/Jaivanth9)  
- LinkedIn: [https://www.linkedin.com/in/jaivanth-koppula](https://www.linkedin.com/in/jaivanth-koppula)  
- Email: jaivanthkoppula999@gmail.com 

