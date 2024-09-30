document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    const showAlert = (message, type) => {
        const alertPlaceholder = document.getElementById('alertPlaceholder');
        if (alertPlaceholder) {
            alertPlaceholder.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        }
    };

    const login = async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const contrasenia = document.getElementById('password').value;

        if (!username || !contrasenia) {
            showAlert('Por favor, completa todos los campos.', 'danger');
            return;
        }

        try {
            const peticion = await fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify({ username, contrasenia }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (!peticion.ok) {
                const errorResponse = await peticion.json();
                showAlert(errorResponse.msg || 'Error en la solicitud', 'danger');
                return;
            }

            const respuesta = await peticion.json();
            showAlert(respuesta.msg, 'success');
            localStorage.setItem('token', respuesta.token);

            setTimeout(() => {
                window.location.href = '/frontend/home.html';
            }, 2000);
        } catch (error) {
            showAlert('Ocurrió un error. Inténtalo nuevamente.', 'danger');
            console.error('Error:', error);
        }
    };

    if (form) {
        form.addEventListener('submit', login);
    }
});