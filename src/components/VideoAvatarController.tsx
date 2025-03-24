
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rewind, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface VideoAvatarControllerProps {
  videoRef: React.RefObject<HTMLDivElement & { rewindVideo?: () => boolean }>;
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onRewind: () => void;
  onToggleMute: () => void;
}

const VideoAvatarController: React.FC<VideoAvatarControllerProps> = ({
  videoRef,
  isPlaying,
  isMuted,
  onPlayPause,
  onReset,
  onRewind,
  onToggleMute
}) => {
  return (
    <div className="flex items-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-12 w-12 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
        onClick={onRewind}
        title="Retroceder 5 segundos"
      >
        <Rewind className="h-5 w-5" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-12 w-12 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
        onClick={onReset}
      >
        <RotateCcw className="h-5 w-5" />
      </Button>
      <Button 
        size="icon" 
        className="rounded-full h-16 w-16 shadow-md hover:shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6 ml-1" />
        )}
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full h-12 w-12 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
        onClick={onToggleMute}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default VideoAvatarController;
