# Blood Donation Platform - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### 1. Register User

**POST** `/auth/register`

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "phone": "1234567890",
  "role": "donor",
  "gender": "male",
  "dateOfBirth": "1990-05-15",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

### 2. Login

**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

### 3. Refresh Token

**POST** `/auth/refresh-token`

**Response (200):**
```json
{
  "success": true,
  "token": "new_jwt_token"
}
```

### 4. Logout

**POST** `/auth/logout`

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Donor Endpoints

### 1. Get Donor Profile

**GET** `/donors/profile`

**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "donor_id",
    "userId": "user_id",
    "bloodType": "O+",
    "rhFactor": "+",
    "weight": 70,
    "height": 175,
    "lastDonationDate": "2026-09-01",
    "totalDonations": 5,
    "eligibilityStatus": "eligible",
    "badges": ["hero-donor"]
  }
}
```

### 2. Update Donor Profile

**PUT** `/donors/profile`

**Headers:** Authorization required

```json
{
  "weight": 72,
  "height": 176,
  "medicalHistory": {
    "chronicDiseases": [],
    "medications": [],
    "allergies": []
  },
  "notificationPreferences": {
    "email": true,
    "sms": true,
    "push": true
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { /* updated donor data */ }
}
```

### 3. Get Donation History

**GET** `/donors/donations?limit=10&page=1`

**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "donation_id",
      "donationDate": "2026-09-01",
      "bloodType": "O+",
      "quantity": 450,
      "status": "completed",
      "bloodBank": { "name": "City Blood Bank" }
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10
  }
}
```

### 4. Check Eligibility

**POST** `/donors/check-eligibility`

**Headers:** Authorization required

```json
{
  "weight": 70,
  "recentTravel": false,
  "currentMedications": [],
  "lastDonationDate": "2026-09-01"
}
```

**Response (200):**
```json
{
  "success": true,
  "eligible": true,
  "reason": "You are eligible to donate",
  "nextEligibleDate": "2026-10-01"
}
```

---

## Appointment Endpoints

### 1. Schedule Appointment

**POST** `/appointments/schedule`

**Headers:** Authorization required

```json
{
  "bloodBankId": "bloodbank_id",
  "appointmentDate": "2026-10-15",
  "appointmentTime": "10:00",
  "notes": "Morning appointment preferred"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Appointment scheduled successfully",
  "data": {
    "_id": "appointment_id",
    "appointmentDate": "2026-10-15",
    "appointmentTime": "10:00",
    "status": "scheduled",
    "bloodBank": { "name": "City Blood Bank" }
  }
}
```

### 2. Cancel Appointment

**DELETE** `/appointments/:appointmentId`

**Headers:** Authorization required

```json
{
  "cancellationReason": "Can't make it on that date"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Appointment cancelled successfully"
}
```

### 3. Get My Appointments

**GET** `/appointments/my-appointments`

**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "appointment_id",
      "appointmentDate": "2026-10-15",
      "appointmentTime": "10:00",
      "status": "scheduled",
      "bloodBank": { "name": "City Blood Bank" }
    }
  ]
}
```

---

## Blood Bank Endpoints

### 1. List Blood Banks

**GET** `/blood-banks?city=New%20York&limit=20&page=1`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "bloodbank_id",
      "name": "City Blood Bank",
      "type": "hospital",
      "address": { /* address details */ },
      "phone": "1234567890",
      "rating": 4.5,
      "inventory": [
        { "bloodType": "O+", "quantity": 50, "status": "available" }
      ]
    }
  ],
  "pagination": { "total": 100, "page": 1 }
}
```

### 2. Get Blood Bank Details

**GET** `/blood-banks/:bloodBankId`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "bloodbank_id",
    "name": "City Blood Bank",
    "type": "hospital",
    "operatingHours": { /* hours */ },
    "staff": [ /* staff details */ ],
    "inventory": [ /* blood inventory */ ]
  }
}
```

### 3. Search Nearby Blood Banks

**GET** `/blood-banks/search/nearby?latitude=40.7128&longitude=-74.0060&radius=5`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "bloodbank_id",
      "name": "City Blood Bank",
      "distance": 2.5,
      "inventory": [ /* blood inventory */ ]
    }
  ]
}
```

---

## Blood Request Endpoints (Recipient)

### 1. Create Blood Request

**POST** `/blood-requests`

**Headers:** Authorization required

```json
{
  "bloodType": "O+",
  "quantity": 2,
  "urgency": "urgent",
  "neededBy": "2026-09-20",
  "hospital": {
    "name": "City Hospital",
    "address": "123 Hospital Ave",
    "contactPerson": "Dr. Smith",
    "phone": "9876543210"
  },
  "medicalCondition": "Emergency surgery"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Blood request created successfully",
  "data": {
    "_id": "request_id",
    "bloodType": "O+",
    "quantity": 2,
    "urgency": "urgent",
    "status": "pending",
    "requestDate": "2026-09-14"
  }
}
```

### 2. Get My Blood Requests

**GET** `/blood-requests/my-requests`

**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "request_id",
      "bloodType": "O+",
      "quantity": 2,
      "status": "approved",
      "requestDate": "2026-09-14"
    }
  ]
}
```

### 3. Search Blood Availability

**GET** `/blood-requests/search-blood?bloodType=O%2B&city=New%20York`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "bloodBankId": "bloodbank_id",
      "bloodBankName": "City Blood Bank",
      "bloodType": "O+",
      "availableUnits": 50,
      "distance": 2.5,
      "address": { /* address */ }
    }
  ]
}
```

---

## Admin Endpoints

### 1. Get Dashboard Statistics

**GET** `/admin/statistics?period=monthly`

**Headers:** Authorization required (Admin role)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalDonors": 1500,
    "totalRecipients": 300,
    "totalDonations": 2000,
    "totalBloodCollected": 900000,
    "requestsFulfilled": 280,
    "requestsPending": 20,
    "bloodTypeDistribution": {
      "O+": 250,
      "O-": 50,
      "A+": 200,
      "A-": 40,
      "B+": 180,
      "B-": 35,
      "AB+": 120,
      "AB-": 25
    }
  }
}
```

### 2. Get All Users

**GET** `/admin/users?role=donor&limit=50&page=1`

**Headers:** Authorization required (Admin role)

**Response (200):**
```json
{
  "success": true,
  "data": [ /* user list */ ],
  "pagination": { "total": 1500, "page": 1 }
}
```

### 3. Verify Recipient

**PUT** `/admin/recipients/:recipientId/verify`

**Headers:** Authorization required (Admin role)

```json
{
  "verificationStatus": "verified",
  "notes": "Documents verified"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Recipient verified successfully"
}
```

### 4. Approve Blood Request

**PUT** `/admin/blood-requests/:requestId/approve`

**Headers:** Authorization required (Admin role)

```json
{
  "approvalNotes": "Approved for emergency donation"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blood request approved"
}
```

### 5. Get Analytics Report

**GET** `/admin/reports?type=monthly&startDate=2026-09-01&endDate=2026-09-30`

**Headers:** Authorization required (Admin role)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "period": "2026-09-01 to 2026-09-30",
    "totalDonations": 500,
    "totalDonors": 400,
    "averageDonationAge": 35,
    "geographicData": [ /* region data */ ],
    "successRate": 98.5
  }
}
```

---

## Notification Endpoints

### 1. Get My Notifications

**GET** `/notifications?limit=20&page=1`

**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "notification_id",
      "type": "donation-request",
      "title": "Blood Donation Needed",
      "message": "Your blood type is needed...",
      "read": false,
      "createdAt": "2026-09-14T10:00:00Z"
    }
  ]
}
```

### 2. Mark Notification as Read

**PUT** `/notifications/:notificationId/read`

**Headers:** Authorization required

**Response (200):**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid input data",
  "errors": { "email": "Email is required" }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

API endpoints are rate-limited to:
- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

Headers included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1694686800
```
