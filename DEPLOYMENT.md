# Vercel Deployment Guide - Tech Journey Frontend

## Prerequisites

1. ✅ GitHub account
2. ✅ Vercel account (free tier) - Sign up at [vercel.com](https://vercel.com)
3. ✅ Backend API deployed and accessible (e.g., Railway, Render, Heroku)

## Step 1: Prepare Your Repository

### 1.1 Create GitHub Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Production ready"

# Create main branch
git branch -M main

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/tech-journey-frontend.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Files

Ensure these files exist:

- ✅ `.env.example` - Template for environment variables
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Dependencies and scripts
- ✅ `.gitignore` - Excludes `.env.local`, `node_modules`, `.next`

## Step 2: Deploy to Vercel

### 2.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Select your GitHub account and repository
5. Click "Import"

### 2.2 Configure Project

**Framework Preset**: Next.js (auto-detected)

**Build Settings**:

- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

**Root Directory**: `./` (default)

### 2.3 Add Environment Variables

Click "Environment Variables" and add:

```
NEXT_PUBLIC_API_URL
Value: https://your-backend-api.com/api/v1
```

```
NEXT_PUBLIC_APP_URL
Value: https://your-project.vercel.app
```

⚠️ **Important**:

- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Update `NEXT_PUBLIC_APP_URL` after first deployment with your actual Vercel URL

### 2.4 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

## Step 3: Post-Deployment Configuration

### 3.1 Update Environment Variables

After first deployment:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
4. Redeploy: "Deployments" → "..." → "Redeploy"

### 3.2 Configure Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

### 3.3 Update Backend CORS

Add your Vercel URL to backend CORS whitelist:

```env
# In backend .env
FRONTEND_URL=https://your-project.vercel.app
```

Backend CORS config should allow:

```javascript
origin: ["https://your-project.vercel.app", "https://your-custom-domain.com"];
```

## Step 4: Verify Deployment

### 4.1 Test Core Features

- [ ] Homepage loads correctly
- [ ] Blog page loads and displays posts
- [ ] Projects page loads
- [ ] Timeline page shows data
- [ ] About page displays
- [ ] Login page accessible
- [ ] Admin dashboard (after login)
- [ ] Footer hidden in admin routes
- [ ] Header navigation works

### 4.2 Test API Connection

Open browser console and check:

1. No CORS errors
2. API calls succeed
3. Data loads correctly
4. Authentication works

### 4.3 Check Performance

Use these tools:

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Vercel Analytics (in dashboard)

## Step 5: Continuous Deployment

### 5.1 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel will automatically deploy
```

### 5.2 Preview Deployments

- Each PR gets a unique preview URL
- Test before merging to production
- Preview URLs: `https://your-project-git-branch.vercel.app`

### 5.3 Branch Deployments

- `main` branch → Production
- Other branches → Preview deployments
- PRs → Automatic preview links

## Troubleshooting

### Build Fails

**Error**: "Module not found"

```bash
# Fix: Clear cache and reinstall
rm -rf node_modules .next
npm install
git add .
git commit -m "Fix dependencies"
git push
```

**Error**: "Environment variable not defined"

```bash
# Fix: Add missing variables in Vercel dashboard
# Settings → Environment Variables → Add
# Then: Deployments → Redeploy
```

### API Connection Issues

**Error**: "Network Error" or "CORS blocked"

**Solution**:

1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check backend is running and accessible
3. Ensure backend CORS includes your Vercel domain
4. Test API with: `curl https://your-backend.com/api/v1/health`

### Slow Loading

**Issue**: Pages load slowly

**Solutions**:

1. Enable Vercel Edge Network (free)
2. Optimize images (use Next.js Image component)
3. Implement lazy loading
4. Check Vercel Analytics for bottlenecks

### 404 on Routes

**Issue**: Direct URL access returns 404

**Solution**:
This shouldn't happen with Next.js App Router. If it does:

1. Check `vercel.json` is properly configured
2. Ensure routes are in `src/app` directory
3. Verify build completed successfully

## Monitoring & Analytics

### Vercel Analytics (Free)

1. Go to project → "Analytics"
2. View:
   - Page views
   - Top pages
   - Countries
   - Devices
   - Real-time visitors

### Performance Monitoring

1. "Speed Insights" tab
2. Check:
   - Core Web Vitals
   - Lighthouse scores
   - Performance over time

## Scaling & Limits

### Free Tier Limits

- ✅ **Bandwidth**: 100GB/month
- ✅ **Build Minutes**: 6,000/month
- ✅ **Serverless Executions**: 100GB-Hrs/month
- ✅ **Edge Functions**: Unlimited
- ✅ **Deployments**: Unlimited
- ✅ **Team Members**: 1

### When to Upgrade

Upgrade to Pro ($20/mo) if:

- Bandwidth exceeds 100GB/month
- Need team collaboration
- Want password protection
- Need more analytics

## Best Practices

### 1. Environment Management

- Never commit `.env.local` to git
- Use different environment variables for staging/production
- Rotate API keys regularly

### 2. Performance

- ✅ Use Next.js Image component
- ✅ Implement Suspense boundaries
- ✅ Enable static generation where possible
- ✅ Lazy load heavy components

### 3. Security

- ✅ HTTPS only (automatic on Vercel)
- ✅ Secure headers (configured in `vercel.json`)
- ✅ Environment variables for sensitive data
- ✅ Regular dependency updates

### 4. SEO

- ✅ Metadata in `layout.tsx`
- ✅ Dynamic metadata for blog posts
- ✅ Sitemap.xml generation
- ✅ robots.txt configuration

## Quick Commands

```bash
# Local testing
npm run dev

# Production build test
npm run build
npm start

# Deploy
git push origin main

# Check logs
vercel logs

# Rollback
# Go to Vercel dashboard → Deployments → "..." → Promote to Production
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Status Page](https://vercel-status.com)

## Success! 🎉

Your Tech Journey frontend is now live on Vercel!

**Next Steps**:

1. Share your portfolio URL
2. Set up custom domain
3. Enable Vercel Analytics
4. Monitor performance
5. Iterate and improve

Need help? Open an issue on GitHub or contact support!
