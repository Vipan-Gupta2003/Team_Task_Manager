# Deployment Guide: GitHub & Railway

## Part 1: Setup GitHub Repository

### Step 1: Initialize Git (if not already done)
```bash
cd e:\Team_task_manager
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Create `.gitignore` file
Already exists at project root. Verify it contains:
```
node_modules/
.env
.env.local
dist/
build/
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vscode/
.idea/
*.log
```

### Step 3: Stage and Commit Files
```bash
git add .
git commit -m "Initial commit: Team Task Manager full-stack app"
```

### Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository: `team-task-manager`
3. Do NOT initialize with README (we have one)
4. Click "Create repository"

### Step 5: Connect Local Repo to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/team-task-manager.git
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy Backend to Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

Or on Windows (using Chocolatey):
```bash
choco install railway
```

### Step 2: Login to Railway
```bash
railway login
```

This opens a browser. Login with GitHub account and authorize Railway.

### Step 3: Create Backend Project
```bash
cd backend
railway init
```

When prompted:
- **Project name**: `team-task-manager-backend`
- **Select Node.js environment**: Yes

### Step 4: Configure Environment Variables
```bash
railway variables
```

Add these variables:
```
PORT=5000
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=https://your-frontend-domain.com
NODE_ENV=production
```

### Step 5: Deploy Backend
```bash
railway up
```

Watch for deployment logs. When complete, you'll get a public URL like:
```
https://team-task-manager-backend-prod.up.railway.app
```

### Step 6: Configure Database Connection
1. In Railway dashboard, add MongoDB plugin:
   - Click "Add Service"
   - Select "MongoDB"
   - Railway will provide MONGO_URI automatically

---

## Part 3: Deploy Frontend to Railway

### Step 1: Create Frontend Directory Structure
```bash
cd frontend
```

### Step 2: Create `railway.json` in frontend root
```json
{
  "build": {
    "builder": "dockerfile"
  }
}
```

### Step 3: Create `Dockerfile` in frontend root
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=0 /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Step 4: Initialize Frontend on Railway
```bash
railway init
```

When prompted:
- **Project name**: `team-task-manager-frontend`
- **Select environment**: Node.js

### Step 5: Configure Environment Variables
```bash
railway variables
```

Add:
```
VITE_API_URL=https://team-task-manager-backend-prod.up.railway.app/api
```

### Step 6: Deploy Frontend
```bash
railway up
```

You'll get a frontend URL like:
```
https://team-task-manager-frontend-prod.up.railway.app
```

---

## Part 4: Post-Deployment Configuration

### Step 1: Update Backend CORS
In backend `.env` on Railway:
```
CLIENT_URL=https://team-task-manager-frontend-prod.up.railway.app
```

### Step 2: Test API Connection
```bash
# Test from frontend machine
curl https://team-task-manager-backend-prod.up.railway.app/api/ping
```

Should return:
```json
{"message":"Team Task Manager API is running"}
```

### Step 3: Verify Frontend
Open in browser:
```
https://team-task-manager-frontend-prod.up.railway.app
```

Should show:
- Landing page loads
- Can navigate to signup
- Can create account
- Can login

---

## Part 5: Alternative Deployment Options

### For Frontend: Vercel (Recommended for React/Vite)

**Step 1**: Install Vercel CLI
```bash
npm install -g vercel
```

**Step 2**: Deploy
```bash
cd frontend
vercel
```

**Step 3**: Configure Environment Variables in Vercel Dashboard
```
VITE_API_URL=your_backend_url/api
```

---

## Part 6: Setting Up CI/CD (Automatic Deployments)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: railwayapp/deploy-action@v1
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
          SERVICE_ID: ${{ secrets.SERVICE_ID }}
```

---

## Part 7: Environment Variables Checklist

### Backend (.env on Railway)
```
✓ PORT=5000
✓ MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
✓ JWT_SECRET=your_secure_32_char_secret
✓ CLIENT_URL=https://your-frontend-url
✓ NODE_ENV=production
```

### Frontend (.env on Railway/Vercel)
```
✓ VITE_API_URL=https://your-backend-url/api
```

---

## Part 8: Monitoring & Logs

### View Railway Logs
```bash
railway logs
```

### Monitor Dashboard
1. Go to https://railway.app/dashboard
2. Select your project
3. View real-time logs and metrics

---

## Part 9: Custom Domains (Optional)

### Railway Custom Domain
1. In Railway dashboard → Project Settings
2. Add custom domain
3. Update DNS CNAME records at your domain registrar

Example:
```
CNAME: api.yourdomain.com → railway.app
CNAME: app.yourdomain.com → railway.app
```

---

## Common Issues & Solutions

### Issue: "CORS errors after deployment"
**Solution**: Update `CLIENT_URL` in backend env vars to match frontend URL

### Issue: "MongoDB connection failed"
**Solution**: Verify MONGO_URI in Railway env vars, check IP whitelist in MongoDB Atlas

### Issue: "Frontend can't reach API"
**Solution**: Check `VITE_API_URL` matches backend URL exactly (with /api suffix)

### Issue: "Build fails on Railway"
**Solution**: Ensure `package.json` has correct build script:
```json
"scripts": {
  "build": "vite build",
  "dev": "vite"
}
```

---

## Final Verification

After deployment, verify these URLs work:

```
✓ Frontend: https://your-frontend-url
✓ Backend Ping: https://your-backend-url/api/ping
✓ Signup: POST https://your-backend-url/api/auth/signup
✓ Login: POST https://your-backend-url/api/auth/login
```

---

## Production Deployment Checklist

- [ ] Git repository created on GitHub
- [ ] All code pushed to main branch
- [ ] Backend deployed to Railway with env vars
- [ ] Frontend deployed to Railway/Vercel with env vars
- [ ] CORS configured for production URLs
- [ ] MongoDB connection verified
- [ ] Tested signup → login → logout flow
- [ ] Verified API communication between frontend and backend
- [ ] Set custom domain (optional)
- [ ] Enabled auto-deployments from GitHub

---

## Live URLs Format

**Backend**: https://railway-generated-name.up.railway.app/api
**Frontend**: https://railway-generated-name.up.railway.app (or Vercel URL)

Save these URLs for documentation!
