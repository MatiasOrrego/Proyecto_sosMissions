import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-lg fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link className="text-xl font-bold text-gray-800" to="/">SOSDoc</Link>
          <nav className="hidden md:flex space-x-4">
            <Link className="text-gray-600 hover:text-gray-900" to="/">Inicio</Link>
            <Link className="text-gray-600 hover:text-gray-900" to="/about">Sobre Nosotros</Link>
            <Link className="text-gray-600 hover:text-gray-900" to="/contact">Contactos</Link>
            <div className="relative">
              <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                Categorías
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2">
                <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100" to="/seccion-general">Primeros auxilios</Link>
                <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100" to="/seccion2">Maniobras de RCP</Link>
                <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100" to="/seccion3">Maniobra de Heimlich</Link>
                <Link className="block px-4 py-2 text-gray-600 hover:bg-gray-100" to="/seccion1">Primeros auxilios</Link>
              </div>
            </div>
          </nav>
          <div className="flex space-x-4">
            <Link className="text-gray-600 hover:text-gray-900" to="/sesion">Iniciar Sesión</Link>
            <Link className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" to="/registro">Registrarse</Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className="text-center py-10 bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
          <h1 className="text-4xl font-bold mb-4">Saber actuar es salvar vidas</h1>
          <p className="text-lg">Conoce los pasos clave para manejar emergencias de manera efectiva</p>
        </section>

        <section className="container mx-auto py-10">
          <h2 className="text-2xl font-bold text-center mb-6">Categorías</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="./src/assets/img/si.jpeg" alt="Primeros auxilios" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Primeros auxilios</h3>
                <p className="text-gray-600 mb-4">Conoce las técnicas básicas de primeros auxilios para actuar en situaciones de emergencia.</p>
                <Link to="/seccion-general" className="text-blue-500 hover:underline">Ver más</Link>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="./src/assets/img/si.jpeg" alt="Maniobras de RCP" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Maniobras de RCP</h3>
                <p className="text-gray-600 mb-4">Aprende cómo realizar maniobras de reanimación cardiopulmonar (RCP) de manera efectiva.</p>
                <Link to="/seccion2" className="text-blue-500 hover:underline">Ver más</Link>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="./src/assets/img/si.jpeg" alt="Maniobra de Heimlich" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Maniobra de Heimlich</h3>
                <p className="text-gray-600 mb-4">Descubre cómo realizar la maniobra de Heimlich para desobstruir las vías respiratorias.</p>
                <Link to="/seccion3" className="text-blue-500 hover:underline">Ver más</Link>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="./src/assets/img/si.jpeg" alt="Tratamiento de Quemaduras" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Tratamiento de Quemaduras</h3>
                <p className="text-gray-600 mb-4">Aprende cómo tratar quemaduras de diferentes grados de manera adecuada.</p>
                <Link to="/seccion4" className="text-blue-500 hover:underline">Ver más</Link>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="./src/assets/img/si.jpeg" alt="Control de Hemorragias" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Control de Hemorragias</h3>
                <p className="text-gray-600 mb-4">Conoce las técnicas para controlar hemorragias y evitar complicaciones mayores.</p>
                <Link to="/seccion5" className="text-blue-500 hover:underline">Ver más</Link>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="./src/assets/img/si.jpeg" alt="Respiración de Rescate" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Respiración de Rescate</h3>
                <p className="text-gray-600 mb-4">Aprende cómo realizar la respiración de rescate en situaciones de emergencia.</p>
                <Link to="/seccion6" className="text-blue-500 hover:underline">Ver más</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://google.com" className="text-gray-400 hover:text-white mx-2">
              <i className="fab fa-google"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white mx-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p>© 2024 SOSMissions. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;