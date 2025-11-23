# 🚀 Quick Start - Vercel Deployment

## ⚡ 5-Minute Deployment

### Step 1: Push to GitHub (2 min)

```bash
git init
git add .
git commit -m "Production ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tech-journey-frontend.git
git push -u origin main
```

### Step 2: Deploy to Vercel (2 min)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   ```
4. Click "Deploy"

### Step 3: Update (1 min)

After deployment:

1. Copy your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables
3. Update backend CORS to allow your Vercel URL
4. Redeploy

## ✅ Done!

Your app is live at: `https://your-project.vercel.app`

## 📝 Important Notes

### Backend Requirements

Your backend MUST:

- Be deployed and accessible via HTTPS
- Have CORS configured for your Vercel domain
- Have proper authentication endpoints
- Return data in the expected format

Example backend CORS:

```javascript
cors({
  origin: ["https://your-project.vercel.app"],
  credentials: true,
});
```

### Environment Variables

**Required**:

- `NEXT_PUBLIC_API_URL` - Your backend API URL
- `NEXT_PUBLIC_APP_URL` - Your frontend URL

These are set in Vercel dashboard under:
Settings → Environment Variables

### Testing Deployment

After deployment, test these pages:

- ✅ `/` - Home page
- ✅ `/blog` - Blog listing
- ✅ `/projects` - Projects
- ✅ `/about` - About page
- ✅ `/timeline` - Timeline
- ✅ `/auth/login` - Login page
- ✅ `/dashboard` - Admin (after login)

## 🔧 Common Issues

### API Connection Failed

**Problem**: Can't connect to backend

**Fix**:

1. Check `NEXT_PUBLIC_API_URL` is correct
2. Test backend: `curl https://your-backend.com/api/v1/posts`
3. Verify backend CORS includes Vercel domain
4. Check backend is running

### Footer Overlapping

**Problem**: Footer shows in admin routes

**Fix**: Already fixed! Footer conditionally hides in `/dashboard` routes.

### Build Failed

**Problem**: Build fails during deployment

**Fix**:

```bash
# Test locally first
npm run build

# If local build succeeds but Vercel fails:
# 1. Clear Vercel cache
# 2. Check Vercel build logs
# 3. Verify all dependencies in package.json
```

## 🎯 Next Steps

1. **Custom Domain** (Optional)

   - Settings → Domains → Add domain
   - Update DNS records
   - Update environment variables

2. **Analytics**

   - Enable Vercel Analytics (free)
   - Monitor page views and performance

3. **Performance**
   - Check Lighthouse score
   - Optimize images
   - Enable caching

## 📚 Full Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🆘 Need Help?

- Check [Vercel docs](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Test API with Postman/Insomnia
- Check browser console for errors

---

**Ready to deploy?** Follow the 3 steps above! 🚀
