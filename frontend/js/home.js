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
    const addPostBtn = document.getElementById('addPostBtn');
    const addPostModal = new bootstrap.Modal(document.getElementById('addPostModal'));
    const agregarPublicacionBtn = document.getElementById('agregar-publicacion-btn');
    const nuevaPublicacionForm = document.getElementById('nueva-publicacion-form');
    const alertPlaceholder = document.createElement('div');
    document.querySelector('main').insertBefore(alertPlaceholder, document.querySelector('main').firstChild);

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

    addPostBtn.addEventListener('click', () => {
        if (isUserRegistered()) {
            addPostModal.show();
        } else {
            showAlert('Debes estar registrado para agregar una publicación.');
        }
    });

    agregarPublicacionBtn.addEventListener('click', () => {
        if (isUserRegistered()) {
            const titulo = document.getElementById('titulo').value;
            const descripcion = document.getElementById('descripcion').value;
            const imagen = document.getElementById('imagen').files[0];

            if (titulo && descripcion) {
                if (imagen) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        crearNuevaPublicacion(titulo, descripcion, e.target.result);
                    };
                    reader.readAsDataURL(imagen);
                } else {
                    crearNuevaPublicacion(titulo, descripcion);
                }

                nuevaPublicacionForm.reset();
                addPostModal.hide();
            } else {
                showAlert('Por favor, completa todos los campos.');
            }
        } else {
            showAlert('Debes estar registrado para agregar una publicación.');
        }
    });
  });

  function crearNuevaPublicacion(titulo, descripcion, imagenSrc) {
    const contenedorPublicaciones = document.querySelector('.card-group');

    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('card-publi');

    const nuevaImagen = document.createElement('img');
    nuevaImagen.classList.add('card-img-top', 'cardImg');
    nuevaImagen.src = imagenSrc || '/path/to/default/image.jpg';

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
    nuevaTarjeta.appendChild(cuerpoTarjeta);

    contenedorPublicaciones.appendChild(nuevaTarjeta);
  }
