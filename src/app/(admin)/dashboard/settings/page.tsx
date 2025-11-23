'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api/client';
import { useAuthStore } from '@/lib/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Bell, Lock, User, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [settings, setSettings] = useState({
    siteName: 'Tech Journey',
    siteDescription: 'Personal blog and portfolio',
    postsPerPage: 10,
    commentsEnabled: true,
    commentApproval: true,
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/auth/login');
      return;
    }
  }, [isAuthenticated, user, router]);

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        <div className="space-y-6">
          {/* General Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  General Settings
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Basic site configuration
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Name
                </label>
                <Input
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Description
                </label>
                <Input
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({ ...settings, siteDescription: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Posts Per Page
                </label>
                <Input
                  type="number"
                  value={settings.postsPerPage}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      postsPerPage: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Comment Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Comment Settings
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage comment moderation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Enable Comments
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Allow users to comment on posts
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.commentsEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      commentsEnabled: e.target.checked,
                    })
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Comment Approval
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Require approval before comments are published
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.commentApproval}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      commentApproval: e.target.checked,
                    })
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
