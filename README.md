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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
