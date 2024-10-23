const loginForm = document.getElementById('login-form');

const showAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    alertPlaceholder.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
};

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const entries = Object.fromEntries(formData.entries());

    // Verifica si los campos están vacíos
    const username = entries.username;
    const contrasenia = entries.password;

    if (!username || !contrasenia) {
        showAlert('Por favor, completa todos los campos.', 'danger');
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entries),
            credentials: "include", 
        });

        const respuesta = await response.json();

        console.log(respuesta);

        if (!response.ok) {
            showAlert(respuesta.message || 'Error al iniciar sesión', 'danger');
        } else {
            showAlert(respuesta.msg || 'Inicio de sesión exitoso', 'success');

            setTimeout(() => {
                window.location.href = 'http://localhost:5173/index.html';
            }, 2000);
        }
    } catch (error) {
        showAlert('Ocurrió un error. Inténtalo nuevamente.', 'danger');
    }
});
