import React, { useState } from "react";
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex p-3 w-full fixed top-0 left-0 transition-all duration-500 z-[100000] rounded-[35px] mt-[15px] mx-[10px] bg-transparent">
      <div className="max-w-full px-4">
        {/* Brand */}
        <Link to="/" className="mr-[220px] text-white/90 font-bold no-underline">
          SOSDoc
        </Link>
        
        {/* Button for toggling the navbar */}
        <button 
          className="flex items-center justify-center p-2 rounded-md focus:ring-2 focus:ring-gray-300"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="block w-6 h-0.5 bg-gray-500 mb-1 transition-all duration-300"></span>
          <span className="block w-6 h-0.5 bg-gray-500 mb-1 transition-all duration-300"></span>
          <span className="block w-6 h-0.5 bg-gray-500 mb-1 transition-all duration-300"></span>
        </button>

        {/* Collapsible Navbar */}
        <div className={`flex-col lg:flex-row lg:flex ${isOpen ? 'block' : 'hidden'} transition-all duration-300`} id="navbarSupportedContent">
          <ul className="navbar-nav flex flex-col lg:flex-row">
            <li className="nav-item transition-colors duration-300 ease hover:bg-[rgb(180,0,0)] w-fit">
              <Link to="/" className="text-white/90 font-bold no-underline hover:text-white">Inicio</Link>
            </li>
            <li className="nav-item transition-colors duration-300 ease hover:bg-[rgb(180,0,0)] w-fit">
              <Link to="/about" className="text-white/90 font-bold no-underline hover:text-white">Sobre Nosotros</Link>
            </li>
            <li className="nav-item transition-colors duration-300 ease hover:bg-[rgb(180,0,0)] w-fit">
              <Link to="/contact" className="text-white/90 font-bold no-underline hover:text-white">Contactos</Link>
            </li>
            <li className="nav-item dropdown relative">
              <button className="text-white/90 font-bold no-underline hover:text-white">
                Categorías
              </button>
              <ul className="absolute hidden transition-opacity duration-300 ease-in-out group-hover:block">
                <li>
                  <Link to="/first-aid" className="dropdown-item">Primeros Auxilios</Link>
                </li>
                <li>
                  <Link to="/rcp" className="dropdown-item">Maniobras de RCP</Link>
                </li>
                <li>
                  <Link to="/heimlich" className="dropdown-item">Maniobra de Heimlich</Link>
                </li>
                <li>
                  <Link to="/hemorragias" className="dropdown-item">Control de Hemorragías</Link>
                </li>
                <li>
                  <Link to="/heridas" className="dropdown-item">Tratamiento de Heridas</Link>
                </li>
                <li>
                  <Link to="/quemaduras" className="dropdown-item">Tratamiento de Quemaduras</Link>
                </li>
                <li>
                  <Link to="/otros" className="dropdown-item">Otros</Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="btn-login">
            <Link to="/login">
              <button className="rounded-[100px] bg-white text-black hover:bg-[rgb(224,224,224)] hover:text-white">
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/register">
              <button className="rounded-[100px] bg-white text-black mr-2 hover:bg-[rgb(224,224,224)] hover:text-white">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
