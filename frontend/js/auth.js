document.addEventListener('DOMContentLoaded', async () => {
  const btnLoginRegister = document.getElementById('btn-lr');
  const addPostBtn = document.getElementById('addPostBtn'); // Botón de añadir publicación

  // Inicialmente ocultar el botón de añadir publicación
  addPostBtn.style.display = 'none';

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
      // Si el usuario tiene roleId 2 (medic), mostrar el botón de añadir publicación
      if (data.roleId === 2) {
        addPostBtn.style.display = 'block'; // Mostrar el botón
      } else {
        addPostBtn.style.display = 'none'; // Ocultar el botón si no es roleId 2
      }

      // Mostrar el botón de cerrar sesión si el usuario está autenticado
      btnLoginRegister.innerHTML = `<button class="btn" id="logout">Cerrar Sesión</button>`;

      // Agrega el evento para cerrar sesión
      document.getElementById('logout').addEventListener('click', async (event) => {
        event.preventDefault();

        const logoutResponse = await fetch('http://localhost:3000/auth/sign-out', {
          method: 'POST',
          credentials: 'include',
        });

        if (logoutResponse.ok) {
          window.location.reload(); // Recargar la página para actualizar el estado de autenticación
        } else {
          console.error('Error al cerrar sesión');
        }
      });
    } else {
      // Si no está autenticado, mostrar los botones de iniciar sesión y registro
      btnLoginRegister.innerHTML = `
        <button class="btn" id="loginBtn"><a href="/frontend/sesion.html">Iniciar Sesión</a></button>
        <button class="btn" id="registerBtn"><a href="/frontend/registro.html">Registrarse</a></button>
      `;
      addPostBtn.style.display = 'none'; // Asegurarse de que el botón esté oculto si no está autenticado
    }
  } catch (error) {
    // Si hay un error o el usuario no está autenticado, ocultar el botón de añadir publicación
    addPostBtn.style.display = 'none';

    // Manejar errores de autenticación
    btnLoginRegister.innerHTML = `
      <button class="btn" id="loginBtn"><a href="/frontend/sesion.html">Iniciar Sesión</a></button>
      <button class="btn" id="registerBtn"><a href="/frontend/registro.html">Registrarse</a></button>
    `;
  }
});
