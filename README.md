
# Carpeta de Producción CAP - Proyecto de Avatares

## Información del Proyecto

**URL**: https://lovable.dev/projects/cb1f49ec-e361-4692-9362-f0f80038c3c5

## Estructura de Archivos

El proyecto tiene la siguiente estructura de archivos principales:

```
├── public/                  # Archivos estáticos
│   └── lovable-uploads/     # Videos e imágenes cargadas
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Componentes de UI de shadcn
│   │   ├── VideoAvatar.tsx  # Componente para reproducir videos
│   │   ├── SpeechBubble.tsx # Componente para burbujas de texto
│   │   └── TextAnimation.tsx # Componente para animación de texto
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Index.tsx        # Página principal (primer video)
│   │   ├── SecondVideo.tsx  # Página del segundo video
│   │   └── NotFound.tsx     # Página 404
│   ├── lib/                 # Utilidades y funciones
│   ├── hooks/               # Hooks personalizados
│   ├── App.tsx              # Componente principal con rutas
│   └── main.tsx             # Punto de entrada de la aplicación
└── index.html               # Archivo HTML principal
```

## Tecnologías Utilizadas

Este proyecto está construido con:

- Vite - Entorno de desarrollo rápido
- TypeScript - Superset tipado de JavaScript
- React - Biblioteca para construir interfaces de usuario
- shadcn-ui - Sistema de componentes UI
- Tailwind CSS - Framework de CSS utilitario
- React Router - Enrutamiento para React

## Dependencias Principales

- React 18.3.1
- React Router Dom 6.26.2
- Lucide React 0.462.0 (para iconos)
- Tailwind CSS y sus plugins
- Tanstack React Query 5.56.2
- Recharts 2.12.7 (para gráficos si se necesitan)

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- Node.js (recomendado instalar con [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm (viene con Node.js)
- Git
- Visual Studio Code

### Pasos para Ejecutar con Visual Studio Code

1. **Clonar el Repositorio**

   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd carpeta-de-produccion-cap
   ```

2. **Abrir el Proyecto en Visual Studio Code**

   ```sh
   code .
   ```

   O abre VS Code y desde el menú "File" selecciona "Open Folder" y navega hasta la carpeta del proyecto.

3. **Instalar Dependencias**

   Abre la terminal integrada en VS Code con `Ctrl+` ó con el menú "Terminal" -> "New Terminal" y ejecuta:

   ```sh
   npm install
   ```

4. **Iniciar el Servidor de Desarrollo**

   En la misma terminal, ejecuta:

   ```sh
   npm run dev
   ```

   Esto iniciará el servidor de desarrollo y la aplicación estará disponible en `http://localhost:8080`.

5. **Extensiones Recomendadas para VS Code**

   Para una mejor experiencia de desarrollo, puedes instalar estas extensiones en VS Code:
   
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript React code snippets

## Funcionalidades Principales

- Reproducción de videos de avatares
- Controles de reproducción (play/pause, reinicio, silencio)
- Función de rebobinado (5 segundos)
- Navegación entre videos
- Interfaz responsiva

## Cómo Desplegar el Proyecto

Puedes desplegar fácilmente abriendo [Lovable](https://lovable.dev/projects/cb1f49ec-e361-4692-9362-f0f80038c3c5) y haciendo clic en Compartir -> Publicar.

## Licencia

© 2024 Carpeta de Producción CAP. Todos los derechos reservados.
