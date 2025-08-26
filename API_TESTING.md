# API Testing Guide

## Authentication

### Login
\`\`\`bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@company.com", "password": "password123"}'
\`\`\`

### Logout
\`\`\`bash
curl -X POST http://localhost:3001/api/auth/logout
\`\`\`

## Loans (Protected Routes)

### Get All Loans
\`\`\`bash
curl -X GET http://localhost:3001/api/loans \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

### Filter Loans by Status
\`\`\`bash
curl -X GET "http://localhost:3001/api/loans?status=pending" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

### Get User's Loans
\`\`\`bash
curl -X GET http://localhost:3001/api/loans/michaelbrown@example.com/get \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

### Get Expired Loans
\`\`\`bash
curl -X GET http://localhost:3001/api/loans/expired \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

### Delete Loan (SuperAdmin Only)
\`\`\`bash
curl -X DELETE http://localhost:3001/api/loan/900199/delete \
  -H "Authorization: Bearer YOUR_SUPERADMIN_JWT_TOKEN"
\`\`\`

## Test Credentials

- **Staff**: staff@company.com / password123
- **Admin**: admin@company.com / password123  
- **SuperAdmin**: superadmin@company.com / password123

## Role-Based Access

- **Staff**: Cannot see applicant's `totalLoan` field
- **Admin/SuperAdmin**: Can see all fields including `totalLoan`
- **SuperAdmin**: Only role that can delete loans
