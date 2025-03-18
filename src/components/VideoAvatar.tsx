
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoAvatarProps {
  videoSrc: string;
  isSpeaking: boolean;
  className?: string;
}

const VideoAvatar: React.FC<VideoAvatarProps> = ({ 
  videoSrc, 
  isSpeaking, 
  className 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isSpeaking) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    } else {
      // When not speaking, pause at the first frame
      videoRef.current.pause();
      // Try to set time to beginning of the video
      try {
        videoRef.current.currentTime = 0;
      } catch (e) {
        console.error("Could not set video time:", e);
      }
    }
  }, [isSpeaking]);

  return (
    <div className="video-avatar-container relative">
      <div 
        className={cn(
          "relative overflow-hidden rounded-3xl", // Changed from rounded-full to rounded-3xl
          "transition-all duration-700 ease-out",
          "shadow-xl aspect-video", // Changed to aspect-video
          !isLoaded && "animate-pulse bg-gray-200",
          className
        )}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transform: `scale(${isLoaded ? 1 : 0.9})`,
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <video 
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
        />
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0",
            "transition-opacity duration-300",
            isSpeaking && "opacity-30"
          )}
        />
      </div>
      <div className={cn(
        "absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-4",
        "transform-gpu transition-all duration-500",
        isSpeaking ? "opacity-100 scale-100" : "opacity-0 scale-90"
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
    </div>
  );
};

export default VideoAvatar;
