# Postman Testing Guide for NestJS Loan API

## Prerequisites
1. Make sure your NestJS server is running: `npm run start:dev`
2. Server should be accessible at `http://localhost:3001`
3. Install Postman from https://www.postman.com/downloads/

## Quick Setup

### 1. Create New Collection
- Open Postman
- Click "New" → "Collection"
- Name it "NestJS Loan API"

### 2. Set Environment Variables
- Click the gear icon (⚙️) in top right
- Click "Add" to create new environment
- Name it "Loan API Local"
- Add these variables:
  \`\`\`
  baseUrl: http://localhost:3001
  token: (leave empty - will be set automatically)
  \`\`\`

### 3. Auto-Save JWT Token Script
Add this script to your Login request's "Tests" tab to automatically save the token:
\`\`\`javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("token", response.access_token);
    console.log("Token saved:", response.access_token);
}
\`\`\`

## Test Credentials
\`\`\`
Staff User:
- Email: staff@company.com
- Password: password

Admin User:
- Email: admin@company.com  
- Password: password

SuperAdmin User:
- Email: superadmin@company.com
- Password: password
\`\`\`

## API Endpoints Testing

### 1. Login (POST /auth/login)
**URL:** `{{baseUrl}}/auth/login`
**Method:** POST
**Headers:** `Content-Type: application/json`
**Body (raw JSON):**
\`\`\`json
{
  "email": "staff@company.com",
  "password": "password123"
}
\`\`\`
**Expected Response:**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "staff@company.com",
    "role": "staff"
  }
}
\`\`\`

### 2. Get All Loans (GET /loans)
**URL:** `{{baseUrl}}/loans`
**Method:** GET
**Headers:** `Authorization: Bearer {{token}}`
**Expected Response:** Array of loans (staff won't see totalLoan field)

### 3. Get Loans by Status (GET /loans?status=pending)
**URL:** `{{baseUrl}}/loans?status=pending`
**Method:** GET
**Headers:** `Authorization: Bearer {{token}}`

### 4. Get User's Loans (GET /loans/:userEmail/get)
**URL:** `{{baseUrl}}/loans/john.doe@email.com/get`
**Method:** GET
**Headers:** `Authorization: Bearer {{token}}`

### 5. Get Expired Loans (GET /loans/expired)
**URL:** `{{baseUrl}}/loans/expired`
**Method:** GET
**Headers:** `Authorization: Bearer {{token}}`

### 6. Delete Loan - SuperAdmin Only (DELETE /loan/:loanId/delete)
**URL:** `{{baseUrl}}/loan/1/delete`
**Method:** DELETE
**Headers:** `Authorization: Bearer {{token}}`
**Note:** Only works with superadmin token

### 7. Logout (POST /auth/logout)
**URL:** `{{baseUrl}}/auth/logout`
**Method:** POST
**Headers:** `Authorization: Bearer {{token}}`

## Common Issues & Troubleshooting

### Issue 1: "Cannot POST /auth/login" or 404 errors
**Cause:** Server not running or wrong URL
**Solution:** 
- Check if server is running: `npm run start:dev`
- Verify URL is `http://localhost:3001` (not 3000)
- Check console for server startup messages

### Issue 2: "Unauthorized" (401) errors
**Cause:** Missing or invalid JWT token
**Solution:**
- First login to get a token
- Make sure Authorization header is set: `Bearer {{token}}`
- Check if token is saved in environment variables
- Token might be expired - login again

### Issue 3: "Internal Server Error" (500)
**Cause:** Server-side errors
**Solution:**
- Check server console for error messages
- Verify JSON data files exist in `src/data/`
- Check if all dependencies are installed: `npm install`

### Issue 4: Role-based access not working
**Cause:** Wrong user role or permissions
**Solution:**
- Use correct credentials for each role
- SuperAdmin: `superadmin@company.com`
- Admin: `admin@company.com`
- Staff: `staff@company.com`
- Only superadmin can delete loans

### Issue 5: "Cannot resolve dependency" errors
**Cause:** NestJS dependency injection issues
**Solution:**
- Restart the server: `npm run start:dev`
- Check if all imports are correct (not type-only imports)
- Verify all modules are properly configured

## Testing Workflow

1. **Start with Login:** Always login first to get JWT token
2. **Test Basic Endpoints:** Try GET /loans with different roles
3. **Test Filtering:** Use query parameters like `?status=pending`
4. **Test Role Permissions:** 
   - Staff: Can see loans but not totalLoan
   - Admin/SuperAdmin: Can see all data including totalLoan
   - Only SuperAdmin: Can delete loans
5. **Test Error Cases:** Try accessing endpoints without token

## Expected Behavior by Role

### Staff User
- ✅ Can login/logout
- ✅ Can view loans (without totalLoan field)
- ✅ Can filter loans by status
- ✅ Can view user-specific loans
- ❌ Cannot see applicant's totalLoan amount
- ❌ Cannot delete loans

### Admin User  
- ✅ Can login/logout
- ✅ Can view all loan data (including totalLoan)
- ✅ Can filter loans by status
- ✅ Can view user-specific loans
- ❌ Cannot delete loans

### SuperAdmin User
- ✅ Can login/logout  
- ✅ Can view all loan data (including totalLoan)
- ✅ Can filter loans by status
- ✅ Can view user-specific loans
- ✅ Can delete loans

## Quick Test Script
Copy this into a new request to test server connectivity:
\`\`\`
GET {{baseUrl}}/loans
Authorization: Bearer {{token}}
\`\`\`

If this fails, the issue is likely server connectivity or authentication setup.
