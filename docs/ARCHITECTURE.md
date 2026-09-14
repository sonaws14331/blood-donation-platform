# System Architecture

## Overview

The Blood Donation Platform follows a microservices-inspired architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
├─────────────────┬─────────────────┬─────────────────────────┤
│  Donor Portal   │ Recipient Portal│   Admin Dashboard       │
│   (React App)   │   (React App)   │    (React App)          │
└────────┬────────┴────────┬────────┴──────────────┬──────────┘
         │                 │                       │
         └─────────────────┼───────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  API Gateway │
                    │  (Express)   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌──────▼──────┐    ┌────▼────┐
   │  Auth   │      │   Donation  │    │  Blood  │
   │ Service │      │   Service   │    │ Service │
   └────┬────┘      └──────┬──────┘    └────┬────┘
        │                  │                 │
        └──────────────────┼─────────────────┘
                           │
                    ┌──────▼──────┐
                    │  MongoDB    │
                    │  Database   │
                    └─────────────┘
```

## Components

### 1. Frontend Applications

#### Donor Portal
- User registration and profile management
- Blood eligibility checker
- Donation appointment booking
- Health questionnaire
- Donation history
- Status tracking

#### Recipient Portal
- Blood search and availability
- Emergency blood requests
- Request tracking
- Hospital finder
- Blood bank locator

#### Admin Dashboard
- Analytics and reporting
- User management
- Blood inventory management
- Donor verification
- Request approvals
- System configuration

### 2. Backend Services

#### Authentication Service
- User registration and login
- JWT token generation
- Password reset
- Email verification
- Role-based access control

#### Donation Service
- Donation records management
- Appointment scheduling
- Donation history
- Eligibility verification
- Donation statistics

#### Blood Service
- Blood inventory management
- Blood type availability
- Blood requests
- Blood bank management
- Stock tracking

#### User Service
- User profile management
- Donor database
- Recipient database
- Hospital/clinic management

#### Notification Service
- Email notifications
- SMS alerts
- In-app notifications
- Real-time updates (Socket.io)

### 3. Database

- MongoDB for scalable document storage
- Collections for Users, Donations, Blood, Requests, Hospitals

## Data Flow

### Donor Registration Flow
1. Donor submits registration form (Donor Portal)
2. Frontend validates and sends to Backend API
3. Auth Service creates user account
4. User Service creates donor profile
5. Email verification sent
6. Donor confirmed and can schedule appointments

### Blood Request Flow
1. Recipient searches blood availability (Recipient Portal)
2. Blood Service queries inventory
3. Results displayed with bank locations
4. Recipient submits request
5. Admin notified for approval
6. Notification service alerts nearby donors
7. Donation scheduled and confirmed

### Admin Analytics Flow
1. Admin accesses dashboard
2. Analytics Service aggregates data
3. Reports generated with visualizations
4. Real-time statistics displayed

## Technology Stack

### Frontend
- React.js with Hooks
- Redux for state management
- Axios for API communication
- Tailwind CSS for styling
- React Router for navigation
- Chart.js for analytics

### Backend
- Node.js runtime
- Express.js framework
- MongoDB database
- Mongoose ODM
- JWT for authentication
- Socket.io for real-time features
- Nodemailer for email

### DevOps
- Docker for containerization
- Docker Compose for orchestration
- GitHub Actions for CI/CD
- Nginx for reverse proxy

## Security Measures

1. JWT authentication with expiration
2. Password hashing with bcrypt
3. HTTPS/TLS encryption
4. CORS configuration
5. Input validation and sanitization
6. XSS and CSRF protection
7. SQL/NoSQL injection prevention
8. Rate limiting
9. Role-based access control (RBAC)
10. Sensitive data encryption

## Scalability Considerations

- Microservices can be deployed independently
- Database indexing for performance
- Caching layer (Redis) for frequently accessed data
- Load balancing for API servers
- Horizontal scaling of services
- CDN for static assets

## Deployment

- Docker containers for consistency
- Kubernetes for orchestration (production)
- Environment-based configuration
- Automated CI/CD pipeline
- Blue-green deployment strategy
