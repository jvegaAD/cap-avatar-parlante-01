
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  imageSrc: string;
  alt: string;
  isSpeaking: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  imageSrc, 
  alt, 
  isSpeaking, 
  className 
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      setLoaded(true);
    };
  }, [imageSrc]);

  return (
    <div className="avatar-container">
      <div 
        className={cn(
          "relative overflow-hidden rounded-full aspect-square",
          "transition-all duration-700 ease-out",
          "shadow-xl",
          !loaded && "animate-pulse bg-gray-200",
          isSpeaking && "animate-speak",
          className
        )}
        style={{ 
          opacity: loaded ? 1 : 0,
          transform: `scale(${loaded ? 1 : 0.9})`,
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {loaded && (
          <img 
            src={imageSrc} 
            alt={alt} 
            className={cn(
              "w-full h-full object-cover",
              "transition-transform duration-500"
            )}
          />
        )}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0",
            "transition-opacity duration-300",
            isSpeaking && "opacity-30"
          )}
        />
      </div>
      <div className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3",
        "transform-gpu transition-all duration-500",
        isSpeaking ? "opacity-100 scale-100" : "opacity-0 scale-90"
      )}>
        <div className="flex items-end justify-center gap-[3px] h-full">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="w-[3px] bg-primary rounded-full"
              style={{
                height: `${Math.max(30, Math.random() * 100)}%`,
                animationDuration: `${0.6 + Math.random() * 0.4}s`,
                animationDelay: `${Math.random() * 0.2}s`
              }}
              className={cn(
                "w-[3px] bg-primary rounded-full animate-pulse-subtle",
                isSpeaking ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Avatar;
