import React from 'react';
import { usePageHeader } from '../hooks/usePageHeader';
import Hero from '../semantic/Hero';

// =================================================================================================
// PageLayout Component
// =================================================================================================

interface PageLayoutProps {
  pageId: string;
  children: React.ReactNode;
  banner?: React.ReactNode;
  heroActions?: React.ReactNode;
}

export default function PageLayout({ pageId, children, banner, heroActions }: PageLayoutProps) {
  // ✅ Fixed: Properly destructure the hook return value
  const { data, loading, error } = usePageHeader(pageId);

  const mainContentMargin = banner ? 'mt-32 lg:mt-16' : '';

  // Handle loading state
  if (loading) {
    return (
      <div className='bg-bg-secondary'>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dark"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className='bg-bg-secondary'>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600">Failed to load page header</p>
            <p className="text-sm text-gray-500">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle no data
  if (!data) {
    return (
      <div className='bg-bg-secondary'>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">No page header data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-bg-secondary'>
      <Hero
        title={data.header}
        subtitle={data.subheader}
        imageUrl={data.imageUrl}
        banner={banner}
      >
        {heroActions}
      </Hero>
      <main className={mainContentMargin}>
        {children}
      </main>
    </div>
  );
}