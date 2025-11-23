'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Clock } from 'lucide-react';
import Link from 'next/link';

interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  type: 'EDUCATION' | 'WORK' | 'PROJECT' | 'ACHIEVEMENT' | 'OTHER';
  date: string;
  endDate: string | null;
  company: string | null;
  location: string | null;
  tags: string[];
  createdAt: string;
}

export default function TimelineManagementPage() {
  const router = useRouter();
  const [milestones, setMilestones] = useState<TimelineMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    setIsLoading(true);
    try {
      const response: any = await apiClient.get('/timeline');
      // Backend returns { success, data: [...milestones], meta }
      setMilestones(response.data || []);
    } catch (error) {
      console.error('Failed to fetch timeline milestones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return;

    try {
      await apiClient.delete(`/timeline/${id}`);
      setMilestones(milestones.filter((milestone) => milestone.id !== id));
    } catch (error) {
      console.error('Failed to delete milestone:', error);
      alert('Failed to delete milestone');
    }
  };

  const types = ['all', 'EDUCATION', 'WORK', 'PROJECT', 'ACHIEVEMENT', 'OTHER'];

  const filteredMilestones = milestones.filter((milestone) => {
    const matchesSearch = milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         milestone.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || milestone.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EDUCATION': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'WORK': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'PROJECT': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'ACHIEVEMENT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Clock className="h-8 w-8" />
            Timeline Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your professional journey milestones
          </p>
        </div>
        <Link href="/dashboard/timeline/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Milestone
          </Button>
        </Link>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search milestones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {filteredMilestones.length === 0 ? (
        <Card className="p-12 text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No milestones found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery ? 'Try adjusting your search filters' : 'Get started by adding your first milestone'}
          </p>
          {!searchQuery && (
            <Link href="/dashboard/timeline/create">
              <Button>Add Milestone</Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMilestones
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((milestone) => (
              <Card key={milestone.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className={getTypeColor(milestone.type)}>
                      {milestone.type}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(milestone.date)}
                      {milestone.endDate && ` - ${formatDate(milestone.endDate)}`}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/timeline/edit/${milestone.id}`)}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(milestone.id)}
                      className="text-red-600 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {milestone.title}
                </h3>

                {(milestone.company || milestone.location) && (
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {milestone.company}
                    {milestone.company && milestone.location && ' • '}
                    {milestone.location}
                  </p>
                )}

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {milestone.description}
                </p>

                {milestone.tags && milestone.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {milestone.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
