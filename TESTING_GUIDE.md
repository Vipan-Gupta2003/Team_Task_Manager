# Quick Testing Guide

## Status Check

### ✅ Backend: http://localhost:5000
- Server: Running on port 5000
- Database: MongoDB Atlas connected
- Status: Ready

### ✅ Frontend: http://localhost:5173  
- Vite dev server: Running
- React app: Ready to test
- API configured: http://localhost:5000/api

---

## Test Authentication Flow

### Step 1: Open Frontend
Visit: **http://localhost:5173**

### Step 2: Create Account
1. Click "Create one" link
2. Fill signup form:
   ```
   Name: John Doe
   Email: john@example.com
   Password: Test@123456
   Confirm: Test@123456
   ```
3. Click "Create account"
4. Should see dashboard

### Step 3: Create Project (Admin Only)
1. Click "Projects" in sidebar
2. Fill new project form:
   ```
   Title: My First Project
   Description: Testing the app
   Deadline: 2025-12-31
   ```
3. Click "Create project"

### Step 4: Test Logout/Login
1. Sidebar → "Sign out"
2. Should redirect to login
3. Try logging in with same credentials

---

## Backend API Endpoints (for manual testing)

### Authentication Endpoints

**Signup** (POST)
```
http://localhost:5000/api/auth/signup
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login** (POST)
```
http://localhost:5000/api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "password123"
}
Response includes: token, user object
```

**Get Current User** (GET)
```
http://localhost:5000/api/auth/me
Header: Authorization: Bearer <token>
```

**Logout** (POST)
```
http://localhost:5000/api/auth/logout
Header: Authorization: Bearer <token>
```

---

## Expected Status Codes

| Endpoint | Success | Error |
|----------|---------|-------|
| Signup | 201 | 400 (validation), 409 (duplicate email) |
| Login | 200 | 401 (invalid credentials) |
| Auth Routes | 200 | 401 (no/invalid token) |
| Projects (Admin) | 200 | 403 (not admin) |
| Tasks | 200 | 404 (not found) |

---

## Common Test Users

**User 1 (Created First)**
```
Email: john@example.com
Password: password123
Role: member (default)
```

**User 2 (For Testing)**
```
Email: jane@example.com
Password: test1234
Role: member
```

---

## Debugging Commands

### Check Backend Logs
Watch the terminal where `npm run dev` is running for real-time logs

### Check Frontend Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Perform an action (signup, login)
4. See the request/response

### Clear Browser Storage
```javascript
// In browser console
localStorage.clear()
location.reload()
```

---

## If Something Breaks

### Backend Won't Start
```bash
# Kill existing process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Restart
cd backend
npm run dev
```

### Frontend Shows Blank
```bash
# Clear cache and restart
cd frontend
rm -r node_modules
npm install
npm run dev
```

### Can't Login
1. Check backend is running (should see logs)
2. Check frontend console for errors (F12)
3. Verify email/password are correct
4. Try signing up again with different email

---

## Success Indicators

✅ Backend shows: `✅ Server running on port 5000`
✅ Frontend shows: `VITE v5.4.0 ready in 294 ms`
✅ Landing page loads at localhost:5173
✅ Can signup and see dashboard
✅ Projects/Tasks pages load
✅ Logout works and redirects to login
