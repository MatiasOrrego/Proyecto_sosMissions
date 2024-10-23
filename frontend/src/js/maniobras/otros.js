// Función para cargar comentarios de una publicación específica
const cargarComentarios = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/post/${postId}/comment`,
        { credentials: 'include' },
      );
      if (!response.ok) {
        throw new Error('Error al obtener los comentarios');
      }
      const comments = await response.json();
  
      const modal = document.getElementById('comentariosModal');
      modal.dataset.postId = postId;
  
      // Limpiar el contenedor de comentarios antes de agregar nuevos
      const comentariosContainer = document.querySelector(
        '.comentarios-container',
      );
      comentariosContainer.innerHTML = '';
  
      // Añadir los comentarios al contenedor
      comments.forEach((comment) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
  
                <p>${comment.text}</p>
                <small>Publicado el: ${new Date(
                  comment.fecha_comentario,
                ).toLocaleDateString()}</small>
            `;
        comentariosContainer.appendChild(commentElement);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  // Función para crear una nueva tarjeta de publicación
  function crearNuevaPublicacion(titulo, descripcion, postId) {
    const contenedorPublicaciones = document.getElementById('publicaciones');
  
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
  
    // Contenedor para las estrellas
    const contenedorEstrellas = document.createElement('div');
    contenedorEstrellas.classList.add('star-rating');
  
    // Variable para guardar la calificación seleccionada
    let calificacion = 0;
  
    // Crear 5 estrellas utilizando SVG
    for (let i = 1; i <= 5; i++) {
      const estrella = document.createElement('span');
      estrella.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>`;
  
      // Añadir clases para las estrellas activas y desactivadas
      estrella.classList.add('star');
  
      // Evento para manejar la selección de la calificación
      estrella.addEventListener('click', () => {
        calificacion = i; // Guardar la calificación seleccionada
        actualizarEstrellas(i); // Actualizar la interfaz visualmente
      });
  
      contenedorEstrellas.appendChild(estrella);
    }
  
    // Función para actualizar las estrellas visualmente
    function actualizarEstrellas(puntuacion) {
      const estrellas = contenedorEstrellas.querySelectorAll('.star');
      estrellas.forEach((estrella, index) => {
        if (index < puntuacion) {
          // Cambiar el color a las estrellas seleccionadas
          estrella.firstElementChild.setAttribute('fill', 'gold');
        } else {
          // Restablecer el color de las estrellas no seleccionadas
          estrella.firstElementChild.setAttribute('fill', 'currentColor');
        }
      });
    }
  
    // Añadir evento al enlace para abrir la modal de comentarios
    enlaceLeerMas.addEventListener('click', (event) => {
      event.preventDefault();
      const modal = document.getElementById('comentariosModal');
      modal.style.display = 'block'; // Muestra la modal
      cargarComentarios(postId);
    });
  
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
  
    // Añadir todo al cuerpo de la tarjeta
    cuerpoTarjeta.appendChild(nuevoTitulo);
    cuerpoTarjeta.appendChild(nuevaDescripcion);
    cuerpoTarjeta.appendChild(contenedorEstrellas); // Añadir estrellas
    cuerpoTarjeta.appendChild(enlaceLeerMas);
  
    nuevaTarjeta.appendChild(nuevaImagen);
    nuevaTarjeta.appendChild(cuerpoTarjeta);
    contenedorPublicaciones.appendChild(nuevaTarjeta);
  }
  
  // Obtener publicaciones y generar tarjetas
  fetch('http://localhost:3000/post/category/6')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        crearNuevaPublicacion(post.title, post.description, post.id);
      });
    })
    .catch((error) => {
      console.error('Error al obtener las publicaciones:', error);
    });
  
  // Función para agregar un nuevo comentario
  document.getElementById('btnEnviarComentario').addEventListener('click', () => {
    const nuevoComentario = document.getElementById('nuevoComentario').value;
    const postId = document.getElementById('comentariosModal').dataset.postId; // Asegúrate de tener el postId disponible
  
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
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar el comentario');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Comentario agregado:', data);
  
        // Recargar los comentarios para reflejar el nuevo
        cargarComentarios(postId);
        document.getElementById('nuevoComentario').value = '';
      })
      .catch((error) => {
        console.error('Error al agregar el comentario:', error);
      });
  });
  