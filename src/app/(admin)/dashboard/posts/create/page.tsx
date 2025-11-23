'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import apiClient from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  categoryId: z.string().optional(),
  tags: z.string().optional(),
  isPublished: z.boolean().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      isPublished: false,
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...data,
        tags: data.tags ? data.tags.split(',').map((tag) => tag.trim()) : [],
      };

      await apiClient.post('/posts', payload);
      router.push('/dashboard/posts');
    } catch (err: any) {
      setError(err?.message || 'Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard/posts" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Posts
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Create New Post
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-800 dark:text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <Input {...register('title')} placeholder="Enter post title" />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt *
              </label>
              <Textarea
                {...register('excerpt')}
                rows={3}
                placeholder="Brief description of the post"
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content * (Markdown supported)
              </label>
              <Textarea
                {...register('content')}
                rows={15}
                placeholder="Write your post content in Markdown..."
                className="font-mono"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image URL
              </label>
              <Input
                {...register('coverImage')}
                type="url"
                placeholder="https://example.com/image.jpg"
              />
              {errors.coverImage && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.coverImage.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <Input
                {...register('tags')}
                placeholder="react, typescript, nextjs"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                {...register('isPublished')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isPublished"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Publish immediately
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Post'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/posts')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
