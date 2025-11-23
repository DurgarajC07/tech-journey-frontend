'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/lib/api/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Briefcase,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Eye,
  Users,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  totalProjects: number;
  totalComments: number;
  totalViews: number;
  totalLearnings: number;
  totalSkills: number;
  totalMilestones: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentComments, setRecentComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch stats - ResponseHandler wraps in { success, data, message }
      const statsResponse = await apiClient.get('/analytics/stats');
      setStats(statsResponse.data);

      // Fetch recent posts - Paginated response with { data, meta }
      const postsResponse: any = await apiClient.get('/posts?pageSize=5');
      setRecentPosts(postsResponse.data || []);

      // Fetch recent comments - Paginated response with { data, meta }
      const commentsResponse: any = await apiClient.get('/comments?pageSize=5');
      setRecentComments(commentsResponse.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Posts',
      value: stats?.totalPosts || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      link: '/dashboard/posts',
    },
    {
      title: 'Projects',
      value: stats?.totalProjects || 0,
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      link: '/dashboard/projects',
    },
    {
      title: 'Comments',
      value: stats?.totalComments || 0,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      link: '/dashboard/comments',
    },
    {
      title: 'Learning Items',
      value: stats?.totalLearnings || 0,
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      link: '/dashboard/learning',
    },
    {
      title: 'Skills',
      value: stats?.totalSkills || 0,
      icon: TrendingUp,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      link: '/dashboard/skills',
    },
    {
      title: 'Total Views',
      value: stats?.totalViews || 0,
      icon: Eye,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      link: '#',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border animate-pulse">
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's an overview of your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Posts
            </h2>
            <Link href="/dashboard/posts">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No posts yet</p>
            ) : (
              recentPosts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.isPublished ? 'Published' : 'Draft'}
                    </p>
                  </div>
                  <Link href={`/dashboard/posts/edit/${post.id}`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recent Comments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Comments
            </h2>
            <Link href="/dashboard/comments">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentComments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No comments yet</p>
            ) : (
              recentComments.slice(0, 5).map((comment) => (
                <div
                  key={comment.id}
                  className="py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                >
                  <p className="text-sm text-gray-900 dark:text-white line-clamp-2 mb-1">
                    {comment.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By {comment.authorName}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/posts/create">
            <Button className="w-full" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </Link>
          <Link href="/dashboard/projects/create">
            <Button className="w-full" variant="outline">
              <Briefcase className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </Link>
          <Link href="/dashboard/learning/create">
            <Button className="w-full" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              New Learning
            </Button>
          </Link>
          <Link href="/dashboard/skills/create">
            <Button className="w-full" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              New Skill
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
