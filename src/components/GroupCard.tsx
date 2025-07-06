import React from 'react';
import { Schedule, LocationOn } from '@mui/icons-material';
import Heading from '../shared/semantic/Heading';
import Flex from '../shared/semantic/Flex';
import Tag from '../shared/semantic/Tag';

interface Group {
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

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
      <Flex direction='row' justify='center' items='center' gap={4}>
        {group.photoURLs && group.photoURLs.length > 0 && (
          <div className="mt-4">
            <Flex direction="row" gap={4}>
              {group.photoURLs.map(url => (
                <img key={url} src={url} alt={group.title} className="object-cover rounded-lg" />
              ))}
            </Flex>
          </div>  
        )}
        <Flex direction="col" gap={2}>
          {/* Date above the header */}
          <span className="text-sm text-gray-500 font-medium">
            {formatDate(group.date)}
          </span>
          
          <Flex direction="row" justify="between" items="center">
            <Heading as="h3" variant="section-subheader">{group.title}</Heading>
            <Flex direction="row" gap={2} items="center">
              <Tag className='bg-green-100 text-green-800'>{group.category}</Tag>
              {group.recurring && (
                <Tag className='bg-blue-100 text-blue-800'>Recurring</Tag>
              )}
            </Flex>
          </Flex>
          <p className="text-gray-600">{group.description}</p>

          <Flex direction="row" items="center" gap={4} className="text-gray-500 mt-4">
            <Flex direction="row" items="center" gap={2}>
              <Schedule />
              <span>{group.startTime} - {group.endTime}</span>
            </Flex>
            <Flex direction="row" items="center" gap={2}>
              <LocationOn />
              <span>{group.location}</span>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default GroupCard;