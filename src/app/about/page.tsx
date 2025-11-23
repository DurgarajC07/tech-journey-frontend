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
            DC
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Durgaraj Chauhan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI & Full-Stack Developer | Sr. Software Engineer
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
            2+ years of experience in AI technologies (Claude AI, LLMs, Generative AI) and building scalable web/cloud solutions
          </p>
        </div>

        {/* Bio Section */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Hi! I'm Durgaraj Chauhan, a Technical Professional and AI & Full-Stack Developer with over 2+ years of experience 
              specializing in AI technologies including Claude AI, LLMs (Large Language Models), and Generative AI. I'm currently 
              working as a Senior Software Engineer at Anvex AI Technologies in Navi Mumbai, where I build cutting-edge AI-powered 
              solutions.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I graduated with a Bachelor of Engineering from Saraswati College of Engineering, Kharghar (2020-2023) with 78.34%, 
              and completed my Diploma from Saraswati Institute of Technology, Kharghar (2017-2020) with an impressive 90.91%. 
              My technical expertise spans across React.js, Node.js, Python (Flask & FastAPI), Docker, and cloud platforms like 
              AWS and Azure.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              At Anvex AI Technologies, I've built AI-powered chatbots and call bots using VAPI + Redis, implemented LLM-driven 
              context retention for seamless call-to-chat switching, and designed agentic workflows for automating repetitive tasks. 
              I've also integrated Vision-Language Models (VLMs) for processing invoices and bank statements. Previously, at Reboot 
              Technology Pvt LTD (2023-2025), I developed screen recorder extensions, QR-based check-in systems, and integrated 
              various APIs including Twilio, Stripe/Razorpay, and DocuSign.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              My passion lies in AI-driven automation, building production-ready applications, and performance optimization. I've 
              worked on diverse projects including an AI Chatbot & Callbot System, Insurance Damage Estimation Website using Computer 
              Vision, NFT Marketplace using Blockchain, and a comprehensive Content Management System. When I'm not coding, I enjoy 
              playing cricket, listening to music, travelling, and watching anime.
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
                href="mailto:durgarajchauhan@gmail.com"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
                durgarajchauhan@gmail.com
              </a>
              <a
                href="tel:+918268874907"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 8268874907
              </a>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="h-5 w-5" />
                Mumbai, Maharashtra, India
              </div>
              <a
                href="https://durgarajchauhan.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
                durgarajchauhan.vercel.app
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Connect with me
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/DurgarajChauhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/durgaraj-chauhan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/DurgarajChauhan"
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
