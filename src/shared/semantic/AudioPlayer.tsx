import React, { useState, useRef, useEffect } from 'react';
import Flex from './Flex';
import Text from './Text';

const SkipPreviousIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>;
const SkipNextIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>;
const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>;


interface AudioControlsProps {
    duration: number;
    currentTime: number;
    onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    progressBarRef: React.Ref<HTMLInputElement>;
    onSkipBackward: () => void;
    onSkipForward: () => void;
    audioSrc: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({
    duration,
    currentTime,
    onProgressChange,
    progressBarRef,
    onSkipBackward,
    onSkipForward,
    audioSrc
}) => {
    const formatTime = (time: number) => {
        if (isNaN(time) || time === Infinity) {
            return '0:00';
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    const progressBarClasses = [
        'w-full h-2 rounded-lg cursor-pointer appearance-none',
        'bg-[linear-gradient(to_right,var(--color-primary-dark)_var(--progress,0%),var(--color-off-white)_var(--progress,0%))]',
        '[&::-webkit-slider-thumb]:appearance-none',
        '[&::-webkit-slider-thumb]:h-4',
        '[&::-webkit-slider-thumb]:w-4',
        '[&::-webkit-slider-thumb]:bg-primary-dark',
        '[&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:-mt-1'
    ].join(' ');

    return (
        <div className="w-full mt-4">
            <div className="space-y-2">
                <input
                    ref={progressBarRef}
                    type="range"
                    value={currentTime}
                    max={duration || 0}
                    onChange={onProgressChange}
                    className={progressBarClasses}
                    aria-label="Audio progress bar"
                />
                <Flex justify="between">
                    <Text variant="body" className="text-text-muted text-sm">{formatTime(currentTime)}</Text>
                    <Text variant="body" className="text-text-muted text-sm">{formatTime(duration)}</Text>
                </Flex>
            </div>

            <Flex justify="center" items="center" gap={4} className="mt-2">
                <button onClick={onSkipBackward} className="text-text-muted hover:text-text-primary" aria-label="Skip backward 10 seconds"><SkipPreviousIcon /></button>
                <a href={audioSrc} download className="text-text-muted hover:text-text-primary" aria-label="Download audio"><DownloadIcon /></a>
                <button onClick={onSkipForward} className="text-text-muted hover:text-text-primary" aria-label="Skip forward 10 seconds"><SkipNextIcon /></button>
            </Flex>
        </div>
    );
};

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  author: string;
  date: string;
  // New props for parent communication
  onAudioRef?: (audio: HTMLAudioElement | null) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  isPlaying?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioSrc, 
  onAudioRef,
  onPlayStateChange,
  isPlaying: parentIsPlaying
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  console.log(isPlaying)
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    }

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    
    const handleEnded = () => {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('ended', handleEnded);

    if (audio.readyState > 0) {
        setAudioData();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('ended', handleEnded);
    }
  }, [onPlayStateChange]);

  // Pass audio ref to parent
  useEffect(() => {
    if (onAudioRef && audioRef.current) {
      onAudioRef(audioRef.current);
    }
  }, [onAudioRef]);

  // Sync play state with parent
  useEffect(() => {
    if (typeof parentIsPlaying === 'boolean') {
      setIsPlaying(parentIsPlaying);
    }
  }, [parentIsPlaying]);
  
  useEffect(() => {
    if (progressBarRef.current) {
        const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
        progressBarRef.current.style.setProperty('--progress', `${progress}%`);
    }
  }, [currentTime, duration]);


  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if(audioRef.current) {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }
  };

  const handleSkip = (amount: number) => {
      if(audioRef.current) {
          audioRef.current.currentTime += amount;
      }
  }


  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="metadata"></audio>
      
      <AudioControls 
        duration={duration}
        currentTime={currentTime}
        onProgressChange={handleProgressChange}
        progressBarRef={progressBarRef}
        onSkipBackward={() => handleSkip(-10)}
        onSkipForward={() => handleSkip(10)}
        audioSrc={audioSrc}
      />
    </>
  );
};

export default AudioPlayer;