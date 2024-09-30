const loginForm = document.getElementById('login-form');

const showAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
};

// Verificar si el usuario ya está autenticado al cargar la página
(async () => {
    try {
        const response = await fetch("http://localhost:3000/auth/me", {
            credentials: "include"
        });

        if (response.ok) {
            // Si está autenticado, redirigir
            window.location.href = '/frontend/home.html';
        }
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
    }
})();

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const entries = Object.fromEntries(formData.entries());

    const username = document.getElementById('username');
    const contrasenia = document.getElementById('password');

    if (!username || !contrasenia) {
        showAlert('Por favor, completa todos los campos.', 'danger');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entries),
            credentials: "include"
        });

        const respuesta = await response.json();

        if (!response.ok) {
            showAlert(respuesta.msg || 'Error al iniciar sesión', 'danger');
        } else {
            showAlert(respuesta.msg || 'Inicio de sesión exitoso', 'success');

            setTimeout(() => {
                window.location.href = '/frontend/home.html';
            }, 2000);
        }
    } catch (error) {
        showAlert('Ocurrió un error. Inténtalo nuevamente.', 'danger');
    }
});
