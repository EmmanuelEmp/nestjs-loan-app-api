# NestJS Loan Management API

A professional NestJS RESTful API for loan management with JWT authentication and role-based access control.

## Features

- JWT-based authentication
- Role-based access control (Staff, Admin, SuperAdmin)
- Loan management with filtering capabilities
- Global error handling
- Rate limiting and security middleware
- Input validation
- Professional code structure

## Installation

\`\`\`bash
npm install
\`\`\`

## Running the Application

\`\`\`bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout user

### Loans (Protected Routes)
- `GET /api/loans` - Get all loans
- `GET /api/loans?status=pending` - Filter loans by status
- `GET /api/loans/:userEmail/get` - Get user's loans
- `GET /api/loans/expired` - Get expired loans
- `DELETE /api/loan/:loanId/delete` - Delete loan (SuperAdmin only)

## Test Credentials

- **Staff**: staff@company.com / password123
- **Admin**: admin@company.com / password123
- **SuperAdmin**: superadmin@company.com / password123

## Role Permissions

- **Staff**: Can view loans but not applicant's totalLoan
- **Admin**: Can view all loan data including totalLoan
- **SuperAdmin**: Full access including loan deletion

## Project Structure

\`\`\`
src/
├── auth/                 # Authentication module
├── loans/               # Loans module
├── common/              # Shared interfaces, enums, filters
├── data/                # JSON data files
└── main.ts             # Application entry point
\`\`\`

## Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting (100 requests/minute)
- Input validation
- Global exception handling
- JWT token authentication
