
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SpeechBubbleProps {
  text: React.ReactNode;
  className?: string;
  isVisible: boolean;
  currentTextIndex: number;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ 
  text,
  className,
  isVisible,
  currentTextIndex
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current && isVisible) {
      bubbleRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [isVisible, currentTextIndex]);

  return (
    <div 
      ref={bubbleRef}
      className={cn(
        "glass-panel rounded-3xl px-6 py-5 max-w-2xl mx-auto",
        "transform-gpu transition-all duration-500 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8",
        className
      )}
    >
      <div className="text-lg md:text-xl leading-relaxed text-gray-800 font-medium">
        {text}
      </div>
    </div>
  );
};

export default SpeechBubble;
