
import { useState, useEffect, useCallback } from 'react';

interface UseTypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const useTypingEffect = ({
  text,
  speed = 40,
  delay = 0,
  onComplete
}: UseTypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setDisplayedText('');
    setIsComplete(false);
  }, []);

  const resetTyping = useCallback(() => {
    setIsTyping(false);
    setDisplayedText('');
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    let timer: NodeJS.Timeout;

    // Initial delay
    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(timer);
          setIsComplete(true);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, isTyping, speed, delay, onComplete]);

  return {
    displayedText,
    isTyping,
    isComplete,
    startTyping,
    resetTyping
  };
};

export default useTypingEffect;
