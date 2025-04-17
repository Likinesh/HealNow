# HealNow 🏥

**HealNow** is a full-stack healthcare management platform designed to bridge the gap between patients and healthcare providers through seamless appointment scheduling, user-friendly dashboards, and secure communication.

---

## 📁 Repository Structure

```
HealNow/
├── admin/      # Admin dashboard (e.g., manage doctors, patients, etc.)
├── client/     # Patient-facing frontend application
├── server/     # Backend REST API
├── .gitignore  # Ignored files/folders for git
└── README.md   # Project overview and instructions
```

---

## ✨ Features

- 👤 **Authentication** for patients and doctors  
- 📅 **Appointment booking** system  
- 🧑‍⚕️ **Doctor management** by admin  
- 📋 **Admin dashboard** for monitoring activities  
- 🖥️ **Responsive UI** for client and admin panels  
- 💬 **Chat app** for client emergency communication  
- 💳 **Payment gateway** integration using Razorpay  
- 🔐 **Secure backend** built with Node.js and MongoDB  

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- React js
- MongoDB (cloud)
- Vercel for deployment

### 🛠️ Installation

Clone the repo:

```bash
git clone https://github.com/Likinesh/HealNow.git
cd HealNow
```

---

### 📦 Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` and add:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Then start the server:

```bash
npm start
```

---

### 🌐 Setup Client (Patient Side)

```bash
cd ../client
npm install
npm start
```

This runs the patient-facing app on `http://localhost:3000`.

---

### 🛠️ Setup Admin Panel

```bash
cd ../admin
npm install
npm start
```

This runs the admin panel on `http://localhost:3000`.

---

## 🧪 Tech Stack

-----------------------------------------
| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React.js                  |
| Backend   | Node.js, Express.js       |
| Database  | MongoDB                   |
| Styling   | Tailwind CSS              |
| Hosting   | Vercel / Render           |
-----------------------------------------

## 🌍 Live Demo

> **Client:** [https://heal-now-client.vercel.app](https://heal-now-client.vercel.app)
> **Admin** [https://heal-now.vercel.app](https://heal-now.vercel.app)

---

## 👥 Contributors

- [@Likithkk](https://github.com/Likithkk)
- [@Rahulreddy4444](https://github.com/Rahulreddy4444)
