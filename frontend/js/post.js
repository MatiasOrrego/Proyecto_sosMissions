// Función para cargar comentarios de una publicación específica
const cargarComentarios = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/post/${postId}/comment`);
      if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
      }
      const comments = await response.json();
  
      // Limpiar el contenedor de comentarios antes de agregar nuevos
      const comentariosContainer = document.querySelector('.comentarios-container');
      comentariosContainer.innerHTML = '';
  
      // Añadir los comentarios al contenedor
      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
          <p>${comment.text}</p>
          <small>Publicado el: ${new Date(comment.fecha_comentario).toLocaleDateString()}</small>
        `;
        comentariosContainer.appendChild(commentElement);
      });
    } catch (error) {
      console.error(error);
    }
  };
  

// Función para crear una nueva tarjeta de publicación
function crearNuevaPublicacion(titulo, descripcion, postId) {
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
  
      // Cargar comentarios de la publicación
      cargarComentarios(postId);
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

  fetch('http://localhost:3000/post', {credentials: "include"})
  .then(response => response.json())
  .then(data => {
    const contenedorPublicaciones = document.querySelector('.card-group');
    data.forEach(post => {
      crearNuevaPublicacion(post.title, post.description, post.id);
    });
  })
  .catch(error => {
    console.error('Error al obtener las publicaciones:', error);
  });

// Añadir este código en tu archivo post.js
document.getElementById('btnEnviarComentario').addEventListener('click', () => {
    const nuevoComentario = document.getElementById('nuevoComentario').value;
    const postId = window.location.pathname.split('/')[2]; // Ajusta el índice según tu estructura de URL


    if (nuevoComentario.trim() === '') {
        alert('El comentario no puede estar vacío.');
        return;
    }

    // Hacer la solicitud para crear un nuevo comentario
    fetch(`http://localhost:3000/post/${postId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: nuevoComentario, postId: postId }),
        credentials: "include"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar el comentario');
            }
            return response.json();
        })
        .then(data => {
            console.log('Comentario agregado:', data);

            cargarComentarios();
            document.getElementById('nuevoComentario').value = '';
        })
        .catch(error => {
            console.error('Error al agregar el comentario:', error);
        });
});
