# Tech Journey - Frontend

A modern Next.js 16 frontend application for showcasing a personal tech journey with blog, projects, learning tracker, and timeline features.

## 🚀 Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persist
- **HTTP Client**: Axios
- **Forms**: react-hook-form + Zod validation
- **Markdown**: react-markdown + react-syntax-highlighter
- **Animations**: framer-motion
- **Date Handling**: date-fns

## ✨ Features

- **Home Page**: Hero section with features and CTAs
- **Authentication**: Login, Register, Profile management
- **Blog**:
  - Listing with pagination, search, and filters
  - Markdown rendering with syntax highlighting
  - Category and tag navigation
  - Related posts
- **Projects**: Portfolio showcase with tech stack filtering
- **Admin Dashboard**: Analytics and content management
- **Learning Journey**: Progress tracking with statistics
- **Timeline**: Visual professional milestones
- **About**: Bio, skills showcase, and contact form
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Full dark mode support

## 🛠️ Setup

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📦 Deploy on Vercel (Free Tier)

### Method 1: Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Method 2: Manual Steps

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure Project Settings:
     - Framework Preset: **Next.js**
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

3. **Environment Variables**
   Add these in Vercel project settings:

   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api-url.com/api/v1
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Production Checklist

- ✅ Environment variables configured
- ✅ Backend API is deployed and accessible
- ✅ CORS configured on backend for your domain
- ✅ API rate limiting configured
- ✅ Error boundaries implemented
- ✅ Loading states added
- ✅ SEO metadata configured

### Vercel Free Tier Limits

- **Bandwidth**: 100GB per month
- **Build Time**: 6,000 minutes per month
- **Serverless Functions**: 100GB-Hrs compute time
- **Deployments**: Unlimited
- **Custom Domains**: Unlimited

Perfect for personal portfolios and small projects!

## 🔧 Troubleshooting

### Build Errors

If you encounter build errors:

1. Delete `.next` folder and `node_modules`
2. Run `npm install`
3. Run `npm run build`

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend CORS settings
- Ensure backend is running and accessible

### Environment Variables Not Working

- Environment variables must start with `NEXT_PUBLIC_` to be accessible in browser
- Redeploy after changing environment variables in Vercel

## 📄 License

MIT
