import React from 'react';
import AnimatedBackground from '../components/layouts/AnimatedBackground';
import RCPCounter from '../components/ui/rcpCounter';

const Home = () => {
  return (
    <div className="relative min-h-screen ">
      <div className="absolute top-0 left-0 w-full h-screen z-0">
          <AnimatedBackground />
        </div>
       
      <main className="relative z-10 pt-20">
      <section className="text-center py-10 bg-gradient-to-r">
            <h1 className="text-4xl font-bold mb-4">Saber actuar es salvar vidas</h1>
            <p className="text-lg">Conoce los pasos clave para manejar emergencias de manera efectiva</p>
          </section>
        <div className="relative z-10 bg-opacity-100 bg-white">
          

          <section className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-6">Categorías</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="./src/assets/img/si.jpeg" alt="Primeros auxilios" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Primeros auxilios</h3>
                  <p className="text-gray-600 mb-4">Conoce las técnicas básicas de primeros auxilios para actuar en situaciones de emergencia.</p>
                  <a href="/seccion-general" className="text-blue-500 hover:underline">Ver más</a>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="./src/assets/img/si.jpeg" alt="Maniobras de RCP" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Maniobras de RCP</h3>
                  <p className="text-gray-600 mb-4">Aprende cómo realizar maniobras de reanimación cardiopulmonar (RCP) de manera efectiva.</p>
                  <a href="/seccion2" className="text-blue-500 hover:underline">Ver más</a>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="./src/assets/img/si.jpeg" alt="Maniobra de Heimlich" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Maniobra de Heimlich</h3>
                  <p className="text-gray-600 mb-4">Descubre cómo realizar la maniobra de Heimlich para desobstruir las vías respiratorias.</p>
                  <a href="/seccion3" className="text-blue-500 hover:underline">Ver más</a>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="./src/assets/img/si.jpeg" alt="Tratamiento de Quemaduras" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Tratamiento de Quemaduras</h3>
                  <p className="text-gray-600 mb-4">Aprende cómo tratar quemaduras de diferentes grados de manera adecuada.</p>
                  <a href="/seccion4" className="text-blue-500 hover:underline">Ver más</a>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="./src/assets/img/si.jpeg" alt="Control de Hemorragias" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Control de Hemorragias</h3>
                  <p className="text-gray-600 mb-4">Conoce las técnicas para controlar hemorragias y evitar complicaciones mayores.</p>
                  <a href="/seccion5" className="text-blue-500 hover:underline">Ver más</a>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="./src/assets/img/si.jpeg" alt="Respiración de Rescate" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">Respiración de Rescate</h3>
                  <p className="text-gray-600 mb-4">Aprende cómo realizar la respiración de rescate en situaciones de emergencia.</p>
                  <a href="/seccion6" className="text-blue-500 hover:underline">Ver más</a>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-6">Contador de Maniobras RCP</h2>
            <RCPCounter />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;