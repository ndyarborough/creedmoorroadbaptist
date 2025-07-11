import React from 'react';
import { Schedule, LocationOn } from '@mui/icons-material';
import Heading from '../shared/semantic/Heading';
import Flex from '../shared/semantic/Flex';
import Tag from '../shared/semantic/Tag';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  recurring: boolean;
  photoURLs: string[];
}

interface EventCardProps {
  event: Event;
  isCompact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isCompact = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Compact card for dense listing
  if (isCompact) {
    return (
      <div className="bg-white border border-border-primary rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          {/* Event Image */}
          {event.photoURLs && event.photoURLs.length > 0 && (
            <img 
              src={event.photoURLs[0]} 
              alt={event.title} 
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          )}
          
          {/* Event Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <Heading as="h4" variant="section-subheader" className="text-base font-semibold text-text-primary truncate">
                {event.title}
              </Heading>
              <Tag className="text-xs bg-category-yellow/20 text-category-yellow font-medium ml-2 flex-shrink-0">
                {event.category}
              </Tag>
            </div>
            
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {event.description}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-1">
                <Schedule className="w-4 h-4" />
                <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LocationOn className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              {event.recurring && (
                <span className="text-primary-base font-medium">Recurring</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original full-size card for detailed view
  return (
    <div className="bg-white shadow-md rounded-lg p-2 lg:p-4 border-l-4 border-blue-500">
      <Flex direction='col' justify='center' items='center' className='md:flex-row' gap={4}>
        {event.photoURLs && event.photoURLs.length > 0 && (
          <img 
            src={event.photoURLs[0]} 
            alt={event.title} 
            className="h-full rounded-lg" 
          />
        )}
        <Flex direction="col" gap={2}>
          {/* Date above the header */}
          <Flex direction='col' justify='between' className='md:flex-row gap-1'>
            <Tag className="text-nowrap bg-category-yellow/30 w-fit">
              {formatDate(event.date)}
            </Tag>
            <Tag className='text-nowrap bg-category-orange/30 w-fit'>{event.category}</Tag>
          </Flex>

          <Flex direction="row" justify="between" items="center">
            <Heading as="h3" variant="section-subheader">{event.title}</Heading>
          </Flex>
          <p className="text-gray-600">{event.description}</p>

          <Flex direction="row" items="center" gap={4} className="text-gray-500 mt-4">
            <Flex direction="row" items="center" className='max-w-fit' gap={2}>
              <Schedule />
              <span className='text-nowrap'>{event.startTime} - {event.endTime}</span>
            </Flex>
            <Flex direction="row" items="center" gap={2}>
              <LocationOn />
              <span>{event.location}</span>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default EventCard;