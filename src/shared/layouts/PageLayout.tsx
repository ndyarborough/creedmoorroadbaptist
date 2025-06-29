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
  const data = usePageHeader(pageId);

  const mainContentMargin = banner ? 'mt-16' : '';
  if (!data) return null;

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
