// src/layouts/PageLayout.tsx
import React from 'react'
import { usePageHeader } from '../hooks/usePageHeader'
import PageHeader from '../components/PageHeader'

interface PageLayoutProps {
  pageId: string
  children: React.ReactNode
}

export default function PageLayout({ pageId, children }: PageLayoutProps) {
  const data = usePageHeader(pageId)
  if (!data) return null

  return (
    <>
      <PageHeader
        header={data.header}
        subheader={data.subheader}
        image={data.imageUrl}
      />
      {children}
    </>
  )
}
