
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechSynthesisOptions {
  text: string;
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

const useSpeechSynthesis = ({
  text,
  voice = null,
  rate = 1,
  pitch = 1,
  volume = 1,
  lang = 'es-ES',
  onStart,
  onEnd,
  onError
}: UseSpeechSynthesisOptions) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceSupported, setVoiceSupported] = useState(true);
  
  // Use refs to prevent dependency updates causing re-renders in useEffect
  const onStartRef = useRef(onStart);
  const onEndRef = useRef(onEnd);
  const onErrorRef = useRef(onError);
  
  // Update refs when callbacks change
  useEffect(() => {
    onStartRef.current = onStart;
    onEndRef.current = onEnd;
    onErrorRef.current = onError;
  }, [onStart, onEnd, onError]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Initial voices load
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();

      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    } else {
      setVoiceSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!voiceSupported) return;

    const speechUtterance = new SpeechSynthesisUtterance(text);
    
    // Set utterance properties
    speechUtterance.rate = rate;
    speechUtterance.pitch = pitch;
    speechUtterance.volume = volume;
    speechUtterance.lang = lang;

    // Use provided voice or find a suitable one
    if (voice) {
      speechUtterance.voice = voice;
    } else if (voices.length > 0) {
      // Try to find a Spanish voice
      const spanishVoice = voices.find(v => v.lang.includes('es'));
      if (spanishVoice) {
        speechUtterance.voice = spanishVoice;
      }
    }

    // Event handlers
    speechUtterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      if (onStartRef.current) onStartRef.current();
    };

    speechUtterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (onEndRef.current) onEndRef.current();
    };

    speechUtterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
      if (onErrorRef.current) onErrorRef.current(event);
    };

    setUtterance(speechUtterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, voice, rate, pitch, volume, lang, voices, voiceSupported]);

  const speak = useCallback(() => {
    if (!voiceSupported || !utterance) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    console.log("Starting speech synthesis:", {
      text: utterance.text,
      rate: utterance.rate,
      pitch: utterance.pitch,
      volume: utterance.volume,
      lang: utterance.lang,
      voice: utterance.voice?.name
    });

    // Start speaking
    window.speechSynthesis.speak(utterance);
  }, [utterance, voiceSupported]);

  const pause = useCallback(() => {
    if (!voiceSupported) return;

    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [voiceSupported]);

  const resume = useCallback(() => {
    if (!voiceSupported) return;

    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [voiceSupported]);

  const cancel = useCallback(() => {
    if (!voiceSupported) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [voiceSupported]);

  return {
    speak,
    pause,
    resume,
    cancel,
    isSpeaking,
    isPaused,
    voiceSupported,
    voices
  };
};

export default useSpeechSynthesis;
