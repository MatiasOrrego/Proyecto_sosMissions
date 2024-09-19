document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const btnLoginRegister = document.getElementById('btn-lr');
    
    if (token) {
        btnLoginRegister.innerHTML = `<a href='' id='logout'>Cerrar Sesión</a>`;

        document.getElementById('logout').addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('token');
            window.location.reload();
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/post')
        .then(response => response.json())
        .then(data => {
            const contenedorPublicaciones = document.querySelector('.card-group');
            data.forEach(post => {
                crearNuevaPublicacion(post.title, post.description);
            });
        })
        .catch(error => {
            console.error('Error al obtener las publicaciones:', error);
        });

    const alertPlaceholder = document.createElement('div');
    document.querySelector('main').insertBefore(alertPlaceholder, document.querySelector('main').firstChild);
});

function crearNuevaPublicacion(titulo) {
    const contenedorPublicaciones = document.querySelector('.card-group');

    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('card-publi');

    const nuevaImagen = document.createElement('img');
    nuevaImagen.classList.add('card-img-top', 'cardImg');
    nuevaImagen.src = '../../assets/img/imh-maniobras-emergencia.png'; // Si quieres mantener la imagen

    const cuerpoTarjeta = document.createElement('div');
    cuerpoTarjeta.classList.add('card-body');

    const nuevoTitulo = document.createElement('h5');
    nuevoTitulo.classList.add('card-title-publi');
    nuevoTitulo.textContent = titulo; // Solo mostramos el título

    const enlaceLeerMas = document.createElement('a');
    enlaceLeerMas.classList.add('card-link');
    enlaceLeerMas.href = '#';
    enlaceLeerMas.textContent = 'Leer más'; // Si quieres agregar un enlace para "Leer más"

    cuerpoTarjeta.appendChild(nuevoTitulo);
    cuerpoTarjeta.appendChild(enlaceLeerMas); // Si el enlace "Leer más" es necesario
    nuevaTarjeta.appendChild(nuevaImagen); // Si quieres mostrar la imagen
    nuevaTarjeta.appendChild(cuerpoTarjeta);

    contenedorPublicaciones.appendChild(nuevaTarjeta);
}
