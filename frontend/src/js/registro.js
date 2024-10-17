const form = document.getElementById('registrarFormulario');

const showAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
};

const register = async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('password').value;
    const confircon = document.getElementById('passwordConfirm').value;

    if (!nombre || !apellido || !username || !email || !contrasenia || !confircon) {
        showAlert('Todos los campos son obligatorios', 'danger');
        return;
    }

    if (contrasenia !== confircon) {
        showAlert('Las contraseñas no coinciden', 'danger');
        return;
    }

    try {
        const peticion = await fetch('http://localhost:3000/register', {
            method: 'POST',
            body: JSON.stringify({ username, contrasenia, email }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const respuesta = await peticion.json();

        if (!peticion.ok) {
            showAlert(respuesta.msg, 'danger');
        } else {
            showAlert(respuesta.msg, 'success');
            setTimeout(() => {
                window.location.href = '/frontend/sesion.html';
            }, 2000);
        }
    } catch (error) {
        showAlert('Ocurrió un error. Inténtalo nuevamente.', 'danger');
    }
}

form.addEventListener('submit', register);
