
import React from 'react';
import { cn } from '@/lib/utils';

interface VideoAudioIndicatorProps {
  isSpeaking: boolean;
  isError: boolean;
}

const VideoAudioIndicator: React.FC<VideoAudioIndicatorProps> = ({ 
  isSpeaking,
  isError
}) => {
  return (
    <div className={cn(
      "absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-4",
      "transform-gpu transition-all duration-500",
      isSpeaking && !isError ? "opacity-100 scale-100" : "opacity-0 scale-90"
    )}>
      <div className="flex items-end justify-center gap-[4px] h-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            style={{
              height: `${Math.max(30, Math.random() * 100)}%`,
              animationDuration: `${0.6 + Math.random() * 0.4}s`,
              animationDelay: `${Math.random() * 0.2}s`
            }}
            className={cn(
              "w-[4px] bg-primary rounded-full animate-pulse-subtle",
              isSpeaking ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoAudioIndicator;
