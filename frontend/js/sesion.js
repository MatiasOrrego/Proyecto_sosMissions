// Obtener el formulario
const form = document.getElementById('form');

// Función para mostrar alertas
const showAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
};

// Función para manejar el inicio de sesión
const login = async (e) => {
    e.preventDefault();

    // Obtener los valores de los campos
    const username = document.getElementById('username').value;
    const contrasenia = document.getElementById('password').value;

    // Verificar que los campos no estén vacíos
    if (!username || !contrasenia) {
        showAlert('Por favor, completa todos los campos.', 'danger');
        return;
    }

    try {
        // Enviar solicitud de inicio de sesión
        const peticion = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({ username, contrasenia }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const respuesta = await peticion.json();

        if (!peticion.ok) {
            showAlert(respuesta.msg, 'danger');
        } else {
            showAlert(respuesta.msg, 'success');

            // Almacenar el token y redirigir
            localStorage.setItem('token', respuesta.token);

            setTimeout(() => {
                window.location.href = '/frontend/home.html';
            }, 2000); // Redirigir después de 2 segundos
        }
    } catch (error) {
        showAlert('Ocurrió un error. Inténtalo nuevamente.', 'danger');
    }
}

// Añadir el manejador de eventos al formulario
form.addEventListener('submit', login);