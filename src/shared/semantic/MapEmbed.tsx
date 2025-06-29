import React from 'react';

// =================================================================================================
// MapEmbed Component
// A simple and efficient way to embed a Google Map using an iframe.
// =================================================================================================

interface MapEmbedProps {
  /** The full embed URL from Google Maps. */
  embedUrl: string;
  /** An accessible title for the map content, important for screen readers. */
  title?: string;
}

/**
 * MapEmbed provides a responsive container for a Google Maps iframe.
 * It's designed to be lazy-loaded for better performance and includes
 * necessary attributes for accessibility and security.
 *
 * @example
 * <MapEmbed
 * embedUrl="https://www.google.com/maps/embed?pb=..."
 * title="Location of our main campus"
 * />
 */
const MapEmbed: React.FC<MapEmbedProps> = ({
  embedUrl,
  title = "Location Map",
}) => {
  return (
    <div className="w-full h-full  min-h-[400px] rounded-lg overflow-hidden shadow-2xl">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      ></iframe>
    </div>
  );
};

export default MapEmbed;
