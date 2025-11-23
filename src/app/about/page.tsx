'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/lib/api/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  Twitter,
  Code,
  Send
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  displayOrder: number;
}

interface GroupedSkills {
  [category: string]: Skill[];
}

export default function AboutPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [groupedSkills, setGroupedSkills] = useState<GroupedSkills>({});
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/skills');
      // Backend returns { success, data: [...skills] }
      const skillsData = response.data || [];
      setSkills(skillsData);

      // Group skills by category
      const grouped = skillsData.reduce((acc: GroupedSkills, skill: Skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {});

      setGroupedSkills(grouped);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate form submission (replace with actual API call if you have a contact endpoint)
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 70) return 'Advanced';
    if (proficiency >= 50) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white text-5xl font-bold mb-6">
            <Code className="h-16 w-16" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate full-stack developer dedicated to creating elegant solutions to complex problems.
            With expertise in modern web technologies, I build scalable applications that deliver exceptional user experiences.
          </p>
        </div>

        {/* Bio Section */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            My Story
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              My journey in software development began several years ago, driven by curiosity and a passion for problem-solving.
              I started with basic HTML and CSS, and quickly fell in love with the endless possibilities of web development.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Over the years, I've worked on diverse projects ranging from e-commerce platforms to complex enterprise applications.
              I specialize in JavaScript/TypeScript ecosystem, particularly React, Next.js, Node.js, and modern database technologies.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you'll find me writing technical blog posts, contributing to open-source projects,
              or exploring new technologies to stay at the forefront of web development.
            </p>
          </div>
        </Card>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Skills & Expertise
          </h2>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-4" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="h-20 bg-gray-300 dark:bg-gray-700 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills
                      .sort((a, b) => b.proficiency - a.proficiency)
                      .map((skill) => (
                        <Card key={skill.id} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {skill.name}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {getProficiencyLabel(skill.proficiency)}
                            </Badge>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch
            </h2>
            <div className="space-y-4">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
                your.email@example.com
              </a>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5" />
                San Francisco, CA
              </div>
              <a
                href="https://yourwebsite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
                yourwebsite.com
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Connect with me
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              {formStatus === 'success' && (
                <p className="text-sm text-green-600 dark:text-green-400 text-center">
                  Message sent successfully!
                </p>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
