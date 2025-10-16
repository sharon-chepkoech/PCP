# Deployment Procedure - Property Valuation Form

## Prerequisites

Before deploying, ensure you have:
- A hosting platform account (Vercel, Netlify, or similar)
- Access to your Google Apps Script URL (configured in the code)
- Git installed on your computer
- GitHub account

---

## Option 1: Deploy to Vercel via GitHub (Recommended)

### Step 1: Initialize Git Repository (if not already done)

```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize git if not already initialized
git init

# Check status
git status
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the "+" icon in top-right corner
3. Select "New repository"
4. Fill in repository details:
   - **Repository name:** `property-valuation-form` (or your preferred name)
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (you already have these)
5. Click "Create repository"

### Step 3: Connect Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Property valuation form"

# Add GitHub as remote origin (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johnsmith/property-valuation-form.git
git branch -M main
git push -u origin main
```

### Step 4: Verify Upload to GitHub

1. Refresh your GitHub repository page
2. You should see all your project files
3. Verify `.env` is NOT visible (it's in `.gitignore` so it won't be uploaded)

### Step 5: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Select "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 6: Import Project from GitHub

1. On Vercel dashboard, click "Add New..." → "Project"
2. You'll see a list of your GitHub repositories
3. Find your `property-valuation-form` repository
4. Click "Import"

### Step 7: Configure Project Settings

Vercel will auto-detect your project settings:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Leave these as default (Vercel detects them automatically).

### Step 8: Add Environment Variables

Before deploying, add your environment variables:

1. Expand "Environment Variables" section
2. Add the following variables:

   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://0ec90b57d6e95fcbda19832f.supabase.co`

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw`

3. Click "Add" after each variable

### Step 9: Deploy

1. Click "Deploy"
2. Vercel will:
   - Install dependencies
   - Build your project
   - Deploy to their CDN
3. Wait 2-3 minutes for deployment to complete

### Step 10: Access Your Live Site

1. Once deployed, Vercel shows your site URL
2. Example: `https://property-valuation-form.vercel.app`
3. Click "Visit" to view your live site

### Step 11: Verify Deployment

Test your deployed application:
- [ ] Site loads correctly
- [ ] All images display
- [ ] Form fields work
- [ ] Form validation functions
- [ ] Submit form and check Google Sheets
- [ ] Success screen appears
- [ ] Mobile view works properly

---

## Making Updates After Deployment

Once deployed, any updates you push to GitHub will automatically redeploy:

### Update Workflow:

```bash
# Make your changes to the code

# Check what files changed
git status

# Add changed files
git add .

# Commit with a descriptive message
git commit -m "Fix: Updated form validation logic"

# Push to GitHub
git push origin main
```

**Vercel will automatically:**
1. Detect the push to GitHub
2. Start a new build
3. Deploy the updated version
4. Keep the same URL

You'll receive notifications about deployment status.

---

## Option 2: Deploy to Netlify via GitHub

### Step 1-4: Same as Vercel (Setup GitHub)

Follow Steps 1-4 from Option 1 to get your code on GitHub.

### Step 5: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in with GitHub
3. Authorize Netlify to access your repositories

### Step 6: Import Project

1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select your repository
4. Click on your `property-valuation-form` repository

### Step 7: Configure Build Settings

- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Step 8: Add Environment Variables

1. Click "Show advanced"
2. Click "New variable"
3. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 9: Deploy

1. Click "Deploy site"
2. Wait for build to complete
3. Access your site at the Netlify URL

---

## Option 3: Manual Build & Upload

### Step 1: Build Production Files
```bash
npm run build
```

### Step 2: Verify Build
- Check that a `dist` folder was created
- Contains `index.html`, `assets` folder with JS/CSS

### Step 3: Upload to Hosting
1. **For traditional hosting (cPanel, etc.):**
   - Upload entire `dist` folder contents to `public_html` or `www`
   - Configure `.htaccess` for SPA routing if needed

2. **For cloud storage (AWS S3, etc.):**
   - Upload `dist` folder contents to your bucket
   - Enable static website hosting
   - Set `index.html` as the index document

### Step 4: Configure Environment Variables
Since `.env` isn't included in the build, you have two options:
1. Replace environment variables in code before building
2. Use your hosting platform's environment variable feature

---

## Branch Strategy for Production

### Create a Production Branch

```bash
# Create and switch to production branch
git checkout -b production

# Push production branch to GitHub
git push -u origin production
```

### Configure Vercel to Deploy from Production Branch

1. Go to Vercel project settings
2. Click "Git" tab
3. Change "Production Branch" to `production`
4. Now only pushes to `production` branch trigger production deployments

### Development Workflow

```bash
# Work on main branch for development
git checkout main

# Make changes and commit
git add .
git commit -m "Add new feature"
git push origin main

# When ready for production, merge to production branch
git checkout production
git merge main
git push origin production
```

---

## Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `www.yoursite.com`)
4. Update DNS records at your domain registrar:
   - **Type:** A or CNAME
   - **Name:** @ or www
   - **Value:** Provided by Vercel
5. Wait for DNS propagation (can take 24-48 hours)

### For Netlify:
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions
5. Netlify provides automatic HTTPS via Let's Encrypt

---

## Monitoring & Debugging

### View Deployment Logs (Vercel)
1. Go to your project dashboard
2. Click on a deployment
3. Click "View Function Logs" or "Build Logs"
4. Check for errors

### View Deployment Logs (Netlify)
1. Go to "Deploys" tab
2. Click on a deploy
3. View deploy log for details

### Common Issues

**Build fails:**
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run typecheck

# Check for linting errors
npm run lint
```

**Environment variables not working:**
- Ensure they're prefixed with `VITE_`
- Redeploy after adding environment variables
- Check deployment logs for errors

**Form not submitting:**
- Verify Google Apps Script URL is correct
- Check browser console for CORS errors
- Test with browser DevTools Network tab

---

## Rollback a Deployment

### Vercel:
1. Go to "Deployments" tab
2. Find a previous working deployment
3. Click "..." → "Promote to Production"

### Netlify:
1. Go to "Deploys" tab
2. Find previous deploy
3. Click "Publish deploy"

---

## Security Best Practices

1. **Never commit `.env` file**
   - Already in `.gitignore` ✓
   - Always use platform environment variables

2. **Review environment variables**
   - Don't expose sensitive keys in client-side code
   - Use server-side functions for API calls with secrets

3. **Enable HTTPS**
   - Vercel and Netlify provide this automatically
   - For custom hosting, configure SSL certificate

4. **Monitor deployments**
   - Set up email notifications for deploy status
   - Review deployment logs regularly

---

## Quick Reference Commands

```bash
# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# Check current branch
git branch

# Switch branches
git checkout branch-name

# Create new branch
git checkout -b new-branch-name

# View commit history
git log --oneline
```

---

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Netlify Documentation:** https://docs.netlify.com
- **GitHub Documentation:** https://docs.github.com
- **Vite Documentation:** https://vitejs.dev

---

## Post-Deployment Checklist

- [ ] Code pushed to GitHub successfully
- [ ] Repository connected to hosting platform
- [ ] Environment variables configured
- [ ] Deployment completed without errors
- [ ] Site accessible via provided URL
- [ ] Form submission works and saves to Google Sheets
- [ ] All images and assets load correctly
- [ ] Mobile responsive design verified
- [ ] No console errors in browser
- [ ] Success screen displays properly
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Team members notified of deployment

---

## Next Steps

1. Test thoroughly on different devices and browsers
2. Set up monitoring/analytics (Google Analytics, Vercel Analytics)
3. Configure custom domain if needed
4. Set up continuous deployment workflow
5. Document any custom configurations
6. Share deployment URL with stakeholders
