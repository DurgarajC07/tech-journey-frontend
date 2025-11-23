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

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  proficiency: z.number().min(0).max(100),
  yearsOfExperience: z.number().min(0).optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

export default function CreateSkillPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      proficiency: 50,
    },
  });

  const onSubmit = async (data: SkillFormData) => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/skills', data);
      router.push('/dashboard/skills');
    } catch (error: any) {
      console.error('Failed to create skill:', error);
      alert(error.response?.data?.message || 'Failed to create skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard/skills" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Skills
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Skill</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skill Name *
                </label>
                <Input
                  {...register('name')}
                  placeholder="JavaScript"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <Input
                  {...register('category')}
                  placeholder="Programming Languages"
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Proficiency (0-100) *
                </label>
                <Input
                  type="number"
                  {...register('proficiency', { valueAsNumber: true })}
                  min="0"
                  max="100"
                  placeholder="75"
                />
                {errors.proficiency && (
                  <p className="mt-1 text-sm text-red-600">{errors.proficiency.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years of Experience (optional)
                </label>
                <Input
                  type="number"
                  {...register('yearsOfExperience', { valueAsNumber: true })}
                  min="0"
                  step="0.5"
                  placeholder="3"
                />
                {errors.yearsOfExperience && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
                )}
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Creating...' : 'Create Skill'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/skills')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
