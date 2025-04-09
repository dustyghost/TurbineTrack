# TurbineTrack Frontend

This is the React + TypeScript frontend for the TurbineTrack app, which allows users to view, create, and manage wind turbines.

## 🚀 Tech Stack

- Vite
- React
- TypeScript
- React Router
- Axios

## 📦 Setup

```bash
cd frontend
npm install
```

## 🧪 Run Dev Server

```bash
npm run dev
```

## 🌐 API Configuration

By default, the app talks to the backend at `http://localhost:5264`.

You can change this by editing `.env`:

```env
VITE_API_BASE_URL=http://localhost:5264
```

## 📁 Folder Structure

- `src/api` – Axios API layer
- `src/turbines` – Feature components (list, detail, form)
- `src/App.tsx` – Main routing logic

## ✅ Features

- View turbine list
- See individual turbine details
- Add a new turbine
