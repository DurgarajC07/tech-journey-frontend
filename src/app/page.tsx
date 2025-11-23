import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Rocket, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Full-Stack Developer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Building Digital Experiences
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Welcome to my tech journey. I build modern web applications, share knowledge through blog posts,
              and continuously learn new technologies.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/projects">
                <Button size="lg" className="gap-2">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What I Do</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Passionate about creating impactful solutions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-800 p-8 hover:shadow-lg transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                Full-Stack Development
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Building scalable web applications with modern technologies like React, Next.js, Node.js, and TypeScript.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-800 p-8 hover:shadow-lg transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                Technical Writing
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Sharing knowledge through in-depth blog posts about web development, best practices, and new technologies.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-gray-800 p-8 hover:shadow-lg transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                <Rocket className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                Continuous Learning
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Always exploring new frameworks, tools, and methodologies to stay at the forefront of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to collaborate?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Let's work together to build something amazing
          </p>
          <div className="mt-8">
            <Link href="/about">
              <Button size="lg" variant="secondary">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
