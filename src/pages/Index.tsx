
import React, { useState, useEffect, useRef } from 'react';
import VideoAvatar from '../components/VideoAvatar';
import { Button } from '@/components/ui/button';
import { Rewind, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(true); 
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle initial playback
  useEffect(() => {
    // Initial setup only needed for video
    console.log("Initial video setup with isPlaying:", isPlaying, "isMuted:", isMuted);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    // Reset everything
    setIsPlaying(false);
    
    // Start over after a short delay
    setTimeout(() => {
      setIsPlaying(true);
      toast({
        title: "Video reiniciado",
        description: "El video se ha reiniciado correctamente",
      });
    }, 100);
  };

  const handleRewind = () => {
    // Rebobinar 5 segundos
    if (videoRef.current) {
      const videoElement = videoRef.current.querySelector('video');
      if (videoElement) {
        // Retroceder 5 segundos
        videoElement.currentTime = Math.max(0, videoElement.currentTime - 5);
        toast({
          description: "Retrocediendo 5 segundos",
          duration: 1500,
        });
      }
    }
  };

  const handleVideoEnded = () => {
    // Cuando el video termina, detenemos la reproducción
    setIsPlaying(false);
    console.log("Video ha terminado de reproducirse");
    toast({
      title: "Video completado",
      description: "El video ha terminado de reproducirse",
    });
  };

  const toggleMute = () => {
    // Only toggle mute state
    setIsMuted(!isMuted);
    toast({
      description: isMuted ? "Sonido activado" : "Sonido desactivado",
      duration: 1500,
    });
  };

  // Corregido: Nombre exacto del archivo como está en la carpeta pública
  const videoAvatarPath = "Avatar 5 - mujer.mp4";
  
  // Imagen de respaldo de alta calidad
  const fallbackImagePath = "64ba5ffc-989d-4cd1-800b-8eee0090e2ce.png";

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
          
          {/* Navegación - Removed requirements.txt link */}
          <div className="mb-4 flex justify-center">
            <Link to="/segundo-video" className="text-primary hover:underline">
              Ver segundo video →
            </Link>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div ref={videoRef} className="mb-8 w-full max-w-xl mx-auto animate-appear">
            <VideoAvatar 
              videoSrc={videoAvatarPath}
              fallbackImageSrc={fallbackImagePath}
              isSpeaking={isPlaying}
              isMuted={isMuted}
              onEnded={handleVideoEnded}
              className="border-4 border-white shadow-2xl h-[500px]"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
              onClick={handleRewind}
              title="Retroceder 5 segundos"
            >
              <Rewind className="h-5 w-5" />
            </Button>
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
