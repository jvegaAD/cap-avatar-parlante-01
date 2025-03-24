
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoCoreProps {
  videoSrc: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isLoaded: boolean;
  loadError: boolean;
  onLoaded: () => void;
  onError: () => void;
  onEnded: () => void;
  className?: string;
}

const VideoCore: React.FC<VideoCoreProps> = ({
  videoSrc,
  isSpeaking,
  isMuted,
  isLoaded,
  loadError,
  onLoaded,
  onError,
  onEnded,
  className
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Setup video loading and event listeners
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    video.muted = true; // Silenciado inicialmente para evitar restricciones de reproducción automática
    
    const handleLoaded = () => {
      console.log("Video cargado exitosamente:", videoSrc);
      onLoaded();
      
      // Actualizar el estado de silencio basado en las props
      video.muted = isMuted;
      
      // Si debería estar reproduciendo, iniciarlo
      if (isSpeaking) {
        video.play().catch(e => {
          console.error("Error en reproducción inicial:", e);
          // Intentar reproducir silenciado si hay problemas de autoplay
          if (e.name === 'NotAllowedError' && !isMuted) {
            video.muted = true;
            video.play().catch(innerE => console.error("No se pudo reproducir incluso silenciado:", innerE));
          }
        });
      }
    };
    
    const handleError = (e: Event) => {
      console.error("Error al cargar el video:", videoSrc, e);
      onError();
    };
    
    const handleVideoEnded = () => {
      console.log("Video terminado:", videoSrc);
      onEnded();
    };
    
    // Configurar escuchadores de eventos
    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleVideoEnded);
    
    try {
      // Asegurarse de que la URL del video sea correcta
      // Normalizar la ruta para manejar espacios y caracteres especiales
      const basePath = "/lovable-uploads/";
      const fullPath = basePath + encodeURI(videoSrc).replace(/%20/g, ' ');
      
      console.log("Intentando cargar video desde:", fullPath);
      video.src = fullPath;
      video.load();
      
      // Establecer un tiempo de espera para la carga
      const timeoutId = setTimeout(() => {
        if (!isLoaded) {
          console.log("Tiempo de espera de carga de video agotado para:", videoSrc);
          onError();
        }
      }, 8000); // Aumentamos el tiempo de espera a 8 segundos
      
      return () => {
        clearTimeout(timeoutId);
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleVideoEnded);
        video.pause();
        video.src = '';
      };
    } catch (err) {
      console.error("Error al configurar video:", videoSrc, err);
      onError();
      return () => {
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, [videoSrc, isLoaded, onLoaded, onError, onEnded, isSpeaking, isMuted]);
  
  // Manejar reproducción y estado silenciado
  useEffect(() => {
    if (!videoRef.current || !isLoaded || loadError) return;
    
    const video = videoRef.current;
    
    // Aplicar estado de silencio
    video.muted = isMuted;
    
    // Manejar reproducción/pausa
    if (isSpeaking) {
      video.play().catch(error => {
        console.error("Error al reproducir video:", error);
        // Si la reproducción automática está bloqueada, silenciar e intentar de nuevo
        if (error.name === 'NotAllowedError') {
          video.muted = true;
          video.play().catch(e => console.error("Aún no se puede reproducir el video incluso silenciado:", e));
        }
      });
    } else {
      video.pause();
    }
  }, [isSpeaking, isMuted, isLoaded, loadError]);
  
  // Method to expose the video element for external control
  React.useImperativeHandle(videoRef, () => videoRef.current!, []);

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "transition-all duration-700 ease-out",
        "shadow-xl", 
        !isLoaded && "animate-pulse bg-gray-200",
        loadError && "opacity-0",
        className
      )}
      style={{ 
        opacity: isLoaded && !loadError ? 1 : 0,
        transform: `scale(${isLoaded && !loadError ? 1 : 0.9})`,
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <video 
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        preload="auto"
        loop={false}
      />
    </div>
  );
};

export default VideoCore;
