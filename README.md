# TaskAura - Full-Stack Project Management App

## About The Project

Taskaura is a complete full-stack application for managing projects and their associated tasks, built as a technical assessment for an internship. It allows users to manage their work efficiently through a modern, responsive, and secure web interface.

## Features

### 🔐 User Authentication & Security
*   **Secure Sign Up & Login:** JWT-based authentication with HTTP-only cookies.
*   **Role-Based Access Control:** Secure endpoints protected by Spring Security.
*   **Session Management:** Secure sign-out functionality.

### 📊 Dashboard & Analytics
*   **Real-time Statistics:** View total projects, average progress, and task completion rates at a glance.
*   **Visual Data:** Interactive charts (Recharts) showing task distribution.
*   **Progress Tracking:** Visual progress bars for individual projects.

### 📁 Project Management
*   **CRUD Operations:** Create, read, update, and delete projects seamlessly.
*   **Smart Search:** Filter projects instantly with a search bar.
*   **Pagination:** Efficiently manage large numbers of projects with server-side pagination.
*   **Responsive Grid:** Beautiful grid layout adapting to all screen sizes.

### ✅ Task Management
*   **Granular Control:** Add, edit, delete, and toggle completion status of tasks.
*   **Advanced Filtering:** Filter tasks by status (Completed/Pending).
*   **Sorting Options:** Sort tasks by date or name in ascending/descending order.
*   **Due Date Tracking:** Set and view due dates for better time management.

### 🎨 User Experience (UX)
*   **Modern Interface:** Clean, minimalist design using Tailwind CSS.
*   **Dark Mode Support:** Fully optimized for both light and dark themes.
*   **Internationalization (i18n):** Multi-language support for global accessibility.
*   **Responsive Design:** Flawless experience across desktop, tablet, and mobile.
*   **Interactive Feedback:** Loading states, error handling, and confirmation modals.

> [!NOTE]
> **NB: Data Population**
> By default, the application connects to an empty database. If you want to test the app with pre-populated data (users, projects, tasks), I have included a seeding script.
> 
> 1.  Navigate to `taskaura_backend/src/main/java/com/taskaura/config/DataSeeder.java`.
> 2.  **Uncomment** the entire file 
> 3.  Restart the backend server. The database will be automatically populated with sample data generated using **JavaFaker**.
>
> **Finding Login Credentials:**
> To access the application with the seeded data:
> 1.  Go to your **Neon Console**.
> 2.  Navigate to your project and select the **Tables** tab.
> 3.  Click on the `users` table.
> 4.  Copy an `email` address from any user for login.
> 5.  The default password for all seeded users is `password`.
> *Alternatively, you can simply Sign Up with a new account.*

## Technologies

### Backend

*   **Java 21**
*   **Spring Boot 3**
    *   **Spring Data JPA** for ORM
    *   **Spring Security** for authentication and authorization
    *   **Spring Web** for building RESTful APIs
    *   **Spring Validation** for input validation
*   **PostgreSQL** (Database)
*   **JJWT (JSON Web Token)** (0.13.0) for secure stateless authentication
*   **ModelMapper** (3.2.6) for entity-DTO mapping
*   **Spring Dotenv** (4.0.0) for environment variable management
*   **Lombok** for reducing boilerplate code
*   **JavaFaker** (1.0.2) for generating test data
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
*   **Recharts** for charts
*   **i18next** for internationalization

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   **Java 21** or higher
*   **Node.js v18** or higher
*   **npm**
*   **PostgreSQL**
*   **Docker** (Optional, for containerized deployment)

### Installation

#### Using Docker (Recommended)

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd taskaura
    ```

2.  **Run with Docker Compose:**
    ```sh
    docker-compose up --build
    ```
    *   The backend will be running at `http://localhost:8081`.
    *   The frontend will be running at `http://localhost:3000`.

#### Manual Installation

**Backend**

1.  **Navigate to the backend directory:**
    ```sh
    cd taskaura_backend
    ```

2.  **Set up the database:**
    
    This project uses **PostgreSQL**. You can use a local instance or a cloud provider. We recommend **Neon**, a serverless PostgreSQL platform, for its ease of use and scalability.

    **Using Neon (Recommended):**
    *   Sign up at [Neon.tech](https://neon.tech).
    *   Create a new project to get a ready-to-use PostgreSQL database.
    *   In the **Dashboard**, find your **Connection Details**.
    *   Select **Java** or **Generic** to view the parameters.
    *   *Note: Neon provides a secure connection string (SSL).*

    **Configuration:**
    *   Create a `.env` file in the `taskaura_backend` directory.
    *   Add the following environment variables (replace with your actual Neon or local credentials):
        ```env
        # Example Neon URL: jdbc:postgresql://ep-cool-frog-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
        DB_URL=jdbc:postgresql://<your-neon-hostname>/<your-db-name>?sslmode=require
        DB_USERNAME=your_neon_username
        DB_PASSWORD=your_neon_password
        
        # JWT Configuration
        # A strong, secret key used to sign and verify JWT tokens. Keep this secure!
        JWT_SECRET=your_super_secret_key_for_jwt
        
        # Token expiration time in milliseconds (e.g., 86400000 ms = 24 hours)
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
*   `GET /api/auth/username`: Get current username.

### Projects

*   `GET /api/projects`: Get all projects for the current user.
    *   *Query Params:* `page` (default 0), `size` (default 6), `search` (optional keyword).
*   `POST /api/projects`: Create a new project.
*   `GET /api/projects/{id}`: Get a project by ID.
*   `PUT /api/projects/{id}`: Update a project by ID.
*   `DELETE /api/projects/{id}`: Delete a project by ID.

### Tasks

*   `GET /api/projects/{projectId}/tasks`: Get all tasks for a project.
*   `POST /api/projects/{projectId}/tasks`: Create a new task for a project.
*   `PUT /api/tasks/{taskId}`: Update a task by ID.
*   `DELETE /api/tasks/{taskId}`: Delete a task by ID.

## 🧠 Progress Calculation Logic

The application features real-time progress tracking for projects. This logic is handled entirely by the **Backend** to ensure data consistency.

### Backend Implementation
When a `Project` is requested (either a single project or a list), the `ProjectService` dynamically calculates the progress before sending the response:

1.  **Fetch Tasks:** Retrieves all tasks associated with the project.
2.  **Calculate Stats:**
    *   `totalTasks`: Total number of tasks.
    *   `completedTasks`: Count of tasks where `isCompleted` is true.
3.  **Compute Percentage:**
    *   Formula: `(completedTasks / totalTasks) * 100`
    *   Rounded to the nearest integer.
    *   Returns `0` if there are no tasks.
4.  **DTO Mapping:** These calculated values are injected into the `ProjectDTO` which is sent to the frontend.

### Frontend Usage
The frontend simply consumes these pre-calculated values from the API response:
*   **Progress Bars:** Directly uses `project.progressPercentage` to set the width of progress bars.
*   **Dashboard Stats:** Aggregates these values to show overall productivity (e.g., average progress across all projects).
*   **Charts:** Uses `completedTaskCount` vs `(taskCount - completedTaskCount)` to render pie charts.

## Project Structure

```
.
├── docker-compose.yml
├── README.md
├── taskaura_backend
│   ├── .env
│   ├── .gitattributes
│   ├── .gitignore
│   ├── .idea
│   ├── .mvn
│   ├── Dockerfile
│   ├── HELP.md
│   ├── docker-compose.yml
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── src
│   │   ├── main
│   │   │   ├── java/com/taskaura
│   │   │   │   ├── config
│   │   │   │   ├── controller
│   │   │   │   ├── dto
│   │   │   │   ├── entity
│   │   │   │   ├── exception
│   │   │   │   ├── repository
│   │   │   │   ├── security
│   │   │   │   ├── service
│   │   │   │   └── util
│   │   │   └── resources
│   └── target
└── taskaura_Frontend
    ├── .env.local
    ├── .gitignore
    ├── App.tsx
    ├── Dockerfile
    ├── components
    ├── context
    ├── hooks
    ├── index.html
    ├── index.tsx
    ├── lib
    ├── metadata.json
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── pages
    ├── tsconfig.json
    ├── types.ts
    └── vite.config.ts
```

## 🐳 Docker Deployment

The project includes a `docker-compose.yml` file in the root directory to simplify deployment. This allows you to run both the backend and frontend services with a single command.

### Prerequisites
*   **Docker** and **Docker Compose** installed on your machine.

### Step-by-Step Guide

1.  **Configure Environment Variables:**
    Ensure you have your `.env` file set up in `taskaura_backend` as described in the [Installation](#installation) section. Docker will use these variables.

2.  **Build and Run:**
    Open your terminal in the root directory (where `docker-compose.yml` is located) and run:
    ```sh
    docker-compose up --build
    ```
    *   `--build`: Forces Docker to rebuild the images (useful if you've made code changes).
    *   The first run might take a few minutes as it downloads dependencies and builds the images.

3.  **Access the Application:**
    *   **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser.
    *   **Backend API:** Accessible at [http://localhost:8081](http://localhost:8081).

4.  **Stop the Services:**
    To stop the containers, press `Ctrl+C` in the terminal, or run:
    ```sh
    docker-compose down
    ```

### Docker Compose Configuration
The `docker-compose.yml` defines two services:
*   **backend:** Builds from `./taskaura_backend`, exposes port `8081`, and connects to your configured database.
*   **frontend:** Builds from `./taskaura_Frontend`, exposes port `3000`, and depends on the backend service to start first.

## Author

**Mohammed Zrirake** - *Software Engineering Student*
*   Owner and Lead Developer of this public repository.

## 🚀 Future Improvements & Roadmap

To take this project from a technical assessment to a production-grade application, here is a roadmap of potential enhancements focusing on DevOps, scalability, and security:

### CI/CD Pipeline
*   **GitHub Actions:** Implement a robust CI/CD pipeline to automate testing and deployment.
    *   **CI:** Run unit and integration tests on every push to the `main` branch.
    *   **CD:** Automatically build Docker images and push them to a container registry (e.g., Docker Hub or Azure Container Registry).

### Cloud Deployment
*   **Frontend & Backend Hosting:**
    *   **DigitalOcean Droplets:** Deploy services on scalable virtual machines.
    *   **Azure Kubernetes Service (AKS):** For higher scalability, orchestrate containers using Kubernetes on Azure.
*   **Load Balancing:** Implement a Load Balancer (e.g., Nginx or cloud-native LB) to distribute incoming traffic efficiently across multiple instances of the backend, ensuring high availability and reliability.

### Security & Domain
*   **SSL/TLS Certificates:** Secure all communications using HTTPS with free certificates from **[Let's Encrypt](https://letsencrypt.org/)**.
*   **Custom Domain:** Purchase a professional domain name from providers like **[Name.com](https://www.name.com/)** and configure DNS records to point to the Load Balancer or Ingress Controller.