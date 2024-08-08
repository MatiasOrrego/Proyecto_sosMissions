document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const btnLoginRegister = document.getElementById('btn-lr');
  
  if (token) {
      btnLoginRegister.innerHTML = `<a href='' id='logout'>Cerrar Sesión</a>`;

      document.getElementById('logout').addEventListener('click', (event) => {
          event.preventDefault(); // Previene el comportamiento por defecto del enlace
          localStorage.removeItem('token');
          window.location.reload();
      });
  }
});

// Mostrar modal para agregar publicación
document.addEventListener("DOMContentLoaded", () => {
  const addPostBtn = document.getElementById('addPostBtn');
  const addPostModal = new bootstrap.Modal(document.getElementById('addPostModal'));
  const agregarPublicacionBtn = document.getElementById('agregar-publicacion-btn');
  const nuevaPublicacionForm = document.getElementById('nueva-publicacion-form');
  const alertPlaceholder = document.createElement('div');
  document.querySelector('main').insertBefore(alertPlaceholder, document.querySelector('main').firstChild);

  // Función para mostrar alertas
  function showAlert(message, type = 'danger') {
      alertPlaceholder.innerHTML = `
          <div class="alert alert-${type}" role="alert">
              ${message}
          </div>
      `;
      setTimeout(() => alertPlaceholder.innerHTML = '', 3000); // Ocultar alerta después de 3 segundos
  }

  // Verificar si el usuario está registrado
  function isUserRegistered() {
      return localStorage.getItem('token') !== null;
  }

  // Manejar el clic en el botón de agregar publicación
  addPostBtn.addEventListener('click', () => {
      if (isUserRegistered()) {
          addPostModal.show();
      } else {
          showAlert('Debes estar registrado para agregar una publicación.');
      }
  });

  // Manejar el clic en el botón de agregar publicación en el modal
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

              // Limpiar el formulario y cerrar el modal
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

// Función para crear una nueva tarjeta de publicación
function crearNuevaPublicacion(titulo, descripcion, imagenSrc) {
  const contenedorPublicaciones = document.querySelector('.card-group');

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
