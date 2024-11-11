import { useState } from 'react';
import Navbar from '../components/Navbar';
import BackgroundCanvas from '../components/BackgroundCanvas';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen">
      <BackgroundCanvas />
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Nombre de Usuario</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
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

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors"
            >
              Iniciar Sesión
            </button>

            <div className="text-center">
              <a href="/recover-password" className="text-blue-500 hover:underline">
                Haz click aquí para recuperar la contraseña
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}