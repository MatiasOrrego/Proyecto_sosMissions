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
                crearNuevaPublicacion(post.title, post.description, post.image, post.video);
            });
        })
        .catch(error => {
            console.error('Error al obtener las publicaciones:', error);
        });
})

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

document.getElementById('addPostBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    
    // Obtener los valores del formulario
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenFile = document.getElementById('imagen').files[0];
    const videoFile = document.getElementById('video').files[0];
  
    // Crear un contenedor para la nueva publicación
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container', 'mb-4', 'p-3', 'border', 'postImg');
  
    // Crear el título
    const postTitle = document.createElement('h3');
    postTitle.textContent = titulo;
  
    // Crear la descripción
    const postDescription = document.createElement('p');
    postDescription.textContent = descripcion;
  
    // Crear la imagen si fue seleccionada
    let postImage = null;
    if (imagenFile) {
      postImage = document.createElement('img');
      postImage.src = URL.createObjectURL(imagenFile);
      postImage.classList.add('img-fluid', 'my-2');
      postImage.alt = 'Imagen de la publicación';
    }
  
    // Crear el video si fue seleccionado
    let postVideo = null;
    if (videoFile) {
      postVideo = document.createElement('video');
      postVideo.src = URL.createObjectURL(videoFile);
      postVideo.controls = true;
      postVideo.classList.add('video-fluid', 'my-2');
      postVideo.alt = 'Video de la publicación';
    }
  
    // Añadir los elementos al contenedor de la publicación
    postContainer.appendChild(postTitle);
    postContainer.appendChild(postDescription);
    if (postImage) postContainer.appendChild(postImage);
    if (postVideo) postContainer.appendChild(postVideo);
  
    // Añadir la publicación debajo del formulario
    const formContainer = document.querySelector('.contenedor-form');
    formContainer.appendChild(postContainer);
  
    // Limpiar los campos del formulario después de añadir la publicación
    document.getElementById('nueva-publicacion-form').reset();
  });
  