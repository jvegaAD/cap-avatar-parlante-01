
import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoAvatarProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  isSpeaking: boolean;
  isMuted: boolean;
  className?: string;
  onEnded?: () => void;
  rewindSeconds?: number;
}

const VideoAvatar: React.FC<VideoAvatarProps> = ({ 
  videoSrc, 
  fallbackImageSrc,
  isSpeaking,
  isMuted,
  className,
  onEnded,
  rewindSeconds = 5
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Manejo de carga del video - Enfoque simplificado
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    video.muted = true; // Silenciado inicialmente para evitar restricciones de reproducción automática
    
    const handleLoaded = () => {
      console.log("Video cargado exitosamente");
      setIsLoaded(true);
      setLoadError(false);
      
      // Actualizar el estado de silencio basado en las props
      video.muted = isMuted;
      
      // Si debería estar reproduciendo, iniciarlo
      if (isSpeaking) {
        video.play().catch(e => console.error("Error en reproducción inicial:", e));
      }
    };
    
    const handleError = (e: Event) => {
      console.error("Error al cargar el video:", e);
      setLoadError(true);
    };
    
    const handleVideoEnded = () => {
      if (onEnded) {
        onEnded();
      }
    };
    
    // Configurar escuchadores de eventos
    video.addEventListener('loadeddata', handleLoaded);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleVideoEnded);
    
    // Construir la ruta completa al archivo
    try {
      // Usar una ruta relativa a la carpeta public
      const basePath = "/lovable-uploads/";
      // No codificar la URL para evitar problemas con espacios
      const fullPath = basePath + videoSrc;
      
      console.log("Intentando cargar video desde:", fullPath);
      video.src = fullPath;
      video.load();
      
      // Establecer un tiempo de espera para la carga
      const timeoutId = setTimeout(() => {
        if (!isLoaded) {
          console.log("Tiempo de espera de carga de video agotado");
          setLoadError(true);
        }
      }, 5000); // Aumentamos el tiempo de espera a 5 segundos
      
      return () => {
        clearTimeout(timeoutId);
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleVideoEnded);
        video.pause();
        video.src = '';
      };
    } catch (err) {
      console.error("Error al configurar video:", err);
      setLoadError(true);
      return () => {
        video.removeEventListener('loadeddata', handleLoaded);
        video.removeEventListener('error', handleError);
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, [videoSrc, isLoaded, isMuted, onEnded]);
  
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
  
  // Método para rebobinar el video
  const rewindVideo = () => {
    if (videoRef.current && isLoaded) {
      const video = videoRef.current;
      // Asegurar que no vamos a un tiempo negativo
      const newTime = Math.max(0, video.currentTime - rewindSeconds);
      video.currentTime = newTime;
    }
  };
  
  // Exponemos el método rewindVideo a través de useImperativeHandle si es necesario
  // Por ahora lo exponemos como una propiedad del videoRef para uso interno
  if (videoRef.current) {
    (videoRef.current as any).rewindVideo = rewindVideo;
  }
  
  return (
    <div className="video-avatar-container relative">
      {/* Imagen de respaldo cuando el video falla al cargar */}
      {(loadError || !isLoaded) && fallbackImageSrc && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200 rounded-3xl overflow-hidden">
          <img 
            src={"/lovable-uploads/" + fallbackImageSrc} 
            alt="Avatar fallback" 
            className="w-full h-full object-cover"
          />
          {loadError && (
            <div className="absolute bottom-2 left-0 right-0 text-sm text-center bg-black/50 text-white py-1">
              El video no pudo ser cargado
            </div>
          )}
        </div>
      )}
      
      {/* Contenedor de video */}
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
          loop={false} /* Cambiado a false para que no se repita */
        />
      </div>
      
      {/* Barras de visualización de audio */}
      <div className={cn(
        "absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-4",
        "transform-gpu transition-all duration-500",
        isSpeaking && !loadError ? "opacity-100 scale-100" : "opacity-0 scale-90"
      )}>
        <div className="flex items-end justify-center gap-[4px] h-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              style={{
                height: `${Math.max(30, Math.random() * 100)}%`,
                animationDuration: `${0.6 + Math.random() * 0.4}s`,
                animationDelay: `${Math.random() * 0.2}s`
              }}
              className={cn(
                "w-[4px] bg-primary rounded-full animate-pulse-subtle",
                isSpeaking ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoAvatar;
