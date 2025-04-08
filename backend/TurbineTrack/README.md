# TurbineTrack Backend

This is the ASP.NET Core Web API backend for TurbineTrack.

## Tech Stack

- ASP.NET Core 8 (Minimal APIs)
- Entity Framework Core (with SQLite)
- Swagger for API documentation

## Setup

```bash
cd backend
dotnet restore
```

## Create the Database

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Run the API

```bash
dotnet run
```

API will run on:

- `http://localhost:5264`
- `https://localhost:7165`

## Project Structure

- `Models/` – The `Turbine` entity
- `Data/` – EF Core DbContext
- `Program.cs` – Minimal API endpoints

## API Endpoints

| Method | Route              | Description             |
|--------|--------------------|--------------------------|
| GET    | `/turbines`        | List all turbines        |
| GET    | `/turbines/{id}`   | Get turbine by ID        |
| POST   | `/turbines`        | Add new turbine          |
| PUT    | `/turbines/{id}`   | Update existing turbine  |
| DELETE | `/turbines/{id}`   | Delete turbine           |

## CORS

The backend is configured to allow requests from `http://localhost:5173`.  
See `Program.cs` for CORS policy.
