'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, ExternalLink, Clock, TrendingUp } from 'lucide-react';

interface LearningItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'LEARNING' | 'COMPLETED' | 'PAUSED';
  progress: number;
  resourceUrl: string | null;
  startedAt: string;
  completedAt: string | null;
}

export default function LearningPage() {
  const [items, setItems] = useState<LearningItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LearningItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchLearningItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, statusFilter, categoryFilter]);

  const fetchLearningItems = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/learning');
      // Backend returns { success, data: [...items], meta }
      const itemsData = response.data || [];
      setItems(itemsData);

      // Extract unique categories
      const cats = new Set<string>();
      itemsData.forEach((item: LearningItem) => cats.add(item.category));
      setCategories(Array.from(cats).sort());
    } catch (error) {
      console.error('Failed to fetch learning items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...items];

    if (statusFilter !== 'all') {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }

    setFilteredItems(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LEARNING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return '';
    }
  };

  const stats = {
    total: items.length,
    learning: items.filter((i) => i.status === 'LEARNING').length,
    completed: items.filter((i) => i.status === 'COMPLETED').length,
    paused: items.filter((i) => i.status === 'PAUSED').length,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Journey
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tracking my continuous learning and skill development
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.learning}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learning</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.paused}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Paused</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="LEARNING">Learning</option>
            <option value="COMPLETED">Completed</option>
            <option value="PAUSED">Paused</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {(statusFilter !== 'all' || categoryFilter !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Learning Items */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No learning items found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Started {new Date(item.startedAt).toLocaleDateString()}</span>
                  </div>
                  {item.resourceUrl && (
                    <a
                      href={item.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Resource
                      </Button>
                    </a>
                  )}
                </div>

                {item.completedAt && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Completed {new Date(item.completedAt).toLocaleDateString()}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
