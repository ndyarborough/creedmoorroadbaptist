import React from 'react';
import { CalendarToday, Schedule, LocationOn } from '@mui/icons-material';
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
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500">
      <Flex direction="col" gap={2}>
        <Flex direction="row" justify="between" items="center">
          <Heading as="h3" variant="section-subheader">{event.title}</Heading>
          <Tag>{event.category}</Tag>
        </Flex>
        <p className="text-gray-600">{event.description}</p>
        {event.photoURLs && event.photoURLs.length > 0 && (
          <div className="mt-4">
            <Flex direction="row" gap={4}>
              {event.photoURLs.map(url => (
                <img key={url} src={url} alt={event.title} className="w-32 h-32 object-cover rounded-lg" />
              ))}
            </Flex>
          </div>
        )}
        <Flex direction="row" items="center" gap={4} className="text-gray-500 mt-4">
          <Flex direction="row" items="center" gap={2}>
            <CalendarToday />
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
          </Flex>
          <Flex direction="row" items="center" gap={2}>
            <Schedule />
            <span>{event.startTime} - {event.endTime}</span>
          </Flex>
          <Flex direction="row" items="center" gap={2}>
            <LocationOn />
            <span>{event.location}</span>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default EventCard;
