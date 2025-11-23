'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  FolderKanban,
  Calendar
} from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  type: 'ACHIEVEMENT' | 'JOB' | 'EDUCATION' | 'PROJECT';
  date: string;
  company: string | null;
  location: string | null;
  tags?: string[]; // Optional since it's not in database
}

interface GroupedMilestones {
  [year: string]: Milestone[];
}

export default function TimelinePage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [groupedMilestones, setGroupedMilestones] = useState<GroupedMilestones>({});
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchMilestones();
  }, []);

  useEffect(() => {
    groupMilestonesByYear();
  }, [milestones, typeFilter]);

  const fetchMilestones = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/timeline');
      // Backend returns { success, data: [...milestones] }
      setMilestones(response.data || []);
    } catch (error) {
      console.error('Failed to fetch milestones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupMilestonesByYear = () => {
    let filtered = [...milestones];

    if (typeFilter !== 'all') {
      filtered = filtered.filter((m) => m.type === typeFilter);
    }

    const grouped = filtered.reduce((acc: GroupedMilestones, milestone) => {
      const year = new Date(milestone.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(milestone);
      return acc;
    }, {});

    setGroupedMilestones(grouped);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'JOB':
        return <Briefcase className="h-5 w-5" />;
      case 'EDUCATION':
        return <GraduationCap className="h-5 w-5" />;
      case 'ACHIEVEMENT':
        return <Trophy className="h-5 w-5" />;
      case 'PROJECT':
        return <FolderKanban className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'JOB':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'EDUCATION':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'ACHIEVEMENT':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'PROJECT':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return '';
    }
  };

  const years = Object.keys(groupedMilestones).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Journey
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A timeline of my professional and educational milestones
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={typeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setTypeFilter('all')}
          >
            All
          </Button>
          <Button
            variant={typeFilter === 'JOB' ? 'default' : 'outline'}
            onClick={() => setTypeFilter('JOB')}
            className="gap-2"
          >
            <Briefcase className="h-4 w-4" />
            Jobs
          </Button>
          <Button
            variant={typeFilter === 'EDUCATION' ? 'default' : 'outline'}
            onClick={() => setTypeFilter('EDUCATION')}
            className="gap-2"
          >
            <GraduationCap className="h-4 w-4" />
            Education
          </Button>
          <Button
            variant={typeFilter === 'ACHIEVEMENT' ? 'default' : 'outline'}
            onClick={() => setTypeFilter('ACHIEVEMENT')}
            className="gap-2"
          >
            <Trophy className="h-4 w-4" />
            Achievements
          </Button>
          <Button
            variant={typeFilter === 'PROJECT' ? 'default' : 'outline'}
            onClick={() => setTypeFilter('PROJECT')}
            className="gap-2"
          >
            <FolderKanban className="h-4 w-4" />
            Projects
          </Button>
        </div>

        {/* Timeline */}
        {isLoading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-6" />
                <div className="space-y-4">
                  <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : years.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No milestones found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />

            {years.map((year) => (
              <div key={year} className="mb-12">
                {/* Year Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold text-lg">
                    {year}
                  </div>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Milestones for this year */}
                <div className="space-y-8">
                  {groupedMilestones[year].map((milestone) => (
                    <div key={milestone.id} className="relative pl-20">
                      {/* Icon */}
                      <div className="absolute left-[1.1rem] top-6 h-10 w-10 bg-white dark:bg-gray-800 border-4 border-blue-600 dark:border-blue-400 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                        {getTypeIcon(milestone.type)}
                      </div>

                      {/* Content Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {milestone.title}
                          </h3>
                          <Badge className={getTypeColor(milestone.type)}>
                            {milestone.type}
                          </Badge>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {milestone.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {milestone.company && (
                            <span className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              {milestone.company}
                            </span>
                          )}
                          {milestone.location && (
                            <span>📍 {milestone.location}</span>
                          )}
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(milestone.date).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        {milestone.tags && milestone.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {milestone.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
