'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/lib/api/client';
import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trash2, MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  isApproved: boolean;
  createdAt: string;
  post: {
    title: string;
    slug: string;
  };
}

export default function AdminCommentsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/auth/login');
      return;
    }
    fetchComments();
  }, [isAuthenticated, user, router]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response: any = await apiClient.get('/comments');
      setComments(response.data || []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await apiClient.put(`/comments/${id}/approve`);
      fetchComments();
    } catch (error) {
      console.error('Failed to approve comment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await apiClient.delete(`/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const filteredComments = comments.filter((comment) => {
    if (filter === 'pending') return !comment.isApproved;
    if (filter === 'approved') return comment.isApproved;
    return true;
  });

  const pendingCount = comments.filter((c) => !c.isApproved).length;

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Comments
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {comments.length} total comments • {pendingCount} pending approval
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All ({comments.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending ({pendingCount})
          </Button>
          <Button
            variant={filter === 'approved' ? 'default' : 'outline'}
            onClick={() => setFilter('approved')}
          >
            Approved ({comments.length - pendingCount})
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg border p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'pending'
                ? 'No pending comments'
                : filter === 'approved'
                ? 'No approved comments yet'
                : 'No comments yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {comment.authorName}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {comment.authorEmail}
                      </span>
                      {comment.isApproved ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        On:{' '}
                        <Link
                          href={`/blog/${comment.post.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {comment.post.title}
                        </Link>
                      </span>
                      <span>•</span>
                      <span>{new Date(comment.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!comment.isApproved && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(comment.id)}
                        className="gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
