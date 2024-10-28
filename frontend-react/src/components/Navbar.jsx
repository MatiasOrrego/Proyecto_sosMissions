import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

export const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Manejador para hacer el header sticky al hacer scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header className={`bg-blue-600 shadow-lg fixed top-0 w-full z-50 ${isSticky ? 'sticky' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a className={`text-2xl font-bold navbar-brand ${isSticky ? 'text-black' : 'text-white'}`} href="index.html">
          SOSDoc
        </a>
        <button
          className="text-white hover:text-gray-200 focus:outline-none lg:hidden"
          onClick={toggleNavbar}
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div
          className={`${
            isCollapsed ? 'hidden' : ''
          } w-full lg:flex lg:w-auto lg:items-center justify-center`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0 text-white text-center">
            <li className="nav-item">
              <a className="nav-link hover:text-gray-200" href="index.html">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link hover:text-gray-200" href="./aboutus.html">
                Sobre Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link hover:text-gray-200" href="./contact.html">
                Contactos
              </a>
            </li>
            <li className="nav-item relative">
              <button
                className="nav-link hover:text-gray-200 flex items-center focus:outline-none"
                onClick={() => setIsCollapsed(!isCollapsed)}>
                Categorías
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <ul className="absolute bg-blue-600 text-white shadow-lg rounded-lg mt-2 hidden lg:block">
                <li>
                  <a className="block px-4 py-2 hover:bg-blue-700" href="seccion-general.html">
                    Primeros auxilios
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-blue-700" href="seccion-rcp.html">
                    Maniobras de RCP
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-blue-700" href="seccion-heimlich.html">
                    Maniobra de Heimlich
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-blue-700" href="seccion-hemorragias.html">
                    Control de hemorragias
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-blue-700" href="seccion-heridas.html">
                    Tratamiento de heridas
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-blue-700" href="seccion-quemaduras.html">
                    Tratamiento de quemaduras
                  </a>
                </li>
                <li>
                  <a className="block px-4 py-2 hover:bg-blue-700" href="seccion-otros.html">
                    Otros
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a
              id="loginBtn"
              className={`px-4 py-2 ${isSticky ? 'bg-red-600 text-white' : 'bg-white text-black'} rounded-full`}
              href="./sesion.html">
              Iniciar Sesión
            </a>
            <a
              id="registerBtn"
              className={`px-4 py-2 ${isSticky ? 'bg-red-600 text-white' : 'bg-white text-black'} rounded-full`}
              href="./registro.html">
              Registrarse
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
