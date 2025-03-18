
import React, { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import VideoAvatar from '../components/VideoAvatar';
import SpeechBubble from '../components/SpeechBubble';
import TextAnimation from '../components/TextAnimation';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import useSpeechSynthesis from '@/lib/useSpeechSynthesis';

const Index = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTextIndex, setActiveTextIndex] = useState<number | null>(null);
  const [useVideoAvatar, setUseVideoAvatar] = useState(true);

  const speechTexts = [
    "La Carpeta de Producción CAP no es solo un documento, es nuestra herramienta de éxito. Nos permite trabajar con orden, precisión y seguridad, reduciendo pérdidas, optimizando procesos y garantizando excelencia. Pero para que funcione, debemos evaluarnos constantemente.",
    "Aquí entra nuestra lista de chequeo. No es solo un control, es un espejo de nuestras fortalezas y áreas de mejora. Es el vehículo que nos hará avanzar con firmeza, asegurando que cada cuadrilla siga los estándares, mantenga la calidad y mejore continuamente.",
    "Te invitamos a participar y colaborar en la mejora continua de nuestra empresa."
  ];

  const { speak, pause, cancel, isSpeaking, voiceSupported } = useSpeechSynthesis({
    text: speechTexts[currentTextIndex],
    onEnd: () => {
      // Move to next text or restart
      if (currentTextIndex < speechTexts.length - 1) {
        setCurrentTextIndex(prevIndex => prevIndex + 1);
      } else {
        setIsPlaying(false);
        setActiveTextIndex(null);
      }
    }
  });

  useEffect(() => {
    if (isPlaying && !isMuted) {
      cancel();
      speak();
      setActiveTextIndex(currentTextIndex);
    } else {
      pause();
    }
  }, [currentTextIndex, isPlaying, isMuted, speak, pause, cancel]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setActiveTextIndex(null);
    } else {
      setIsPlaying(true);
      // If we completed all texts, start from beginning
      if (currentTextIndex >= speechTexts.length - 1 && !isSpeaking) {
        setCurrentTextIndex(0);
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTextIndex(0);
    setActiveTextIndex(null);
    cancel();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleAvatarType = () => {
    setUseVideoAvatar(!useVideoAvatar);
  };

  // Correct path to the video avatar file
  const videoAvatarPath = "/lovable-uploads/Avatar-2-mujer.mp4";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-2 px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide">
            Carpeta de Producción CAP
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3 tracking-tight">
            Herramienta para el Éxito
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre la importancia de nuestra carpeta de producción y cómo nos ayuda a mejorar constantemente.
          </p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-8 w-64 h-64 md:w-80 md:h-80 animate-appear">
            {useVideoAvatar ? (
              <VideoAvatar 
                videoSrc={videoAvatarPath}
                isSpeaking={isPlaying && !isMuted && isSpeaking}
                className="border-4 border-white shadow-2xl"
              />
            ) : (
              <Avatar 
                imageSrc="/lovable-uploads/2b580597-86e4-4fdc-bef3-07775ae52a13.png"
                alt="Avatar Profesional"
                isSpeaking={isPlaying && !isMuted && isSpeaking}
                className="border-4 border-white shadow-2xl"
              />
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
              onClick={handleReset}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              className="rounded-full h-16 w-16 shadow-md hover:shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Toggle Avatar Type Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAvatarType}
            className="mb-6 bg-white/80 backdrop-blur-sm"
          >
            {useVideoAvatar ? "Usar Avatar Estático" : "Usar Avatar Video"}
          </Button>

          {/* Speech Bubbles */}
          <div className="space-y-6 w-full animate-fade-in" style={{ animationDelay: '600ms' }}>
            {speechTexts.map((text, index) => (
              <SpeechBubble
                key={index}
                text={activeTextIndex === index ? (
                  <TextAnimation 
                    text={text} 
                    isActive={activeTextIndex === index}
                    speed={30}
                  />
                ) : text}
                isVisible={index <= currentTextIndex}
                currentTextIndex={currentTextIndex}
                className={index === currentTextIndex ? "ring-2 ring-primary/20" : ""}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-10 animate-fade-in" style={{ animationDelay: '900ms' }}>
          <p>© {new Date().getFullYear()} Carpeta de Producción CAP. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
