document.addEventListener('DOMContentLoaded', async () => {
  const btnLoginRegister = document.getElementById('btn-lr');
  const addPostButton = document.getElementById('addPostButton');
  const addVideoButton = document.getElementById('videoButton');
  const addQuizButton = document.getElementById('addQuizButton');

  if (!addPostButton) {
    console.error('El botón de añadir publicación no existe en el DOM.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/me', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('No authenticated');
    }

    const data = await response.json();

    if (data) {
      if (data.roleId === 2) {
        addQuizButton.style.display = 'flex'
        addPostButton.style.display = 'flex';
        addVideoButton.style.display = 'flex';
      } else {
        addQuizButton.style.display = 'none'
        addPostButton.style.display = 'none';
        addVideoButton.style.display = 'none';
      }

      // Mostrar el icono de perfil con menú desplegable
      btnLoginRegister.innerHTML = `
        <div class="profile-menu">
          <button class="profile-button">
            <i class="fas fa-user-circle fa-2x"></i>
          </button>
          <div class="profile-dropdown">
            <a href="profile.html" class="dropdown-item">
              <i class="fas fa-user"></i>
              Mi Perfil
            </a>
            ${data.roleId === 2 ? `
            <a href="medic-publications.html" class="dropdown-item">
              <i class="fas fa-folder-open"></i>
              Mis Publicaciones
            </a>
            ` : ''}
            <button id="logout" class="dropdown-item">
              <i class="fas fa-sign-out-alt"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      `;

      // Agregar estilos dinámicamente
      const style = document.createElement('style');
      style.textContent = `
        .profile-menu {
          position: relative;
          display: inline-block;
        }
        
        .profile-button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 8px;
          transition: color 0.3s ease;
        }
        
        .profile-button:hover {
          color: #e0e0e0;
        }
        
        .profile-dropdown {
          display: none;
          position: absolute;
          right: 0;
          top: 100%;
          background-color: white;
          min-width: 180px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          border-radius: 8px;
          padding: 8px 0;
          z-index: 1000;
          margin-top: 8px;
        }
        
        .profile-menu:hover .profile-dropdown {
          display: block;
        }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          border: none;
          background: none;
          color: #333;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 14px;
        }
        
        .dropdown-item:hover {
          background-color: #f5f5f5;
        }

        .dropdown-item i {
          width: 16px;
          text-align: center;
        }
      `;
      document.head.appendChild(style);

      // Agrega el evento para cerrar sesión
      document
        .getElementById('logout')
        .addEventListener('click', async (event) => {
          event.preventDefault();

          const logoutResponse = await fetch(
            'http://localhost:3000/auth/sign-out',
            {
              method: 'POST',
              credentials: 'include',
            },
          );

          if (logoutResponse.ok) {
            window.location.reload();
          } else {
            console.error('Error al cerrar sesión');
          }
        });
    } else {
      // Si no está autenticado, mostrar los botones de iniciar sesión y registro
      btnLoginRegister.innerHTML = `
        <button class="btn" id="loginBtn"><a href="sesion.html">Iniciar Sesión</a></button>
        <button class="btn" id="registerBtn"><a href="registro.html">Registrarse</a></button>
      `;
      addPostButton.style.display = 'none';
    }
  } catch (error) {
    // Si hay un error o el usuario no está autenticado, ocultar el botón de añadir publicación
    addPostButton.style.display = 'none';

    // Manejar errores de autenticación
    btnLoginRegister.innerHTML = `
      <button class="btn" id="loginBtn"><a href="sesion.html">Iniciar Sesión</a></button>
      <button class="btn" id="registerBtn"><a href="registro.html">Registrarse</a></button>
    `;
  }
});