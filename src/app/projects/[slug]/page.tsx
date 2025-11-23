'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/lib/api/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string | null;
  thumbnailImage: string | null;
  images: string[];
  techStack: string[];
  status: string;
  isFeatured: boolean;
  demoUrl: string | null;
  githubUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  features: string[];
  challenges: string | null;
  learnings: string | null;
  createdAt: string;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [resolvedParams.slug]);

  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const response: any = await apiClient.get(`/projects/${resolvedParams.slug}`);
      // Backend returns { success, data: project, message }
      setProject(response.data);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        notFound();
      }
      console.error('Failed to fetch project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/projects" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        {project.thumbnailImage && (
          <div className="w-full h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={project.thumbnailImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{project.status}</Badge>
            {project.isFeatured && (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                Featured
              </Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {project.description}
          </p>
        </header>

        {/* Tech Stack */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Source
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Long Description */}
        {project.longDescription && (
          <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About This Project
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {project.longDescription}
              </p>
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                >
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && (
          <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Challenges & Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {project.challenges}
            </p>
          </div>
        )}

        {/* Learnings */}
        {project.learnings && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What I Learned
            </h2>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {project.learnings}
            </p>
          </div>
        )}

        {/* Timeline */}
        {(project.startDate || project.endDate) && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mt-8">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5" />
              <span>
                {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                {project.startDate && project.endDate && ' - '}
                {project.endDate && new Date(project.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                {project.startDate && !project.endDate && ' - Present'}
              </span>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
