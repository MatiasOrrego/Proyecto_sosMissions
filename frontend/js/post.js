document.addEventListener("DOMContentLoaded", () => {
    // Hacer una solicitud para obtener las publicaciones
    fetch('http://localhost:3000/post')
        .then(response => response.json())
        .then(data => {
            const contenedorPublicaciones = document.querySelector('.card-group');
            data.forEach(post => {
                // Llamar a la función para crear una nueva publicación con el título y la descripción
                crearNuevaPublicacion(post.title, post.description);
            });
        })
        .catch(error => {
            console.error('Error al obtener las publicaciones:', error);
        });

    const alertPlaceholder = document.createElement('div');
    document.querySelector('main').insertBefore(alertPlaceholder, document.querySelector('main').firstChild);
});

// Función para crear una nueva tarjeta de publicación
function crearNuevaPublicacion(titulo, descripcion) {
    const contenedorPublicaciones = document.querySelector('.card-group');

    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('card-publi');

    const nuevaImagen = document.createElement('img');
    nuevaImagen.classList.add('card-img-top', 'cardImg');
    nuevaImagen.src = '../../assets/img/imh-maniobras-emergencia.png';

    const cuerpoTarjeta = document.createElement('div');
    cuerpoTarjeta.classList.add('card-body');

    const nuevoTitulo = document.createElement('h5');
    nuevoTitulo.classList.add('card-title-publi');
    nuevoTitulo.textContent = titulo;

    const nuevaDescripcion = document.createElement('p');
    nuevaDescripcion.classList.add('card-text');
    nuevaDescripcion.textContent = descripcion;

    const enlaceLeerMas = document.createElement('a');
    enlaceLeerMas.classList.add('card-link');
    enlaceLeerMas.href = '#';
    enlaceLeerMas.textContent = 'Leer más';

    // Añadir evento al enlace para abrir la modal de comentarios
    enlaceLeerMas.addEventListener('click', (event) => {
        event.preventDefault();
        // Mostrar la modal
        const modal = document.getElementById('comentariosModal');
        modal.style.display = 'block'; // Muestra la modal
        cargarComentarios(); // Cargar comentarios si tienes esta función
    });
    
    // Cerrar la modal cuando se hace clic en el botón de cerrar
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        const modal = document.getElementById('comentariosModal');
        modal.style.display = 'none'; // Oculta la modal
    });
    
    // Cerrar la modal si se hace clic fuera de la modal
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('comentariosModal');
        if (event.target === modal) {
            modal.style.display = 'none'; // Oculta la modal
        }
    });
    cuerpoTarjeta.appendChild(nuevoTitulo);
    cuerpoTarjeta.appendChild(nuevaDescripcion);
    cuerpoTarjeta.appendChild(enlaceLeerMas);

    nuevaTarjeta.appendChild(nuevaImagen);
    nuevaTarjeta.appendChild(cuerpoTarjeta);

    contenedorPublicaciones.appendChild(nuevaTarjeta);
}