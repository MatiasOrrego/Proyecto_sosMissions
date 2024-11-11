const registerForm = document.getElementById('register-form');

const showAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
};

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);

    const entries = Object.fromEntries(formData.entries())

    const name = document.getElementById('name').value

    const lastname = document.getElementById('lastname').value

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('password').value;
    const confircon = document.getElementById('passwordConfirm').value;

    if (!name || !lastname || !username || !email || !contrasenia || !confircon) {
        showAlert('Todos los campos son obligatorios', 'danger');
        return;
    }

    if (contrasenia !== confircon) {
        showAlert('Las contraseñas no coinciden', 'danger');
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/auth/sign-up", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(entries),
            credentials: "include"
        });

        const respuesta = await response.json()

        if (!response.ok) {
            showAlert(respuesta.msg, 'danger');
        } else {
            showAlert(respuesta.msg, 'success');
            setTimeout(() => {
                window.location.href = 'http://localhost:5173/sesion.html';
            }, 2000);
        }
    } catch (error) {
        showAlert('Ocurrió un error. Inténtalo nuevamente.', 'danger');
    }
}) 
