# Blood Donation Platform

A comprehensive web and mobile platform connecting blood donors, recipients, and administrators to streamline blood donation management.

## 🎯 Features

### For Donors
- User registration and profile management
- Donation history tracking
- Blood eligibility checker
- Appointment scheduling
- Health questionnaire
- Donation reminders
- Community recognition

### For Recipients
- Search available blood inventory
- Request blood urgently
- Track donation requests
- Medical history management
- Hospital/clinic integration
- Real-time notifications

### For Administrators
- Dashboard with analytics
- User management
- Blood inventory management
- Donation tracking
- Reports and statistics
- Hospital/clinic management
- Donor eligibility verification

## 🏗️ Project Structure

```
blood-donation-platform/
├── backend/                 # Node.js/Express API
├── donor-portal/           # Donor web application
├── recipient-portal/       # Recipient web application
├── admin-dashboard/        # Admin management interface
├── docs/                   # Documentation
└── docker-compose.yml      # Docker setup
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB or PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/sonaws14331/blood-donation-platform.git
cd blood-donation-platform
```

2. Install dependencies
```bash
# Backend
cd backend && npm install

# Donor Portal
cd ../donor-portal && npm install

# Recipient Portal
cd ../recipient-portal && npm install

# Admin Dashboard
cd ../admin-dashboard && npm install
```

3. Setup environment variables
```bash
cp backend/.env.example backend/.env
# Edit .env with your configuration
```

4. Start the application
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Donor Portal
cd donor-portal && npm start

# Terminal 3 - Recipient Portal
cd recipient-portal && npm start

# Terminal 4 - Admin Dashboard
cd admin-dashboard && npm start
```

## 📚 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Setup Guide](./docs/SETUP.md)
- [Architecture](./docs/ARCHITECTURE.md)

## 🔐 Security

- JWT authentication
- Encrypted sensitive data
- Role-based access control (RBAC)
- HTTPS enforcement
- Input validation and sanitization
- XSS and CSRF protection

## 📱 Tech Stack

**Backend:**
- Node.js + Express
- MongoDB/PostgreSQL
- JWT Authentication
- Socket.io (Real-time notifications)

**Frontend:**
- React.js
- Redux for state management
- Axios for API calls
- Tailwind CSS for styling
- React Router for navigation

## 🤝 Contributing

Contributions are welcome! Please follow our contribution guidelines.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email support@blooddonationplatform.com or open an issue on GitHub.

---

**Last Updated:** September 2026
