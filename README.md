# DEP Platform

A comprehensive platform for IIT Ropar students with secure authentication, resource sharing, and various academic features.

## Features

### Authentication System
- **Dual Authentication Methods**:
  - OTP-based Login (Primary)
  - Password-based Login (Alternative)
- **Secure Signup**:
  - IITRPR Email Domain Validation (@iitrpr.ac.in)
  - Strong Password Requirements
  - Real-time Validation
- **Password Reset**:
  - OTP-based Reset System
  - Session Invalidation on Reset
  - Rate Limiting Protection

### Academic Resources
- **Study Materials**:
  - Course-specific Resources
  - Previous Year Papers
  - Notes and Tutorials
- **DSA Resources**:
  - Curated DSA Topics
  - Interview Preparation Materials
  - Practice Problems

### Internship & Placement
- **Opportunities**:
  - Job Listings
  - Interview Experiences
  - Company-wise Resources
- **Seniors Data**:
  - Placement Statistics
  - Success Stories
  - Resume Templates

### Community Features
- **Discussion Groups**:
  - Course-specific Discussions
  - Doubt Resolution
  - Peer Learning
- **Resource Sharing**:
  - File Upload/Download
  - Cloud Storage Integration
  - Version Control

## Security Features
- JWT-based Authentication
- Password Hashing with bcrypt
- Rate Limiting for API Endpoints
- Content Security Policy (CSP)
- XSS Protection
- CORS Protection
- Secure Headers

## Password Requirements
- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- Visual strength indicator

## Setup Instructions

1. **Clone the Repository**
```bash
git clone <repository-url>
cd DEP-main
```

2. **Set Up Python Environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Environment Variables**
- Copy `.env.example` to `.env`
- Update the variables with your values
```bash
cp .env.example .env
```

4. **Database Setup**
```bash
flask db init
flask db migrate
flask db upgrade
```

5. **Start the Backend Server**
```bash
python app.py
```

6. **Start the Frontend Development Server**
```bash
cd my-app
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /signup` - Create new account
- `POST /login` - Password-based login
- `POST /generate-otp` - Request OTP for login
- `POST /verify-otp` - Verify OTP for login
- `POST /request-password-reset` - Request password reset
- `POST /verify-reset-otp` - Reset password with OTP

### Resources
- `GET /resources` - List all resources
- `POST /resources` - Upload new resource
- `GET /resources/:id` - Get resource details
- `PUT /resources/:id` - Update resource
- `DELETE /resources/:id` - Delete resource

### Rate Limits
- OTP Generation: 5 attempts per hour
- OTP Verification: 5 attempts per OTP
- Password Reset: 5 attempts per hour
- Resource Upload: 50 per day

## Tech Stack
- **Backend**: Flask, SQLAlchemy, JWT
- **Frontend**: React, Material-UI
- **Database**: SQLite
- **File Storage**: Cloudinary
- **Email**: SMTP (Gmail)

## Environment Variables Required
See `.env.example` for required environment variables.

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
 
