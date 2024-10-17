const form = document.getElementById('form');

const showAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
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

        const respuesta = await peticion.json();

        if (!peticion.ok) {
            showAlert(respuesta.msg, 'danger');
        } else {
            showAlert(respuesta.msg, 'success');

            localStorage.setItem('token', respuesta.token);

            setTimeout(() => {
                window.location.href = '/frontend/home.html';
            }, 2000);
        }
    } catch (error) {
        showAlert('Ocurrió un error. Inténtalo nuevamente.', 'danger');
    }
}

form.addEventListener('submit', login);