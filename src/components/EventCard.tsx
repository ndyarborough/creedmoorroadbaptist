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
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-2 lg:p-4 border-l-4 border-blue-500">
      <Flex direction='col' justify='center' items='center' className='md:flex-row' gap={4}>
        <img key={event.photoURLs[0]} src={event.photoURLs[0]} alt={event.title} className="h-full rounded-lg" />
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