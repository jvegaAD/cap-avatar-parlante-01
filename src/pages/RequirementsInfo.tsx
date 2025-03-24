
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ChevronLeft } from 'lucide-react';

const RequirementsInfo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gray-100 flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-2 px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium tracking-wide">
            Carpeta de Producción CAP
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3 tracking-tight">
            Información de Requirements.txt
          </h1>
          
          {/* Navegación */}
          <div className="mb-4">
            <Link to="/" className="text-primary hover:underline flex items-center justify-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Volver a la página principal
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 animate-appear">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Archivo Requirements.txt</h2>
          </div>
          
          <p className="text-gray-700 mb-4">
            El archivo <code className="bg-gray-100 px-2 py-1 rounded">requirements.txt</code> contiene 
            todas las dependencias del proyecto con sus versiones específicas. Esto permite asegurar 
            la reproducibilidad del entorno de desarrollo.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6 overflow-auto max-h-80">
            <pre className="text-sm">
              <code>
{`# Dependencias principales
react==18.3.1
react-dom==18.3.1
react-router-dom==6.26.2
lucide-react==0.462.0
recharts==2.12.7

# Componentes UI y diseño
@radix-ui/react-accordion==1.2.0
@radix-ui/react-alert-dialog==1.1.1
# ... y muchas más dependencias
`}
              </code>
            </pre>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">Cómo descargar solo este archivo</h3>
          <p className="text-gray-700 mb-4">
            Si solo necesitas el archivo de dependencias sin clonar todo el repositorio, 
            puedes usar la característica de Git llamada "sparse-checkout".
          </p>
          
          <div className="bg-gray-800 text-gray-200 p-4 rounded-lg mb-6 overflow-auto">
            <pre className="text-sm">
              <code>
{`mkdir cap-requirements
cd cap-requirements
git init
git remote add origin <URL_DEL_REPOSITORIO>
git config core.sparseCheckout true
echo "requirements.txt" > .git/info/sparse-checkout
git pull origin main`}
              </code>
            </pre>
          </div>
          
          <div className="flex justify-center">
            <Link to="/">
              <Button className="mt-4">
                Volver al inicio
              </Button>
            </Link>
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

export default RequirementsInfo;
