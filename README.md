
# 🧠 Job Booking Application

This is a microservices-based job booking application that includes Admin, Job Posting, Job Search, Notification, and AI Agent services. The system allows users to search for jobs, receive notifications based on alerts, apply for jobs, and interact with an AI agent to assist with job queries.

---

## 🌐 Final Deployed URLs

| Service                | URL                                                        |
|------------------------|-------------------------------------------------------------|
| Admin Service          | https://job-admin-service.onrender.com/api/v1/admin         |
| Job Posting Service    | https://job-posting-service.onrender.com/api/v1/job-posting |
| Job Search Service     | https://job-search-service.onrender.com/api/v1/jobs         |
| Notification Service   | https://notification-service.onrender.com/api/v1/alerts     |
| AI Agent Service       | https://ai-agent-service.onrender.com/api/v1/ai/message     |
| API Gateway            | https://job-booking-gateway.onrender.com                    |
| Frontend (React + Vite)| https://job-booking-frontend.onrender.com                   |

---

## 🧱 Design & Assumptions

### Design Architecture
- **Frontend**: React.js with Vite
- **Backend**: Spring Boot REST APIs (Java)
- **Microservices**:
  - Admin Service: Admin-only job posting management
  - Job Posting Service: Redis cache, JWT-secured apply & related jobs
  - Job Search Service: Position/city search with autocomplete and search history
  - Notification Service: Alert storage & RabbitMQ-based notifications
  - AI Agent Service: Together.ai-based NLP with job search integration
- **Database**:
  - MongoDB for jobs & alerts
  - Redis for caching
  - PostgreSQL for user data (if extended)
- **Authentication**: JWT-based role control (ADMIN / USER)
- **Messaging**: RabbitMQ for job alert notifications
- **API Gateway**: Node.js-based routing for all services
- **Deployment**: Render.com with Docker containers per service

### Assumptions
- User is already authenticated before using services
- Search history and job alerts are tied to the user via token
- AI Agent only interprets and returns search results (no chat memory)
- Related jobs are determined based on location and tags

---

## 🐞 Issues Encountered

- 🚧 **Render Build Errors**: Occurred due to missing `controllers` or `repository` imports when Docker build cache failed. Fixed by clearing cache and rebuilding.
- 🐇 **RabbitMQ Config**: Network issue between services and RabbitMQ container; resolved with correct host and port settings using `DOCKER_HOST`.
- 🔒 **JWT Authorization**: Required manual filter registration and careful route exclusion for `/login` endpoints.
- 🐘 **MongoDB Indexing**: Needed compound indexes on city and position for job search speed.
- 🔄 **Frontend Deployment**: Render did not serve frontend by default; custom `vite.config.js` and `static.json` resolved it.

---

## 📊 Data Models (ER Diagram)

```mermaid
erDiagram
    User ||--o{ JobSearchHistory : saves
    User ||--o{ JobAlert : defines
    JobPosting ||--o{ Application : has
    JobPosting ||--o{ RelatedJob : suggests
    JobAlert ||--o{ Notification : triggers

    User {
        string id PK
        string email
        string role
    }

    JobPosting {
        string id PK
        string title
        string city
        string country
        int applicationCount
        string description
        string lastUpdated
    }

    Application {
        string id PK
        string userId FK
        string jobPostingId FK
        datetime appliedAt
    }

    JobSearchHistory {
        string id PK
        string userId FK
        string query
        datetime searchedAt
    }

    JobAlert {
        string id PK
        string userId FK
        string keyword
        string city
    }

    Notification {
        string id PK
        string alertId FK
        string jobId FK
        datetime notifiedAt
    }

    RelatedJob {
        string id PK
        string jobId FK
        string relatedJobId FK
    }
