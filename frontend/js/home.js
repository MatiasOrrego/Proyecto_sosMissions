document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const btnLoginRegister = document.getElementById('btn-lr');
    const addPostBtn = document.getElementById('addPostBtn');
    const nuevaPublicacionForm = document.getElementById('nueva-publicacion-form');
    const alertPlaceholder = document.createElement('div');
    document.querySelector('main').insertBefore(alertPlaceholder, document.querySelector('main').firstChild);

    if (btnLoginRegister) {
        if (token) {
            btnLoginRegister.innerHTML = `<a href='' id='logout'>Cerrar Sesión</a>`;
            const logoutBtn = document.getElementById('logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    localStorage.removeItem('token');
                    window.location.reload();
                });
            }
        }
    }

    function showAlert(message, type = 'danger') {
        alertPlaceholder.innerHTML = `
            <div class="alert alert-${type}" role="alert">
                ${message}
            </div>
        `;
        setTimeout(() => alertPlaceholder.innerHTML = '', 3000);
    }

    function isUserRegistered() {
        return localStorage.getItem('token') !== null;
    }

    if (addPostBtn) {
        addPostBtn.addEventListener('click', () => {
            if (isUserRegistered()) {
                // Lógica para agregar publicación
            } else {
                showAlert('Debes estar registrado para agregar una publicación.');
            }
        });
    }

    if (nuevaPublicacionForm) {
        const agregarPublicacionBtn = document.getElementById('agregarPublicacionBtn');
        if (agregarPublicacionBtn) {
            agregarPublicacionBtn.addEventListener('click', () => {
                if (isUserRegistered()) {
                    const titulo = document.getElementById('titulo').value;
                    const descripcion = document.getElementById('descripcion').value;
                    const imagen = document.getElementById('imagen').files[0];
                    const video = document.getElementById('video').files[0];

                    if (titulo && descripcion && imagen && video) {
                        const formData = new FormData();
                        formData.append('title', titulo);
                        formData.append('description', descripcion);
                        formData.append('image', imagen);
                        formData.append('video', video);

                        fetch('http://localhost:3000/post', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`  // Enviar token de autenticación si es necesario
                            },
                            body: formData  // Usar FormData para enviar archivos
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error en la solicitud');
                            }
                            return response.json();
                        })
                        .then(data => {
                            crearNuevaPublicacion(data.title, data.description, data.image, data.video);
                            console.log('Publicación creada:', data);
                            nuevaPublicacionForm.reset();
                            // Asumiendo que addPostModal es una instancia de modal de Bootstrap
                            const addPostModal = bootstrap.Modal.getInstance(document.getElementById('addPostModal'));
                            if (addPostModal) {
                                addPostModal.hide();
                            }
                        })
                        .catch(error => {
                            console.error('Error al crear la publicación:', error);
                            showAlert('Hubo un error al crear la publicación.', 'danger');
                        });
                    } else {
                        showAlert('Por favor, completa todos los campos y selecciona una imagen.');
                    }
                } else {
                    showAlert('Debes estar registrado para agregar una publicación.');
                }
            });
        }
    }

    fetch('http://localhost:3000/post')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const contenedorPublicaciones = document.querySelector('.card-group');
            if (contenedorPublicaciones) {
                data.forEach(post => {
                    crearNuevaPublicacion(post.title, post.description, post.image, post.video);
                });
            }
        })
        .catch(error => {
            console.error('Error al obtener las publicaciones:', error);
        });
});

function crearNuevaPublicacion(titulo, descripcion, imagenSrc, video) {
    const contenedorPublicaciones = document.querySelector('.card-group');
    if (!contenedorPublicaciones) return;

    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('card-publi');

    const nuevaImagen = document.createElement('img');
    nuevaImagen.classList.add('card-img-top', 'cardImg');
    nuevaImagen.src = imagenSrc || '/path/to/default/image.jpg';

    const nuevoVideo = document.createElement('div');
    nuevoVideo.classList.add('card-video');

    const cuerpoTarjeta = document.createElement('div');
    cuerpoTarjeta.classList.add('card-body');

    const nuevoTitulo = document.createElement('h5');
    nuevoTitulo.classList.add('card-title-publi');
    nuevoTitulo.textContent = titulo;

    const nuevaDescripcion = document.createElement('p');
    nuevaDescripcion.classList.add('card-text-publi');
    nuevaDescripcion.textContent = descripcion;

    const enlaceLeerMas = document.createElement('a');
    enlaceLeerMas.classList.add('card-link');
    enlaceLeerMas.href = '#';
    enlaceLeerMas.textContent = 'Leer más';

    cuerpoTarjeta.appendChild(nuevoTitulo);
    cuerpoTarjeta.appendChild(nuevaDescripcion);
    cuerpoTarjeta.appendChild(enlaceLeerMas);
    nuevaTarjeta.appendChild(nuevaImagen);
    nuevaTarjeta.appendChild(nuevoVideo);
    nuevaTarjeta.appendChild(cuerpoTarjeta);

    contenedorPublicaciones.appendChild(nuevaTarjeta);
}