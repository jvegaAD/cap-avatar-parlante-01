
import React, { useState, useEffect, useRef } from 'react';
import VideoAvatar from '../components/VideoAvatar';
import VideoAvatarController from '../components/VideoAvatarController';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const SecondVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true); 
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle initial playback
  useEffect(() => {
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

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setHasLoadError(false);
  };

  const handleVideoError = () => {
    setHasLoadError(true);
    setIsPlaying(false);
    toast({
      title: "Error de video",
      description: "No se pudo cargar el video. Usando imagen de respaldo.",
      variant: "destructive"
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

  // Corregido el nombre del archivo tal cual como está en la carpeta pública
  const videoAvatarPath = "Avatar 2- mujer.mp4";
  
  // Imagen de respaldo de alta calidad
  const fallbackImagePath = "64ba5ffc-989d-4cd1-800b-8eee0090e2ce.png";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-2 px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide">
            Video Secundario
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3 tracking-tight">
            Segunda Presentación
          </h1>
          
          {/* Navegación */}
          <div className="mb-4">
            <Link to="/" className="text-primary hover:underline flex items-center justify-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Volver al primer video
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
              onLoaded={handleVideoLoaded}
              onError={handleVideoError}
              className="border-4 border-white shadow-2xl h-[500px]"
            />
          </div>

          {/* Controls */}
          <VideoAvatarController
            videoRef={videoRef}
            isPlaying={isPlaying}
            isMuted={isMuted}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            onRewind={handleRewind}
            onToggleMute={toggleMute}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-10 animate-fade-in" style={{ animationDelay: '900ms' }}>
          <p>© {new Date().getFullYear()} Carpeta de Producción CAP. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};

export default SecondVideo;
