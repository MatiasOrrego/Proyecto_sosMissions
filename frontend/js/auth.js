document.addEventListener('DOMContentLoaded', async () => {
    const btnLoginRegister = document.getElementById('btn-lr');
  
    try {
      const response = await fetch('http://localhost:3000/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error('No authenticated');
      }
  
      const data = await response.json();
      
      if (data.authenticated) {
        btnLoginRegister.innerHTML = `<a href='' id='logout'>Cerrar Sesión</a>`;
  
        document.getElementById('logout').addEventListener('click', async (event) => {
          event.preventDefault();
  
          const logoutResponse = await fetch('http://localhost:3000/auth/sign-out', {
            method: 'POST',
            credentials: 'include',
          });
  
          if (logoutResponse.ok) {
            window.location.reload();
          } else {
            console.error('Error al cerrar sesión');
          }
        });
      } else {
        btnLoginRegister.innerHTML = `
          <button class="btn" id="loginBtn"> <a href="/frontend/sesion.html">Iniciar Sesión</a></button>
          <button class="btn" id="registerBtn"><a href="/frontend/registro.html">Registrarse</a></button>
        `;
      }
    } catch (error) {
      btnLoginRegister.innerHTML = `
        <button class="btn" id="loginBtn"> <a href="/frontend/sesion.html">Iniciar Sesión</a></button>
        <button class="btn" id="registerBtn"><a href="/frontend/registro.html">Registrarse</a></button>
      `;
    }
  });
  