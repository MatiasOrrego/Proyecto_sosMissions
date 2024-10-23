const registerForm = document.getElementById('register-medic')

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);

    const entries = Object.fromEntries(formData.entries())
    const contrasenia = document.getElementById('password').value;
    const confircon = document.getElementById('passwordConfirm').value;

    if (contrasenia !== confircon) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/medic/sign-in", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(entries),
            credentials: "include"
        });

        const respuesta = await response.json()

        if (!response.ok) {
            alert(respuesta.msg);
        } else {
            alert(respuesta.msg, );
            setTimeout(() => {
                window.location.href = 'sesion.html';
            }, 2000);
        }
    } catch (error) {
        alert('Ocurrió un error. Inténtalo nuevamente.');
    }
}) 