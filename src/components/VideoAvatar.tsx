
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoAvatarProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  isSpeaking: boolean;
  isMuted: boolean;
  className?: string;
}

const VideoAvatar: React.FC<VideoAvatarProps> = ({ 
  videoSrc, 
  fallbackImageSrc,
  isSpeaking,
  isMuted,
  className 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Handle video loading
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    const handleLoaded = () => {
      console.log("Video loaded successfully");
      setIsLoaded(true);
      setLoadError(false);
    };
    
    const handleError = (e: any) => {
      console.error("Error loading video:", e);
      setLoadError(true);
      setIsLoaded(false);
    };
    
    // Clean up previous event listeners
    video.removeEventListener('loadeddata', handleLoaded);
    video.removeEventListener('error', handleError);
    
    // Add new event listeners
    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('error', handleError);
    
    // Reset video state
    video.pause();
    
    // Set source - use direct path
    try {
      video.src = videoSrc;
      video.load();
      
      // Set a timeout for loading
      const timeoutId = setTimeout(() => {
        if (!video.readyState) {
          console.log("Video loading timed out");
          setLoadError(true);
        }
      }, 3000);
      
      return () => {
        clearTimeout(timeoutId);
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('error', handleError);
      };
    } catch (err) {
      console.error("Error setting up video:", err);
      setLoadError(true);
      return () => {
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc]);
  
  // Handle playback and mute state
  useEffect(() => {
    if (!videoRef.current || loadError) return;
    
    const video = videoRef.current;
    
    // Apply mute state
    video.muted = isMuted;
    
    // Handle play/pause
    if (isSpeaking && isLoaded) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing video:", error);
        });
      }
    } else if (!isSpeaking && !video.paused) {
      video.pause();
    }
  }, [isSpeaking, isLoaded, isMuted, loadError]);
  
  return (
    <div className="video-avatar-container relative">
      {/* Fallback image when video fails to load */}
      {loadError && fallbackImageSrc && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200 rounded-3xl overflow-hidden">
          <img 
            src={fallbackImageSrc} 
            alt="Avatar fallback" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-0 right-0 text-sm text-center bg-black/50 text-white py-1">
            Video could not be loaded
          </div>
        </div>
      )}
      
      {/* Video container */}
      <div 
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "transition-all duration-700 ease-out",
          "shadow-xl", 
          !isLoaded && "animate-pulse bg-gray-200",
          loadError && "opacity-0",
          className
        )}
        style={{ 
          opacity: isLoaded && !loadError ? 1 : 0,
          transform: `scale(${isLoaded && !loadError ? 1 : 0.9})`,
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <video 
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          preload="auto"
          loop={true}
        />
      </div>
      
      {/* Audio visualization bars */}
      <div className={cn(
        "absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-4",
        "transform-gpu transition-all duration-500",
        isSpeaking && !loadError ? "opacity-100 scale-100" : "opacity-0 scale-90"
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
