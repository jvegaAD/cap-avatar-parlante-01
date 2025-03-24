
import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { useVideoControl } from '@/hooks/useVideoControl';
import VideoCore from './VideoCore';
import VideoFallbackImage from './VideoFallbackImage';
import VideoAudioIndicator from './VideoAudioIndicator';
import { cn } from '@/lib/utils';

interface VideoAvatarProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  isSpeaking: boolean;
  isMuted: boolean;
  className?: string;
  onEnded?: () => void;
  onLoaded?: () => void;
  onError?: () => void;
  rewindSeconds?: number;
}

// Using forwardRef to expose methods to parent components
const VideoAvatar = forwardRef<HTMLDivElement, VideoAvatarProps>(({ 
  videoSrc, 
  fallbackImageSrc,
  isSpeaking,
  isMuted,
  className,
  onEnded,
  onLoaded,
  onError,
  rewindSeconds = 5
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const {
    isLoaded,
    loadError,
    handleVideoLoaded,
    handleVideoError,
    handleVideoEnded,
    rewindVideo
  } = useVideoControl({
    rewindSeconds,
    onEnded,
    onLoaded,
    onError
  });

  // Expose the rewindVideo method to parent components
  useImperativeHandle(ref, () => {
    const div = containerRef.current as HTMLDivElement;
    
    // Add rewindVideo method to the ref
    return Object.assign(div || {}, {
      rewindVideo
    });
  }, [rewindVideo]);
  
  // Prepare path for the fallback image
  const fallbackImgPath = fallbackImageSrc ? `/lovable-uploads/${fallbackImageSrc}` : null;
  
  return (
    <div ref={containerRef} className="video-avatar-container relative">
      {/* Fallback image component */}
      <VideoFallbackImage 
        imagePath={fallbackImgPath}
        isError={loadError}
        isLoaded={isLoaded}
      />
      
      {/* Video core component */}
      <VideoCore
        videoSrc={videoSrc}
        isSpeaking={isSpeaking}
        isMuted={isMuted}
        isLoaded={isLoaded}
        loadError={loadError}
        onLoaded={handleVideoLoaded}
        onError={handleVideoError}
        onEnded={handleVideoEnded}
        className={className}
      />
      
      {/* Audio visualization component */}
      <VideoAudioIndicator 
        isSpeaking={isSpeaking} 
        isError={loadError}
      />
    </div>
  );
});

VideoAvatar.displayName = 'VideoAvatar';

export default VideoAvatar;
