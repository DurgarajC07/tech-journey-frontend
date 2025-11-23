'use client';

import { useState, useEffect } from 'react';
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

const learningSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']),
  progress: z.number().min(0).max(100),
  resourceUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type LearningFormData = z.infer<typeof learningSchema>;

export default function EditLearningPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LearningFormData>({
    resolver: zodResolver(learningSchema),
  });

  useEffect(() => {
    fetchItem();
  }, [params.id]);

  const fetchItem = async () => {
    setIsLoading(true);
    try {
      const response: any = await apiClient.get(`/learning/${params.id}`);
      // Backend returns { success, data: item, message }
      const item = response.data;
      setValue('title', item.title);
      setValue('description', item.description);
      setValue('category', item.category);
      setValue('status', item.status);
      setValue('progress', item.progress);
      setValue('resourceUrl', item.resourceUrl || '');
    } catch (error) {
      console.error('Failed to fetch learning item:', error);
      alert('Failed to load learning item');
      router.push('/dashboard/learning');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: LearningFormData) => {
    setIsSubmitting(true);
    try {
      const learningData = {
        ...data,
        resourceUrl: data.resourceUrl || null,
      };

      await apiClient.put(`/learning/${params.id}`, learningData);
      router.push('/dashboard/learning');
    } catch (error: any) {
      console.error('Failed to update learning item:', error);
      alert(error.response?.data?.message || 'Failed to update learning item');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
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
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/learning" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Learning Item</h1>
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
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <Input {...register('category')} />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status *
                </label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="NOT_STARTED">Not Started</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="ON_HOLD">On Hold</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Progress (0-100) *
                </label>
                <Input
                  type="number"
                  {...register('progress', { valueAsNumber: true })}
                  min="0"
                  max="100"
                />
                {errors.progress && (
                  <p className="mt-1 text-sm text-red-600">{errors.progress.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resource URL
                </label>
                <Input {...register('resourceUrl')} />
                {errors.resourceUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.resourceUrl.message}</p>
                )}
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
              onClick={() => router.push('/dashboard/learning')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
