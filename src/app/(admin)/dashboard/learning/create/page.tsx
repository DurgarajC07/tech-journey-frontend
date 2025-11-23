'use client';

import { useState } from 'react';
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

export default function CreateLearningPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LearningFormData>({
    resolver: zodResolver(learningSchema),
    defaultValues: {
      status: 'NOT_STARTED',
      progress: 0,
    },
  });

  const onSubmit = async (data: LearningFormData) => {
    setIsSubmitting(true);
    try {
      const learningData = {
        ...data,
        resourceUrl: data.resourceUrl || null,
      };

      await apiClient.post('/learning', learningData);
      router.push('/dashboard/learning');
    } catch (error: any) {
      console.error('Failed to create learning item:', error);
      alert(error.response?.data?.message || 'Failed to create learning item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/learning" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Learning Item</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <Input
                  {...register('title')}
                  placeholder="React Hooks Deep Dive"
                />
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
                  placeholder="Learn about React hooks including useState, useEffect, useContext, and custom hooks"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <Input
                  {...register('category')}
                  placeholder="Frontend Development"
                />
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
                  placeholder="0"
                />
                {errors.progress && (
                  <p className="mt-1 text-sm text-red-600">{errors.progress.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resource URL
                </label>
                <Input
                  {...register('resourceUrl')}
                  placeholder="https://react.dev/learn"
                />
                {errors.resourceUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.resourceUrl.message}</p>
                )}
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Creating...' : 'Create Learning Item'}
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
