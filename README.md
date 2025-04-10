# TurbineTrack

TurbineTrack is a wind turbine monitoring app with a .NET backend and a modern Vite-based frontend.

---

## 🚀 Getting Started

You can run the app either using Docker or locally.

---

## 🐳 Docker Setup

To build and run the full app stack with Docker:

```bash
task db dup efd
```

This will:
- `db`: Build the Docker containers
- `dup`: Start the containers in the background
- `efd`: Apply EF Core migrations inside the Docker backend container

---

## 💻 Local Development

1. Build both backend and frontend, and apply EF Core migrations locally:

```bash
task b efl
```

2. Then in two separate terminals:

**Backend**
```bash
task rb
```

**Frontend**
```bash
task rf
```

---

## 📦 Task Overview

| Command         | Description                              |
|------------------|------------------------------------------|
| `task b`         | Build both backend and frontend          |
| `task bb`        | Build backend only                       |
| `task bf`        | Build frontend only                      |
| `task rb`        | Run backend locally with `dotnet watch` |
| `task rf`        | Run frontend dev server                  |
| `task db`        | Build Docker containers                  |
| `task dup`       | Start Docker containers (`docker-compose up`) |
| `task ddn`       | Stop and remove Docker containers        |
| `task efd`       | Apply EF Core migrations in Docker       |
| `task efl`       | Apply EF Core migrations locally         |
| `task t`         | Run backend tests                        |

---

## 📝 Notes

- Docker-based development expects containers to be named correctly (`turbinetrack_api_dev` for EF Core migrations).
- Local development requires:
  - [.NET SDK 8+](https://dotnet.microsoft.com/)
  - [Node.js 18+](https://nodejs.org/)
- Run `task` on its own to list all available tasks.

