
import React from 'react';
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string;
  className?: string;
  isActive: boolean;
  speed?: number;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ 
  text, 
  className,
  isActive,
  speed = 40 
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);
  
  React.useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }
    
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, isActive, speed]);
  
  return (
    <span className={cn(
      "inline relative",
      isComplete ? "" : "after:content-['|'] after:ml-1 after:animate-pulse-subtle",
      className
    )}>
      {displayedText}
    </span>
  );
};

export default TextAnimation;
