import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ isSticky }) {
  const [isOpen, setIsOpen] = useState(false);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isSticky
      ? 'bg-white text-black shadow-lg'
      : 'bg-transparent text-white'
  }`;

  const buttonClasses = `px-6 py-2 rounded-full font-semibold transition-all ${
    isSticky
      ? 'bg-red-600 text-white hover:bg-red-700'
      : 'bg-white text-black hover:bg-gray-100'
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-2xl font-bold">SOSDoc</a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-red-500 transition-colors">Inicio</a>
            <a href="/aboutus" className="hover:text-red-500 transition-colors">Sobre Nosotros</a>
            <a href="/contact" className="hover:text-red-500 transition-colors">Contactos</a>
            
            <div className="relative group">
              <button className="hover:text-red-500 transition-colors">
                Categorías
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <a href="/seccion-general" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Primeros auxilios</a>
                  <a href="/seccion-rcp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Maniobras de RCP</a>
                  <a href="/seccion-heimlich" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Maniobra de Heimlich</a>
                  <a href="/seccion-hemorragias" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Control de hemorragias</a>
                  <a href="/seccion-heridas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tratamiento de heridas</a>
                  <a href="/seccion-quemaduras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tratamiento de quemaduras</a>
                  <a href="/seccion-otros" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Otros</a>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="/login" className={buttonClasses}>Iniciar Sesión</a>
              <a href="/register" className={buttonClasses}>Registrarse</a>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 rounded-md hover:bg-red-500 hover:text-white">Inicio</a>
              <a href="/aboutus" className="block px-3 py-2 rounded-md hover:bg-red-500 hover:text-white">Sobre Nosotros</a>
              <a href="/contact" className="block px-3 py-2 rounded-md hover:bg-red-500 hover:text-white">Contactos</a>
              <a href="/categories" className="block px-3 py-2 rounded-md hover:bg-red-500 hover:text-white">Categorías</a>
              <div className="flex flex-col space-y-2 mt-4">
                <a href="/login" className={buttonClasses}>Iniciar Sesión</a>
                <a href="/register" className={buttonClasses}>Registrarse</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}