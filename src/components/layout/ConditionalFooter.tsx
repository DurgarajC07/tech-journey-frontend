'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/dashboard');

  if (isAdminRoute) {
    return null;
  }

  return <Footer />;
}
