'use client';
import { usePathname } from 'next/navigation';
import TopNav from './TopNav';

const ConditionalTopNav = () => {
  const pathname = usePathname();

  // List of paths where TopNav should be hidden
  const hiddenPaths = [
    '/authentication',
    '/authentication/login',
    '/authentication/register',
    '/authentication/forgot-password'
  ];

  // Check if current path starts with any of the hidden paths
  const shouldHideNav = hiddenPaths.some(path =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // Don't render TopNav on authentication pages
  if (shouldHideNav) {
    return null;
  }

  // Render TopNav on all other pages
  return <TopNav />;
};

export default ConditionalTopNav;