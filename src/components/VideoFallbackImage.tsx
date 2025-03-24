
import React from 'react';

interface VideoFallbackImageProps {
  imagePath: string | null;
  isError: boolean;
  isLoaded: boolean;
}

const VideoFallbackImage: React.FC<VideoFallbackImageProps> = ({
  imagePath,
  isError,
  isLoaded
}) => {
  // Si no hay imagen de respaldo, no mostramos nada
  if (!imagePath) {
    return null;
  }

  return (
    <div 
      className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200 rounded-3xl overflow-hidden"
      style={{ 
        opacity: (!isLoaded || isError) ? 1 : 0,
        transition: "opacity 0.6s ease-out",
        pointerEvents: isLoaded && !isError ? "none" : "auto"
      }}
    >
      <img 
        src={imagePath} 
        alt="Avatar fallback" 
        className="w-full h-full object-cover"
      />
      {isError && (
        <div className="absolute bottom-2 left-0 right-0 text-sm text-center bg-black/50 text-white py-1">
          Video no disponible - usando imagen
        </div>
      )}
    </div>
  );
};

export default VideoFallbackImage;
