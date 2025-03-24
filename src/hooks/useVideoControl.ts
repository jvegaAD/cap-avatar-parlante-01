
import { useState, useRef, useCallback } from 'react';

interface UseVideoControlOptions {
  rewindSeconds?: number;
  onEnded?: () => void;
  onLoaded?: () => void;
  onError?: () => void;
}

export const useVideoControl = ({
  rewindSeconds = 5,
  onEnded,
  onLoaded,
  onError
}: UseVideoControlOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoLoaded = useCallback(() => {
    setIsLoaded(true);
    setLoadError(false);
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  const handleVideoError = useCallback(() => {
    setLoadError(true);
    if (onError) onError();
  }, [onError]);

  const handleVideoEnded = useCallback(() => {
    if (onEnded) onEnded();
  }, [onEnded]);

  const rewindVideo = useCallback(() => {
    if (videoElementRef.current && isLoaded) {
      const video = videoElementRef.current;
      const newTime = Math.max(0, video.currentTime - rewindSeconds);
      video.currentTime = newTime;
      return true;
    }
    return false;
  }, [isLoaded, rewindSeconds]);

  const setVideoRef = useCallback((element: HTMLVideoElement | null) => {
    videoElementRef.current = element;
  }, []);

  return {
    isLoaded,
    loadError,
    videoElementRef,
    setVideoRef,
    handleVideoLoaded,
    handleVideoError,
    handleVideoEnded,
    rewindVideo
  };
};
