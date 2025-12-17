# Taskaura

Taskaura is a full-stack task management application built with a Spring Boot backend and a React frontend. It allows users to manage their projects and tasks efficiently.

## Features

*   **User Authentication:** Secure user registration and login with JWT authentication.
*   **Project Management:** Create, view, update, and delete projects.
*   **Task Management:** Create, view, update, and delete tasks within projects.
*   **Search Functionality:** Easily search for projects.
*   **Responsive UI:** A modern and responsive user interface built with React.

## Technologies

### Backend

*   **Java 21**
*   **Spring Boot 3**
    *   Spring Data JPA
    *   Spring Security
    *   Spring Web
*   **PostgreSQL**
*   **JJWT (JSON Web Token)** for authentication
*   **Maven** for dependency management

### Frontend

*   **React 19**
*   **Vite**
*   **TypeScript**
*   **TanStack React Query** for data fetching and state management
*   **Axios** for HTTP requests
*   **React Router** for routing
*   **Zod** for validation
*   **Lucide React** for icons

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   **Java 21** or higher
*   **Node.js v18** or higher
*   **npm**
*   **PostgreSQL**

### Installation

**Backend**

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd taskaura/taskaura_backend
    ```

2.  **Set up the database:**
    *   Create a PostgreSQL database.
    *   Create a `.env` file in the `taskaura_backend` directory and add the following environment variables:
        ```
        DB_URL=jdbc:postgresql://localhost:5432/your_db_name
        DB_USERNAME=your_db_username
        DB_PASSWORD=your_db_password
        JWT_SECRET=your_super_secret_key_for_jwt
        JWT_EXPIRATION=86400000
        ```

3.  **Run the backend server:**
    *   On Linux/macOS:
        ```sh
        ./mvnw spring-boot:run
        ```
    *   On Windows:
        ```sh
        mvnw.cmd spring-boot:run
        ```
    *   The backend will be running at `http://localhost:8081`.

**Frontend**

1.  **Navigate to the frontend directory:**
    ```sh
    cd ../taskaura_Frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the frontend development server:**
    ```sh
    npm run dev
    ```
    *   The frontend will be running at `http://localhost:3000`.

## API Endpoints

### Auth

*   `POST /api/auth/signin`: Authenticate user and get JWT token.
*   `POST /api/auth/signup`: Register a new user.
*   `POST /api/auth/signout`: Sign out the current user.
*   `GET /api/auth/user`: Get current user details.

### Projects

*   `GET /api/projects`: Get all projects for the current user.
*   `POST /api/projects`: Create a new project.
*   `GET /api/projects/{id}`: Get a project by ID.
*   `PUT /api/projects/{id}`: Update a project by ID.
*   `DELETE /api/projects/{id}`: Delete a project by ID.

### Tasks

*   `GET /api/projects/{projectId}/tasks`: Get all tasks for a project.
*   `POST /api/projects/{projectId}/tasks`: Create a new task for a project.
*   `PUT /api/tasks/{taskId}`: Update a task by ID.
*   `DELETE /api/tasks/{taskId}`: Delete a task by ID.

## Project Structure

```
.
├── taskaura_backend
│   ├── src
│   │   ├── main
│   │   │   ├── java/com/taskaura
│   │   │   │   ├── controller
│   │   │   │   ├── dto
│   │   │   │   ├── entity
│   │   │   │   ├── repository
│   │   │   │   ├── security
│   │   │   │   └── service
│   │   │   └── resources
│   └── pom.xml
└── taskaura_Frontend
    ├── src
    │   ├── components
    │   ├── context
    │   ├── hooks
    │   ├── lib
    │   ├── pages
    │   ├── App.tsx
    │   └── index.tsx
    └── package.json
```