// /src/components/AudioSermons.tsx
import type { FC } from "react";
import { useState, useRef } from "react";
import Heading from "../shared/semantic/Heading";
import Flex from "../shared/semantic/Flex";
import Text from "../shared/semantic/Text";
import Card from "../shared/semantic/Card";
import IconContainer from "../shared/semantic/IconContainer";
import PlayArrow from '@mui/icons-material/PlayArrow';
import AudioPlayer from "../shared/semantic/AudioPlayer";
import Button from "../shared/semantic/Button";

interface SermonData {
    id: string;
    title: string;
    author: string;
    date: string;
    audioSrc: string;
    duration: string;
}

const AudioSermons: FC = () => {
    const [selectedSermonId, setSelectedSermonId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const activeAudioRef = useRef<HTMLAudioElement | null>(null);

    // Sample sermon data - replace with your actual data
    const sermons: SermonData[] = [
        {
            id: '1',
            title: 'Walking in Faith: Trusting God\'s Plan',
            author: 'Pastor Danny',
            date: 'December 1, 2024',
            audioSrc: '/sermon_audio_2-2-2025.m4a',
            duration: '45:23'
        },
        {
            id: '2',
            title: 'The Power of Prayer',
            author: 'Pastor Sarah',
            date: 'November 24, 2024',
            audioSrc: '/path/to/audio2.mp3',
            duration: '38:15'
        },
        {
            id: '3',
            title: 'Grace and Mercy',
            author: 'Pastor John',
            date: 'November 17, 2024',
            audioSrc: '/path/to/audio3.mp3',
            duration: '42:30'
        }
    ];

    const handleCardClick = (sermonId: string) => {
        // If clicking the same card that's already selected
        if (selectedSermonId === sermonId) {
            // Toggle play/pause
            if (isPlaying) {
                activeAudioRef.current?.pause();
                setIsPlaying(false);
            } else {
                activeAudioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            // Stop any currently playing audio
            if (activeAudioRef.current) {
                activeAudioRef.current.pause();
                activeAudioRef.current.currentTime = 0;
            }
            
            // Select new sermon
            setSelectedSermonId(sermonId);
            setIsPlaying(false);
        }
    };

    const handleAudioRef = (audioElement: HTMLAudioElement | null) => {
        activeAudioRef.current = audioElement;
    };

    const handlePlayStateChange = (playing: boolean) => {
        setIsPlaying(playing);
    };

    return (
        <Flex direction="col" items="center">
            <Flex direction="col" items="center" className="max-w-6xl mx-auto space-y-8 py-8">
                <Heading variant="section">Latest Messages</Heading>
                <Flex direction="col" className="px-32 w-full space-y-4">
                    {sermons.map((sermon) => (
                        <Card key={sermon.id}>
                            <div onClick={() => handleCardClick(sermon.id)} className="cursor-pointer">
                                <Flex direction="row" justify="between">
                                    <Flex direction="row" gap={4}>
                                        <IconContainer variant="primary-dark">
                                            <PlayArrow className="text-bg-primary" />
                                        </IconContainer>
                                        <Flex direction="col">
                                            <Heading variant="section-subheader">{sermon.title}</Heading>
                                            <Text variant="body" className="text-text-muted">
                                                {sermon.author} • {sermon.date}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Text variant="body" className="text-text-muted">{sermon.duration}</Text>
                                </Flex>
                            </div>
                            
                            {/* Only show AudioPlayer for selected sermon */}
                            {selectedSermonId === sermon.id && (
                                <AudioPlayer
                                    audioSrc={sermon.audioSrc}
                                    title={sermon.title}
                                    author={sermon.author}
                                    date={sermon.date}
                                    onAudioRef={handleAudioRef}
                                    onPlayStateChange={handlePlayStateChange}
                                    isPlaying={isPlaying}
                                />
                            )}
                        </Card>
                    ))}
                </Flex>
                <Button>Load More Audio</Button>
            </Flex>
        </Flex>
    );
};

export default AudioSermons;