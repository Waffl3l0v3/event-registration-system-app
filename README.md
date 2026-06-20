# 🎪 EventSphere — Event Registration System

A full-stack **MERN** (MongoDB · Express · React · Node.js) web application that lets users register for events by submitting their details, which are stored in a cloud-hosted MongoDB database.

---

## 🚀 Features

- **Event Registration Form** — Collects name, email, phone, event selection, college, year of study, and an optional message
- **Duplicate Guard** — Prevents the same email from registering for the same event twice
- **All Registrations View** — Live searchable card grid of every submission
- **Delete Registration** — Remove any entry with a single click
- **Cloud Database** — Data persisted to MongoDB Atlas
- **Modern UI** — Dark-themed, glassmorphism design with gradient accents and smooth animations

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite 5, Axios             |
| Backend   | Node.js ≥18, Express 4              |
| Database  | MongoDB Atlas via Mongoose          |
| Dev Tools | Nodemon, Concurrently, ESLint       |

---

## 📁 Project Structure

```
event-registration-sys/
├── package.json          # Root orchestration scripts
├── client/               # React + Vite frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── registrationApi.js
│   │   ├── components/
│   │   │   ├── RegistrationForm.jsx
│   │   │   ├── RegistrationForm.css
│   │   │   ├── RegistrationList.jsx
│   │   │   └── RegistrationList.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── vite.config.js    # Proxy: /api → localhost:5000
│   └── .npmrc            # legacy-peer-deps=true
└── server/               # Express + Mongoose backend
    ├── models/
    │   └── Registration.js
    ├── controllers/
    │   └── registrationController.js
    ├── routes/
    │   └── registrationRoutes.js
    ├── server.js
    └── .env              # MONGO_URI, PORT
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js **v18+**
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/Waffl3l0v3/event-registration-system-app.git
cd event-registration-system-app
```

### 2. Configure environment variables

Create (or update) `server/.env`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 3. Install all dependencies

```bash
npm run install-all
```

This installs packages for the root, server, and client in one command.

### 4. Start the development servers

```bash
npm start
```

| Service  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost:5173      |
| Backend  | http://localhost:5000      |
| API Test | http://localhost:5000/api/test |

> **Port conflict?** If port 5000 is in use, run:
> ```powershell
> $pids = (Get-NetTCPConnection -LocalPort 5000 -EA SilentlyContinue).OwningProcess | Sort-Object -Unique
> $pids | ForEach-Object { Stop-Process -Id $_ -Force }
> ```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

| Method   | Endpoint                          | Description                        |
|----------|-----------------------------------|------------------------------------|
| `POST`   | `/registrations`                  | Register a user for an event       |
| `GET`    | `/registrations`                  | Fetch all registrations            |
| `GET`    | `/registrations/event/:eventName` | Fetch registrations for one event  |
| `DELETE` | `/registrations/:id`              | Delete a registration by ID        |

### Sample POST body

```json
{
  "name": "Rewa Shete",
  "email": "rewa@example.com",
  "phone": "+91 98765 43210",
  "eventName": "TechFest 2026",
  "college": "PICT, Pune",
  "year": "TE",
  "message": "Looking forward to it!"
}
```

---

## 🗃️ Data Model

**Registration** (`server/models/Registration.js`)

| Field       | Type   | Required | Notes                              |
|-------------|--------|----------|------------------------------------|
| `name`      | String | ✅       | Full name                          |
| `email`     | String | ✅       | Validated format, lowercase        |
| `phone`     | String | ✅       |                                    |
| `eventName` | String | ✅       | Must match one of the listed events|
| `college`   | String | —        | Optional                           |
| `year`      | String | —        | FE / SE / TE / BE / Other          |
| `message`   | String | —        | Optional query or note             |
| `createdAt` | Date   | auto     | Mongoose timestamp                 |

---

## 📜 Root Scripts

| Script              | Description                                       |
|---------------------|---------------------------------------------------|
| `npm run install-all` | Install root + server + client dependencies     |
| `npm start`         | Run server (port 5000) and client (port 5173) concurrently |
| `npm run start-server` | Run only the Express server (nodemon)          |
| `npm run start-client` | Run only the Vite dev server                   |
| `npm run build`     | Build the React client for production            |
| `npm run start-prod`| Start the server in production mode             |

---

## 🖼️ Screenshots

> Register tab — submit your details to secure a spot at any listed event.

> All Registrations tab — searchable card grid showing every submission with a delete option.

---

## 📄 License

This project was built as a practical MERN stack lab assignment.
