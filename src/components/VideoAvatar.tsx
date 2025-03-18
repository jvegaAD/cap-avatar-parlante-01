
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
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoaded = () => {
        console.log("Video loaded successfully");
        setIsLoaded(true);
        setLoadError(false);
      };
      
      const handleError = (e: any) => {
        console.error("Error loading video:", e, "Video source:", videoSrc);
        setLoadError(true);
        setIsLoaded(false);
      };
      
      video.addEventListener('loadeddata', handleLoaded);
      video.addEventListener('error', handleError);

      // Clear any previous source and errors
      video.pause();
      
      // Try multiple source formats to improve compatibility
      try {
        // Try original path first
        const sourcePath = videoSrc.startsWith('/') ? videoSrc : `/${videoSrc}`;
        
        // Remove any query parameters or fragments that might cause issues
        const cleanPath = sourcePath.split('?')[0].split('#')[0];
        
        video.src = cleanPath;
        video.load();
        
        // Add a timeout to detect if video doesn't load
        const timeoutId = setTimeout(() => {
          if (!isLoaded && !loadError) {
            console.warn("Video load timed out, setting error state");
            setLoadError(true);
          }
        }, 5000);
        
        return () => {
          clearTimeout(timeoutId);
          video.removeEventListener('loadeddata', handleLoaded);
          video.removeEventListener('error', handleError);
        };
      } catch (err) {
        console.error("Critical error during video setup:", err);
        setLoadError(true);
        return () => {
          video.removeEventListener('loadeddata', handleLoaded);
          video.removeEventListener('error', handleError);
        };
      }
    }
  }, [videoSrc, isLoaded]);

  // Handle video playback based on speaking state
  useEffect(() => {
    if (!videoRef.current || (!isLoaded && !loadError)) return;
    
    const video = videoRef.current;
    
    // Don't attempt playback if there was a load error
    if (loadError) return;
    
    // Apply mute state separately from playback
    video.muted = isMuted;
    
    if (isSpeaking) {
      console.log("Playing video");
      // Keep the video's original audio, respecting mute state
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing video:", error);
          setLoadError(true);
        });
      }
    } else {
      console.log("Pausing video");
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isSpeaking, isLoaded, isMuted, loadError]);

  return (
    <div className="video-avatar-container relative">
      {loadError && fallbackImageSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-3xl overflow-hidden">
          <img 
            src={fallbackImageSrc} 
            alt="Avatar fallback" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 text-sm text-center w-full bg-black/50 text-white py-1">
            Video could not be loaded
          </div>
        </div>
      )}
      
      {loadError && !fallbackImageSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-3xl">
          <p className="text-gray-500">Error loading video</p>
        </div>
      )}
      
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
