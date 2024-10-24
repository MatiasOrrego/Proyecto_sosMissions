import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">SOSMissions</h1>
            <p className="text-gray-400">© 2024 SOSMissions. Todos los derechos reservados.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://google.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-google"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="/" className="text-gray-400 hover:text-white">Inicio</a>
          <a href="/about" className="text-gray-400 hover:text-white">Sobre Nosotros</a>
          <a href="/contact" className="text-gray-400 hover:text-white">Contactos</a>
        </div>
      </div>
    </footer>
  );
}