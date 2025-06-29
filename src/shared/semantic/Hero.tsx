import React from 'react';
import Heading from './Heading';
import Text from './Text';
import Flex from './Flex';

// =================================================================================================
// Hero Component
// =================================================================================================

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  banner?: React.ReactNode;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageUrl, banner, children }) => (
  <div className="relative">
    <div
      className="w-full bg-cover bg-center text-white"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      <div className="relative bg-black/50 flex flex-col justify-center text-center w-full h-80 md:h-96">
        <Flex direction='col' gap={4} className='px-8 text-left'>
          <Heading variant='page'>{title}</Heading>
          <Text variant='page-subheader'>{subtitle}</Text>
          {children && (
            <div className="mt-8 flex justify-center items-center gap-4">
              {children}
            </div>
          )}
        </Flex>
      </div>
    </div>
    {banner && (
      <div className="w-full absolute bottom-0 left-0 right-0 translate-y-1/2">
          {banner}
      </div>
    )}
  </div>
);

export default Hero;
