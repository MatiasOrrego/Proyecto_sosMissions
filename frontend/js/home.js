document.addEventListener('DOMContentLoaded', () => {
    
    const token = localStorage.getItem('token')

    if(!token){
    } else {
        document.getElementById('btn-lr').innerHTML = `
        <a href='' id='logout'>Cerrar Sesión</a>`

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token')

            window.location.reload()
        })
    }
})

// Seleccionar elementos del DOM
const formulario = document.getElementById('nueva-publicacion-form');
const btnAgregar = document.getElementById('agregar-publicacion-btn');
const contenedorPublicaciones = document.querySelector('.card-group');

// Función para crear una nueva tarjeta de publicación
function crearNuevaPublicacion(titulo, descripcion, imagenSrc) {
  // Crear la estructura de la tarjeta
  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.classList.add('card-publi');

  const nuevaImagen = document.createElement('img');
  nuevaImagen.classList.add('card-img-top', 'cardImg');
  nuevaImagen.src = imagenSrc || '/path/to/default/image.jpg'; // Reemplazar con una imagen predeterminada si no se sube una

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
  enlaceLeerMas.href = '#'; // Aquí puedes poner un enlace real si lo tienes
  enlaceLeerMas.textContent = 'Leer más';

  // Añadir elementos a la tarjeta
  cuerpoTarjeta.appendChild(nuevoTitulo);
  cuerpoTarjeta.appendChild(nuevaDescripcion);
  cuerpoTarjeta.appendChild(enlaceLeerMas);
  nuevaTarjeta.appendChild(nuevaImagen);
  nuevaTarjeta.appendChild(cuerpoTarjeta);

  // Añadir la nueva tarjeta al contenedor de publicaciones
  contenedorPublicaciones.appendChild(nuevaTarjeta);
}

// Manejar el clic del botón "Añadir Publicación"
btnAgregar.addEventListener('click', () => {
  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion').value;
  const imagen = document.getElementById('imagen').files[0];

  if (titulo && descripcion) {
    // Leer la imagen como DataURL si se ha subido una
    if (imagen) {
      const reader = new FileReader();
      reader.onload = function(e) {
        crearNuevaPublicacion(titulo, descripcion, e.target.result);
      };
      reader.readAsDataURL(imagen);
    } else {
      crearNuevaPublicacion(titulo, descripcion);
    }

    // Limpiar el formulario después de agregar la publicación
    formulario.reset();
  } else {
    alert('Por favor, completa todos los campos.');
  }
});

const addPostBtn = document.getElementById('addPostBtn');
const addPostModal = new bootstrap.Modal(document.getElementById('addPostModal'));

// Mostrar la modal al hacer clic en el botón flotante
addPostBtn.addEventListener('click', () => {
  addPostModal.show();
});