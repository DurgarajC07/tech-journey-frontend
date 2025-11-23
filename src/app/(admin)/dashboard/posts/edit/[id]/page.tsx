'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import apiClient from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.string(),
  isPublished: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    fetchPost();
  }, [resolvedParams.id]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response: any = await apiClient.get(`/posts/id/${resolvedParams.id}`);
      // Backend returns { success, data: post, message }
      const post = response.data;
      setValue('title', post.title);
      setValue('slug', post.slug);
      setValue('excerpt', post.excerpt);
      setValue('content', post.content);
      setValue('coverImage', post.coverImage || '');
      setValue('tags', post.tags.join(', '));
      setValue('isPublished', post.isPublished);
    } catch (error) {
      console.error('Failed to fetch post:', error);
      alert('Failed to load post');
      router.push('/dashboard/posts');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    try {
      const postData = {
        ...data,
        tags: data.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        coverImage: data.coverImage || null,
      };

      await apiClient.put(`/posts/${resolvedParams.id}`, postData);
      router.push('/dashboard/posts');
    } catch (error: any) {
      console.error('Failed to update post:', error);
      alert(error.response?.data?.message || 'Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/posts" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <Input {...register('title')} />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slug *
                </label>
                <Input {...register('slug')} />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  {...register('excerpt')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
                {errors.excerpt && (
                  <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content * (Markdown)
                </label>
                <textarea
                  {...register('content')}
                  rows={16}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white font-mono text-sm"
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Image URL
                </label>
                <Input {...register('coverImage')} />
                {errors.coverImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <Input {...register('tags')} placeholder="javascript, react, typescript" />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('isPublished')}
                  id="published"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Publish immediately
                </label>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
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
  );
}
