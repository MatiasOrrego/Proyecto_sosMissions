const form = document.getElementById('registrarFormulario')

const register = async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const contrasenia = document.getElementById('password').value;
    const confircon = document.getElementById('passwordConfirm').value;

    const peticion = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({username, contrasenia, email}),
        headers: {
            'Content-type': 'application/json'
        }
    })

    const respuesta = await peticion.json();

if(!peticion.ok) {
    alert(respuesta.msg)
} else {

    alert(respuesta.msg)

    window.location.href = '/sesion.html'
}
}

form.addEventListener('submit', register)

