import { useState } from 'react';
import Navbar from '../components/Navbar';
import BackgroundCanvas from '../components/BackgroundCanvas';

export default function RegisterMedical() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    documento: '',
    matriculaNacional: '',
    matriculaProvincial: '',
    password: '',
    confirmPassword: '',
    especialidades: '',
    telefono: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle medical registration logic here
  };

  return (
    <div className="min-h-screen">
      <BackgroundCanvas />
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Regístrate como usuario médico
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Juan"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Apellido</label>
                <input
                  type="text"
                  placeholder="Pérez"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({ ...formData, apellido: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="ejemplo@gmail.com"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Número de documento
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.documento}
                  onChange={(e) =>
                    setFormData({ ...formData, documento: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Matrícula nacional
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.matriculaNacional}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      matriculaNacional: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Matrícula provincial
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.matriculaProvincial}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      matriculaProvincial: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Especialidades</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.especialidades}
                onChange={(e) =>
                  setFormData({ ...formData, especialidades: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                className="w-full px-4 py-2 rounded-full border border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({ ...formData, telefono: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors">
              Registrar
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
