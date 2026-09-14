# Database Schema

## Collections Overview

### 1. Users Collection

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: Enum ['donor', 'recipient', 'admin', 'hospital'],
  profilePicture: String (URL),
  dateOfBirth: Date,
  gender: Enum ['male', 'female', 'other'],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    primaryPhone: String,
    alternatePhone: String,
    email: String
  },
  emailVerified: Boolean,
  phoneVerified: Boolean,
  accountStatus: Enum ['active', 'inactive', 'suspended'],
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

### 2. Donors Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  bloodType: Enum ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
  rhFactor: Enum ['+', '-'],
  weight: Number (kg),
  height: Number (cm),
  medicalHistory: {
    chronicDiseases: [String],
    medications: [String],
    allergies: [String],
    surgeries: [{
      name: String,
      date: Date,
      description: String
    }]
  },
  donationHistory: [{
    donationId: ObjectId (ref: Donations),
    date: Date,
    bloodType: String,
    quantity: Number (ml),
    status: String
  }],
  lastDonationDate: Date,
  totalDonations: Number,
  eligibilityStatus: Enum ['eligible', 'ineligible', 'pending'],
  eligibilityReason: String,
  certifications: [{
    name: String,
    issueDate: Date,
    expiryDate: Date
  }],
  badges: [String], // e.g., 'hero-donor', 'lifetime-donor'
  preferredCenter: ObjectId (ref: BloodBanks),
  notificationPreferences: {
    email: Boolean,
    sms: Boolean,
    push: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Recipients Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  medicalCondition: String,
  bloodTypeNeeded: Enum ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
  urgency: Enum ['routine', 'urgent', 'emergency'],
  hospital: {
    name: String,
    address: String,
    phone: String,
    contactPerson: String
  },
  doctor: {
    name: String,
    specialization: String,
    license: String
  },
  medicalHistory: [String],
  pastTransfusions: [{
    date: Date,
    bloodType: String,
    quantity: Number,
    hospital: String
  }],
  verificationStatus: Enum ['verified', 'pending', 'rejected'],
  verifiedBy: ObjectId (ref: Users),
  verificationDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. BloodBanks Collection

```javascript
{
  _id: ObjectId,
  name: String,
  type: Enum ['hospital', 'standalone', 'clinic'],
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  staff: [
    {
      name: String,
      position: String,
      phone: String,
      email: String
    }
  ],
  inventory: [{
    bloodType: String,
    quantity: Number (units),
    lastUpdated: Date,
    expiryDate: Date,
    status: Enum ['available', 'low', 'critical']
  }],
  totalCapacity: Number,
  certifications: [String],
  rating: Number (1-5),
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Donations Collection

```javascript
{
  _id: ObjectId,
  donorId: ObjectId (ref: Donors),
  bloodBankId: ObjectId (ref: BloodBanks),
  appointmentDate: Date,
  appointmentTime: String,
  status: Enum ['scheduled', 'completed', 'cancelled', 'no-show'],
  bloodCollected: {
    type: String,
    quantity: Number (ml),
    collectionTime: Date,
    collectedBy: String
  },
  testResults: {
    bloodType: String,
    rhFactor: String,
    hiv: Enum ['negative', 'positive', 'pending'],
    hepatitisB: Enum ['negative', 'positive', 'pending'],
    hepatitisC: Enum ['negative', 'positive', 'pending'],
    syphilis: Enum ['negative', 'positive', 'pending'],
    testDate: Date,
    verifiedBy: ObjectId (ref: Users)
  },
  vitals: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    hemoglobin: Number
  },
  notes: String,
  complications: [String],
  nextEligibleDate: Date,
  certificateIssued: Boolean,
  certificateUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 6. BloodRequests Collection

```javascript
{
  _id: ObjectId,
  recipientId: ObjectId (ref: Recipients),
  bloodType: String,
  quantity: Number (units),
  urgency: Enum ['routine', 'urgent', 'emergency'],
  requestDate: Date,
  neededBy: Date,
  status: Enum ['pending', 'approved', 'fulfilled', 'cancelled', 'rejected'],
  hospital: {
    name: String,
    address: String,
    contactPerson: String,
    phone: String
  },
  approvedBy: ObjectId (ref: Users),
  approvalDate: Date,
  rejectionReason: String,
  allocatedBlood: [{
    donationId: ObjectId (ref: Donations),
    quantity: Number,
    allocatedDate: Date
  }],
  notificationsCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. Appointments Collection

```javascript
{
  _id: ObjectId,
  donorId: ObjectId (ref: Donors),
  bloodBankId: ObjectId (ref: BloodBanks),
  appointmentDate: Date,
  appointmentTime: String,
  duration: Number (minutes),
  type: Enum ['first-time', 'repeat'],
  status: Enum ['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'],
  notes: String,
  reminderSent: Boolean,
  reminderDate: Date,
  cancellationReason: String,
  cancelledBy: ObjectId (ref: Users),
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Notifications Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  type: Enum ['donation-request', 'appointment-reminder', 'eligibility-update', 'blood-available', 'request-approved'],
  title: String,
  message: String,
  data: Object,
  read: Boolean,
  readAt: Date,
  notificationChannels: [Enum ['email', 'sms', 'push', 'in-app']],
  createdAt: Date,
  expiresAt: Date
}
```

### 9. Analytics Collection

```javascript
{
  _id: ObjectId,
  type: Enum ['daily', 'weekly', 'monthly'],
  period: String,
  totalDonors: Number,
  totalRecipients: Number,
  totalDonations: Number,
  totalBloodCollected: Number,
  bloodTypeDistribution: {
    'O+': Number,
    'O-': Number,
    'A+': Number,
    'A-': Number,
    'B+': Number,
    'B-': Number,
    'AB+': Number,
    'AB-': Number
  },
  requestsFulfilled: Number,
  requestsPending: Number,
  averageDonorSatisfaction: Number,
  geographicData: [
    {
      region: String,
      donors: Number,
      donations: Number
    }
  ],
  createdAt: Date
}
```

## Indexes

```javascript
// Users
db.users.createIndex({ email: 1 })
db.users.createIndex({ phone: 1 })
db.users.createIndex({ role: 1 })
db.users.createIndex({ "address.city": 1 })

// Donors
db.donors.createIndex({ userId: 1 })
db.donors.createIndex({ bloodType: 1 })
db.donors.createIndex({ lastDonationDate: 1 })
db.donors.createIndex({ eligibilityStatus: 1 })

// Recipients
db.recipients.createIndex({ userId: 1 })
db.recipients.createIndex({ bloodTypeNeeded: 1 })
db.recipients.createIndex({ verificationStatus: 1 })

// BloodBanks
db.bloodBanks.createIndex({ "address.coordinates": "2dsphere" })
db.bloodBanks.createIndex({ name: "text" })
db.bloodBanks.createIndex({ city: 1 })

// Donations
db.donations.createIndex({ donorId: 1 })
db.donations.createIndex({ appointmentDate: 1 })
db.donations.createIndex({ status: 1 })
db.donations.createIndex({ "testResults.bloodType": 1 })

// BloodRequests
db.bloodRequests.createIndex({ recipientId: 1 })
db.bloodRequests.createIndex({ status: 1 })
db.bloodRequests.createIndex({ neededBy: 1 })
db.bloodRequests.createIndex({ urgency: 1 })

// Appointments
db.appointments.createIndex({ donorId: 1 })
db.appointments.createIndex({ appointmentDate: 1 })
db.appointments.createIndex({ status: 1 })

// Notifications
db.notifications.createIndex({ userId: 1 })
db.notifications.createIndex({ read: 1 })
db.notifications.createIndex({ createdAt: 1 })
```

## Relationships

```
Users
  ├─ Donors (one-to-one)
  ├─ Recipients (one-to-one)
  └─ Appointments (one-to-many)

Donors
  ├─ Donations (one-to-many)
  └─ BloodBanks (many-to-one)

Recipients
  └─ BloodRequests (one-to-many)

BloodBanks
  ├─ Donations (one-to-many)
  └─ Appointments (one-to-many)

Donations
  ├─ Donors (many-to-one)
  ├─ BloodBanks (many-to-one)
  └─ BloodRequests (many-to-many)

BloodRequests
  ├─ Recipients (many-to-one)
  └─ Donations (many-to-many)
```
