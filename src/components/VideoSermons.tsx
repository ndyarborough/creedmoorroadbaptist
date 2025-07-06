import { useEffect, useState } from 'react';
import Heading from '../shared/semantic/Heading';
import Flex from '../shared/semantic/Flex';
import Text from '../shared/semantic/Text';
import Card from '../shared/semantic/Card';
import Grid from '../shared/semantic/Grid';
import Button from '../shared/semantic/Button';

// Get YouTube API key and Channel ID from environment variables
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
  error?: {
    message: string;
  };
}

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
  };
  contentDetails: {
    duration: string;
  };
}

interface YouTubeVideoResponse {
  items: YouTubeVideo[];
  error?: {
    message: string;
  };
}

const VideoSermons = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if API key and Channel ID are available
        if (!YOUTUBE_API_KEY) {
          throw new Error('YouTube API key not configured. Please add VITE_YOUTUBE_API_KEY to your .env file.');
        }
        
        if (!CHANNEL_ID) {
          throw new Error('YouTube Channel ID not configured. Please add VITE_YOUTUBE_CHANNEL_ID to your .env file.');
        }

        // Fetch recent videos
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12&type=video`
        );
        
        if (!searchResponse.ok) {
          throw new Error(`YouTube API error (${searchResponse.status})`);
        }

        const searchData: YouTubeSearchResponse = await searchResponse.json();

        if (searchData.error) {
          throw new Error(searchData.error.message || 'YouTube API error');
        }

        // Get video IDs
        const videoIds = searchData.items
          .filter((item: YouTubeSearchItem) => item.id && item.id.videoId)
          .map((item: YouTubeSearchItem) => item.id.videoId)
          .join(',');

        if (!videoIds) {
          setVideos([]);
          return;
        }

        // Fetch video details
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,statistics,contentDetails`
        );

        if (!detailsResponse.ok) {
          throw new Error(`YouTube API error (${detailsResponse.status})`);
        }

        const detailsData: YouTubeVideoResponse = await detailsResponse.json();

        if (detailsData.error) {
          throw new Error(detailsData.error.message || 'YouTube API error');
        }

        setVideos(detailsData.items || []);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        setError(error instanceof Error ? error.message : 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Helper to format ISO 8601 duration
  const formatDuration = (isoDuration: string): string => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) {
      return '0:00';
    }

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  // Helper to format view count
  const formatViewCount = (viewCount: string): string => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Helper to format published date
  const formatPublishedDate = (publishedAt: string): string => {
    const date = new Date(publishedAt);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper to truncate description
  const truncateDescription = (description: string, maxLength: number = 150): string => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <Flex direction="col" items="center" justify="center" className="min-h-[400px]">
        <Text variant="body" className="text-text-muted">Loading sermons...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex direction="col" items="center" justify="center" className="min-h-[400px]">
        <Text variant="body" className="text-red-600 mb-4">{error}</Text>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </Flex>
    );
  }

  if (videos.length === 0) {
    return (
      <Flex direction="col" items="center" justify="center" className="min-h-[400px]">
        <Text variant="body" className="text-text-muted">No sermons found.</Text>
      </Flex>
    );
  }

  const latestVideo = videos[0];
  const recentVideos = videos.slice(1, 7); // Show 6 recent videos

  return (
    <Flex direction="col" items="center">
      <Flex direction="col" items="center" className="lg:max-w-6xl mx-auto space-y-8 py-8">
        <Heading variant="section">Latest Message</Heading>
        <Flex direction="col" className="px-4 md:px-12 lg:px-32">
          <Card className="px-0 py-0">
            <a
              href={`https://www.youtube.com/watch?v=${latestVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img 
                src={latestVideo.snippet?.thumbnails?.high?.url || '/video_sermons.png'} 
                alt={latestVideo.snippet?.title || 'Latest sermon'}
                className="mb-0 w-full h-auto object-cover" 
              />
            </a>
            <Flex direction="col" className="space-y-4 p-4">
              <Heading variant="section">{latestVideo.snippet?.title || 'Untitled Sermon'}</Heading>
              <Text variant="body" className="text-text-muted">
                {truncateDescription(latestVideo.snippet?.description || 'No description available.')}
              </Text>
              <Flex direction="row" justify="between" className="py-2">
                <Text variant="body" className="text-text-muted">
                  {latestVideo.snippet?.publishedAt ? formatPublishedDate(latestVideo.snippet.publishedAt) : 'Unknown date'}
                </Text>
                <Text variant="body" className="text-text-muted">
                  {latestVideo.contentDetails?.duration ? formatDuration(latestVideo.contentDetails.duration) : '0 minutes'}
                </Text>
                <Text variant="body" className="text-text-muted">
                  {latestVideo.statistics?.viewCount ? formatViewCount(latestVideo.statistics.viewCount) : '0'} views
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>

      {/* Recent Messages */}
      <Heading variant="section">Recent Messages</Heading>
      <Flex direction="col" items="center" className="px-4 md:px-12 lg:px-32 space-y-8 py-8">
        <Grid gap={8} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {recentVideos.map(video => (
            <Card key={video.id} className="px-0 py-0">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src={video.snippet?.thumbnails?.high?.url || '/video_sermons.png'} 
                  alt={video.snippet?.title || 'Sermon thumbnail'}
                  className="mb-0 w-full h-auto object-cover" 
                />
              </a>
              <Flex direction="col" className="space-y-4 p-4">
                <Heading variant="section">{video.snippet?.title || 'Untitled Sermon'}</Heading>
                <Text variant="body" className="text-text-muted">
                  {truncateDescription(video.snippet?.description || 'No description available.', 100)}
                </Text>
                <Flex direction="row" justify="between" className="py-2">
                  <Text variant="body" className="text-text-muted">
                    {video.snippet?.publishedAt ? formatPublishedDate(video.snippet.publishedAt) : 'Unknown date'}
                  </Text>
                  <Text variant="body" className="text-text-muted">
                    {video.contentDetails?.duration ? formatDuration(video.contentDetails.duration) : '0 min'}
                  </Text>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Grid>
        <Button 
          className="w-fit"
          onClick={() => window.open(`https://www.youtube.com/channel/${CHANNEL_ID}/videos`, '_blank')}
        >
          Load More Videos
        </Button>
      </Flex>
    </Flex>
  );
};

export default VideoSermons;