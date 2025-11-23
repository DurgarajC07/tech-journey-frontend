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

const timelineSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['EDUCATION', 'WORK', 'PROJECT', 'ACHIEVEMENT', 'OTHER']),
  date: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  company: z.string().optional(),
  location: z.string().optional(),
  tags: z.string().optional(),
});

type TimelineFormData = z.infer<typeof timelineSchema>;

export default function CreateTimelinePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimelineFormData>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      type: 'WORK',
    },
  });

  const onSubmit = async (data: TimelineFormData) => {
    setIsSubmitting(true);
    try {
      const timelineData = {
        ...data,
        endDate: data.endDate || null,
        company: data.company || null,
        location: data.location || null,
        tags: data.tags ? data.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      };

      await apiClient.post('/timeline', timelineData);
      router.push('/dashboard/timeline');
    } catch (error: any) {
      console.error('Failed to create milestone:', error);
      alert(error.response?.data?.message || 'Failed to create milestone');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/timeline" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Timeline
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Milestone</h1>
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
                  placeholder="Senior Software Engineer"
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
                  placeholder="Led development of a microservices architecture, mentored junior developers, and improved system performance by 40%"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type *
                </label>
                <select
                  {...register('type')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="WORK">Work Experience</option>
                  <option value="EDUCATION">Education</option>
                  <option value="PROJECT">Project</option>
                  <option value="ACHIEVEMENT">Achievement</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <Input
                    type="date"
                    {...register('date')}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date (optional)
                  </label>
                  <Input
                    type="date"
                    {...register('endDate')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company/Organization
                </label>
                <Input
                  {...register('company')}
                  placeholder="Tech Company Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <Input
                  {...register('location')}
                  placeholder="San Francisco, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <Input
                  {...register('tags')}
                  placeholder="leadership, microservices, nodejs"
                />
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Creating...' : 'Create Milestone'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/timeline')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
