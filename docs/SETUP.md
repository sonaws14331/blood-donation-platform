# Blood Donation Platform - Setup Guide

## Prerequisites

- Node.js 14.0 or higher
- npm 6.0 or higher
- MongoDB 4.0 or higher (local or cloud)
- Git
- Docker (optional, for containerized deployment)

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sonaws14331/blood-donation-platform.git
cd blood-donation-platform
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/blood_donation
MONGO_USER=admin
MONGO_PASSWORD=password123

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@blooddonationplatform.com

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=blood-donation-bucket

# Twilio (for SMS)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend URLs
DONOR_PORTAL_URL=http://localhost:3001
RECIPIENT_PORTAL_URL=http://localhost:3002
ADMIN_DASHBOARD_URL=http://localhost:3003
```

### 4. Install Frontend Dependencies

#### Donor Portal
```bash
cd ../donor-portal
npm install
```

#### Recipient Portal
```bash
cd ../recipient-portal
npm install
```

#### Admin Dashboard
```bash
cd ../admin-dashboard
npm install
```

## Database Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB (macOS)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongo mongodb://localhost:27017
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

### Option 3: Docker Compose

```bash
docker-compose up -d mongodb
```

## Running the Application

### Option 1: Manual Start (Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Donor Portal:**
```bash
cd donor-portal
npm start
```

**Terminal 3 - Recipient Portal:**
```bash
cd recipient-portal
npm start
```

**Terminal 4 - Admin Dashboard:**
```bash
cd admin-dashboard
npm start
```

### Option 2: Using Docker Compose

```bash
# Build and start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Access the Applications

- **Donor Portal:** http://localhost:3001
- **Recipient Portal:** http://localhost:3002
- **Admin Dashboard:** http://localhost:3003
- **Backend API:** http://localhost:5000/api
- **API Documentation:** http://localhost:5000/api/docs

## Database Initialization

### Seed Initial Data

```bash
cd backend
npm run seed
```

This will populate the database with:
- Sample blood banks
- Sample donors
- Sample recipients
- Sample blood inventory

## Testing

### Run Backend Tests

```bash
cd backend
npm test
```

### Run Frontend Tests

```bash
cd donor-portal
npm test
```

### Run with Coverage

```bash
npm test -- --coverage
```

## Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check `MONGO_URI` in `.env`
- Verify database credentials

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change PORT in .env
PORT=5001
```

### Module Not Found

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

**Solution:**
Check `CORS_ORIGIN` in backend `.env`:
```env
CORS_ORIGIN=http://localhost:3001,http://localhost:3002,http://localhost:3003
```

## Production Deployment

### Build for Production

```bash
# Backend
cd backend
npm run build

# Frontend applications
cd ../donor-portal
npm run build
```

### Environment Setup (Production)

```bash
NODE_ENV=production
PORT=5000
# Use secure MongoDB Atlas connection
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/blood_donation
```

### Deploy with PM2

```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start npm --name "blood-donation-api" -- start

# View logs
pm2 logs blood-donation-api
```

### Deploy with Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /api {
        proxy_pass http://localhost:5000/api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Verification Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB running and accessible
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Backend API running on port 5000
- [ ] Donor Portal running on port 3001
- [ ] Recipient Portal running on port 3002
- [ ] Admin Dashboard running on port 3003
- [ ] Can access API documentation
- [ ] Database seeded with initial data
- [ ] All tests passing

## Next Steps

1. Review [API Documentation](./API_DOCUMENTATION.md)
2. Review [Database Schema](./DATABASE_SCHEMA.md)
3. Review [Architecture](./ARCHITECTURE.md)
4. Start developing!

## Support

For issues or questions:
- Check existing GitHub issues
- Create new GitHub issue with detailed information
- Contact support@blooddonationplatform.com
