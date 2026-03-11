# Employee Directory

A full-stack employee directory application built with Django and React. This project was built to learn the Django + React migration pattern — where a traditional Django template app is migrated to a decoupled architecture with a REST API backend and a React TypeScript frontend.

![Employee Directory Screenshot](assets\employeediretorysc.png)

<!-- Replace screenshot.png with an actual screenshot of your app once deployed -->

---

## Tech Stack

**Backend**

- Python 3.11
- Django 5.2
- Django REST Framework
- SimpleJWT (token-based authentication)
- SQLite (development)

**Frontend**

- React 19
- TypeScript
- Vite
- Axios

---

## Features

- JWT-based login and logout
- Employee list with live search (powered by Django REST Framework's SearchFilter)
- Department filter dropdown (client-side)
- Employee detail view
- Create and edit employee form
- Django admin panel for backend data management

---

## Getting Started

### Prerequisites

- Python 3.11 or higher
- Node.js 22 or higher
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-directory.git
cd employee-directory
```

### 2. Set up the backend

Create and activate a virtual environment:

```bash
python -m venv venv --without-pip
venv\Scripts\Activate.ps1
python -m ensurepip --upgrade
```

Install dependencies:

```bash
python -m pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
```

Run migrations and create a superuser:

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
```

### 3. Set up the frontend

Open a second terminal and navigate to the frontend folder:

```bash
cd employee-directory/frontend
npm install
```

---

## Running the App

You need two terminals running simultaneously.

**Terminal 1 — Django backend:**

```bash
cd employee-directory
venv\Scripts\Activate.ps1
cd backend
python manage.py runserver
```

Backend runs at: http://127.0.0.1:8000

**Terminal 2 — React frontend:**

```bash
cd employee-directory/frontend
npm run dev
```

Frontend runs at: http://localhost:5173

Log in at http://localhost:5173 using the superuser credentials you created.

---

## API Endpoints

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| POST   | /api/token/          | Obtain JWT access and refresh tokens   |
| POST   | /api/token/refresh/  | Refresh an access token                |
| GET    | /api/employees/      | List all employees (supports ?search=) |
| POST   | /api/employees/      | Create a new employee                  |
| GET    | /api/employees/{id}/ | Retrieve a single employee             |
| PUT    | /api/employees/{id}/ | Update an employee                     |
| DELETE | /api/employees/{id}/ | Delete an employee                     |

All /api/employees/ endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## Django Admin

The Django admin panel is available at http://127.0.0.1:8000/admin. Log in with your superuser credentials to manage employees directly from the backend.

---

## What I Learned

This project was built to understand how companies migrate from traditional Django template apps to a modern React frontend. The key insight is that the migration pattern involves converting Django's template-based views into REST API endpoints while keeping the Django backend, models, and admin panel largely intact.

Working through this taught me how Django REST Framework serializers act as the translation layer between Python model instances and JSON, how JWT authentication works in a decoupled architecture where React stores a token and attaches it to every request, and how Django's permission system can protect API endpoints from unauthenticated access. It also gave me hands-on experience with Django's migration system, which follows a similar concept to Supabase migrations but expressed in Python.

---

## License

MIT
