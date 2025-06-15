// src/components/PageHeader.tsx
interface PageHeaderProps {
  header: string
  subheader: string
  image: string
}

export default function PageHeader({ header, subheader, image }: PageHeaderProps) {
  return (
    <div
      className="relative w-full h-64 md:h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Optional dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text container */}
      <div className="relative z-10 flex flex-col justify-center space-y-6 md:space-y-10 h-full px-4 md:px-8 lg:px-16">
        <h1 className="page-header text-white">{header}</h1>
        <h2 className="page-subheader text-white mt-2">{subheader}</h2>
      </div>
    </div>
  )
}
