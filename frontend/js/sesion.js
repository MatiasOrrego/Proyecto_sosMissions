const form = document.getElementById('form');

const login = async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const contrasenia = document.getElementById('password').value;
    
    const peticion = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({username, contrasenia}),
        headers: {
            'Content-type': 'application/json'
        }
    })

    const respuesta = await peticion.json();

    if(!peticion.ok){
        alert(respuesta.msg)
    } else {
        alert(respuesta.msg)

        localStorage.setItem('token', respuesta.token);

        window.location.href = './home.html'
    }
    }

form.addEventListener('submit', login);