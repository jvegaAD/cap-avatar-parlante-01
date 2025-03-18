import React, { useState, useEffect } from 'react';
import VideoAvatar from '../components/VideoAvatar';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import useSpeechSynthesis from '@/lib/useSpeechSynthesis';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Set initial state to true
  const [isMuted, setIsMuted] = useState(false);

  const speechTexts = [
    "La Carpeta de Producción CAP no es solo un documento, es nuestra herramienta de éxito. Nos permite trabajar con orden, precisión y seguridad, reduciendo pérdidas, optimizando procesos y garantizando excelencia. Pero para que funcione, debemos evaluarnos constantemente.",
    "Aquí entra nuestra lista de chequeo. No es solo un control, es un espejo de nuestras fortalezas y áreas de mejora. Es el vehículo que nos hará avanzar con firmeza, asegurando que cada cuadrilla siga los estándares, mantenga la calidad y mejore continuamente.",
    "Te invitamos a participar y colaborar en la mejora continua de nuestra empresa."
  ];

  const { speak, pause, cancel, isSpeaking, voiceSupported } = useSpeechSynthesis({
    text: speechTexts.join(' '),
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    onEnd: () => {
      setIsPlaying(false);
    }
  });

  // Remove the firstRender ref since we want it to autoplay
  
  useEffect(() => {
    // Start playing immediately when the component mounts
    if (isPlaying && !isMuted) {
      // Small timeout to ensure everything is loaded properly
      const timer = setTimeout(() => {
        cancel();
        speak();
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      pause();
    }
  }, [isPlaying, isMuted, speak, pause, cancel]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    cancel();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Correct video path with proper URL format
  const videoAvatarPath = "/lovable-uploads/Avatar%202-%20mujer.mp4";

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
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-8 w-full max-w-xl mx-auto animate-appear">
            <VideoAvatar 
              videoSrc={videoAvatarPath}
              isSpeaking={isPlaying && !isMuted}
              className="border-4 border-white shadow-2xl h-[500px]"
            />
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
