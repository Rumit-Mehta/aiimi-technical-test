# Aiimi Technical Test - User Management System

A full-stack user management application with real-time search functionality, built with FastAPI and React.

## Overview

This application provides a user directory with autocomplete search capabilities and the ability to add new users. It features a Python backend with SQLite database storage and a React frontend with an intuitive user interface.

## Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## Features

- **Real-time Search**: Search users by first or last name with autocomplete (minimum 2 characters)
- **User Details**: View detailed user information including name, job title, phone, and email
- **Add New Users**: Create new user entries with validation
- **Duplicate Prevention**: Enforces unique email addresses and name combinations
- **UK Phone Validation**: Validates UK mobile phone numbers (07xxx or +44 7xxx format)

## Project Structure

```
aiimi-technical-test/
├── backend/
│   ├── main.py              # FastAPI application and API endpoints
│   ├── requirements.txt     # Python dependencies
│   ├── scripts/
│   │   └── add_test_data.py # Database seeding script
│   ├── files/               # Data files (Excel)
│   └── users.db             # SQLite database
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── components/      # React components
│   │   └── assets/          # Static assets
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
├── makefile                 # Build and run commands
└── .gitignore
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aiimi-technical-test
   ```

2. **Set up Python virtual environment**

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

3. **Install dependencies and seed database**

   ```bash
   make setup
   ```

   This will install Python packages and populate the database with test data from Excel files.

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

```bash
make dev
```

This starts both the backend (port 8000) and frontend (port 5173) in development mode.

#### Stop all servers

```bash
make stop
```

### API Endpoints

#### Search Users

```
GET /users?q={search_term}
```

Returns users matching the search term (minimum 2 characters).

**Example Response:**

```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "job_title": "Software Engineer",
    "phone": "07123456789",
    "email": "john.doe@example.com"
  }
]
```

#### Get User by ID

```
GET /users/{user_id}
```

Returns details for a specific user.

#### Create New User

```
POST /users
```

**Request Body:**

```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "job_title": "Product Manager",
  "phone": "07987654321",
  "email": "jane.smith@example.com"
}
```

**Validation Rules:**

- Email must be valid and unique
- First name + last name combination must be unique
- Phone must be a valid UK mobile number (07xxxxxxxxx or +44 7xxxxxxxxx)

**Error Responses:**

- `400` - Invalid phone number format
- `409` - Email or name already exists
- `500` - Server error

## Database Schema

### Users Table

| Column     | Type         | Constraints               |
| ---------- | ------------ | ------------------------- |
| id         | INTEGER      | PRIMARY KEY               |
| first_name | VARCHAR(80)  | NOT NULL, INDEXED         |
| last_name  | VARCHAR(80)  | NOT NULL, INDEXED         |
| job_title  | VARCHAR(120) | NOT NULL                  |
| phone      | VARCHAR(30)  | NOT NULL                  |
| email      | VARCHAR(254) | NOT NULL, UNIQUE, INDEXED |

**Unique Constraints:**

- Email must be unique
- First name + last name combination must be unique

## Environment Configuration

You can customize ports using environment variables:

```bash
BACKEND_PORT=8000 FRONTEND_PORT=5173 make dev
```

## CORS Configuration

The backend is configured to accept requests from:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

Modify `backend/main.py` to add additional origins if needed.

## Troubleshooting

**Port already in use:**

```bash
make stop
```

**Database issues:**
Delete `backend/users.db` and run `make setup` again to recreate and reseed the database.

**Module not found errors:**
Ensure your virtual environment is activated and all dependencies are installed:

```bash
source .venv/bin/activate
pip install -r backend/requirements.txt
cd frontend && npm install
```

## Author

Rumit Mehta
