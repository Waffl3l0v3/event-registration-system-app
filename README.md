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
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/e-commerce-app?retryWrites=true&w=majority
PORT=5000

PORT=5000
```
