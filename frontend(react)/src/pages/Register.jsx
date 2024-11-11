import { useState } from 'react';
import Navbar from '../components/Navbar';
import BackgroundCanvas from '../components/BackgroundCanvas';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen">
      <BackgroundCanvas />
      <Navbar />
      <main className="mt-20">
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Crea tu usuario</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Juan"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Apellido</label>
                <input
                  type="text"
                  placeholder="Pérez"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.apellido}
                  onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Nombre de Usuario</label>
              <input
                type="text"
                placeholder="juan123"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="ejemplo@gmail.com"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Registrarse
            </button>

            <div className="text-center space-y-2">
              <p>¿Ya tienes una cuenta? <a href="/login" className="text-blue-500 hover:underline">Ingrese aquí</a></p>
              <p>
                Si usted es un <span className="font-medium">profesional médico</span>, puede registrarse como tal{' '}
                <a href="/register-medical" className="text-blue-500 hover:underline">haciendo click aquí</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      </main>
      
    </div>
  );
}