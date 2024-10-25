import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              SOSDoc
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">Inicio</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">Sobre Nosotros</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contactos</Link>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Iniciar Sesión</Link>
            <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Registrarse
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Contactos
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}