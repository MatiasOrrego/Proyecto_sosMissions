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

// Función para cargar comentarios (si tienes una API)
function cargarComentarios() {
    fetch(`http://localhost:3000/comments`)
        .then(response => response.json())
        .then(comentarios => {
            const contenedorComentarios = document.getElementById('comentariosContainer'); // Asegúrate de que este ID sea correcto
            if (contenedorComentarios) {
                contenedorComentarios.innerHTML = ''; // Limpiar el contenedor antes de agregar comentarios

                comentarios.forEach(comentario => {
                    const comentarioDiv = document.createElement('div');
                    comentarioDiv.innerHTML = `<p>${comentario.texto} - <em>${comentario.fecha_comentario}</em></p>`;
                    contenedorComentarios.appendChild(comentarioDiv);
                });
            } else {
                console.error('El contenedor de comentarios no se encontró en el DOM');
            }
        })
        .catch(error => {
            console.error('Error al cargar comentarios:', error);
        });
}

// Manejar el evento de envío de comentario
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token'); // Asegúrate de que esto se defina en un contexto global o accesible
    const btnEnviarComentario = document.getElementById('btnEnviarComentario');

    // Aquí puedes agregar el event listener para el botón de enviar comentario
    if (btnEnviarComentario) {
        btnEnviarComentario.addEventListener('click', () => {
            const nuevoComentario = document.getElementById('nuevoComentario').value;

            // Verifica que el token exista
            if (!token) {
                console.error('No hay token de autenticación disponible');
                return;
            }

            // Enviar comentario a tu API
            fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ahora 'token' está definido
                },
                body: JSON.stringify({ post_id, user_id, text: nuevoComentario })
            })
            .then(response => response.json())
            .then(data => {
                const modal = document.getElementById('comentariosModal');
                modal.style.display = 'none'; // Ocultar la modal
                document.getElementById('nuevoComentario').value = '';
                cargarComentarios(post_id); // Recargar comentarios
            })
            .catch(error => {
                console.error('Error al enviar comentario:', error);
            });
        });
    }
});

