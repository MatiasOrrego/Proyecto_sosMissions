// Función para cargar y mostrar una publicación específica
const cargarPublicacionCompleta = async (postId) => {
  try {
    const response = await fetch(`http://localhost:3000/post/${postId}`, {
      credentials: "include"
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener la publicación');
    }
    
    const post = await response.json();
    
    // Limpiar el contenedor principal
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';
    
    // Crear el contenedor para la publicación completa
    const postContainer = document.createElement('div');
    postContainer.classList.add('container', 'post-detail-container', 'mt-5', 'pt-5');
    
    // Crear el título
    const titleElement = document.createElement('h1');
    titleElement.classList.add('text-center', 'mb-4');
    titleElement.textContent = post.title;
    
    // Crear el contenedor para la descripción
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container', 'mt-4');
    descriptionContainer.innerHTML = post.description;

    // Crear el contenedor para el sistema de rating
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('rating-container', 'my-4', 'text-center');

    // Crear las estrellas
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container', 'd-flex', 'justify-content-center', 'gap-2');

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16" style="cursor: pointer">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>
      `;
      star.classList.add('star');
      
      // Añadir evento hover
      star.addEventListener('mouseover', () => {
        // Rellenar esta estrella y todas las anteriores
        const stars = starsContainer.children;
        for (let j = 0; j < stars.length; j++) {
          if (j <= i - 1) {
            stars[j].querySelector('svg').classList.add('text-warning');
          } else {
            stars[j].querySelector('svg').classList.remove('text-warning');
          }
        }
      });

      // Añadir evento click
      star.addEventListener('click', async () => {
        try {
          const response = await fetch(`http://localhost:3000/rating/${postId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ rating: i }),
          });

          if (response.ok) {
            // Mantener las estrellas seleccionadas
            const stars = starsContainer.children;
            for (let j = 0; j < stars.length; j++) {
              if (j <= i - 1) {
                stars[j].querySelector('svg').classList.add('text-warning');
                stars[j].style.pointerEvents = 'none'; // Deshabilitar interacción
              }
            }
          }
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.textContent = '¡Gracias por tu valoración!';
            successMessage.classList.add('text-success', 'mt-2');
            ratingContainer.appendChild(successMessage);
            
            // Deshabilitar el contenedor de estrellas
            starsContainer.style.pointerEvents = 'none';
        } catch (error) {
          console.error('Error al enviar la valoración:', error);
        }
      });

      starsContainer.appendChild(star);
    }

    // Añadir evento mouseleave al contenedor de estrellas
    starsContainer.addEventListener('mouseleave', () => {
      // Si no hay valoración seleccionada, quitar todas las estrellas
      if (!starsContainer.style.pointerEvents) {
        const stars = starsContainer.children;
        for (let star of stars) {
          star.querySelector('svg').classList.remove('text-warning');
        }
      }
    });

    ratingContainer.appendChild(starsContainer);

    // Crear sección de comentarios
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section', 'mt-5');

    // Crear formulario para nuevo comentario
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form', 'mb-4');
    commentForm.innerHTML = `
      <div class="mb-3">
        <label for="newComment" class="form-label">Agregar un comentario</label>
        <textarea class="form-control" id="newComment" rows="3" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Publicar comentario</button>
    `;

    // Manejar el envío del comentario
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const commentText = document.getElementById('newComment').value;
      
      try {
        const response = await fetch(`http://localhost:3000/post/${postId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ text: commentText })
        });

        if (!response.ok) throw new Error('Error al publicar el comentario');

        // Limpiar el textarea
        document.getElementById('newComment').value = '';
        
        // Recargar los comentarios
        await loadComments();
      } catch (error) {
        console.error('Error:', error);
        alert('Error al publicar el comentario');
      }
    });

    // Contenedor para la lista de comentarios
    const commentsList = document.createElement('div');
    commentsList.classList.add('comments-list', 'mt-4');
    commentsList.innerHTML = '<h4 class="mb-3">Comentarios</h4>';

    // Función para cargar los comentarios
    const loadComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/post/${postId}/comment`, {
          credentials: 'include',
        });
    
        if (!response.ok) throw new Error('Error al cargar los comentarios');
    
        const comments = await response.json();
    
        // Limpiar la lista de comentarios existente
        const commentsContainer = commentsList.querySelector('.comments-container') || document.createElement('div');
        commentsContainer.className = 'comments-container';
        commentsContainer.innerHTML = '';
    
        if (comments.length === 0) {
          commentsContainer.innerHTML = '<p class="text-muted">No hay comentarios aún.</p>';
        } else {
          comments.forEach((comment) => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment', 'card', 'mb-3');
            commentElement.innerHTML = `
              <div class="card-body">
                <h6 class="card-title font-weight-bold">${comment.username}</h6>
                <p class="card-text">${comment.text}</p>
                <small class="text-muted">
                  ${new Date(comment.fecha_comentario).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
              </div>
            `;
            commentsContainer.appendChild(commentElement);
          });
        }
    
        // Si el contenedor de comentarios no está en el DOM, agregarlo
        if (!commentsList.querySelector('.comments-container')) {
          commentsList.appendChild(commentsContainer);
        }
      } catch (error) {
        console.error('Error al cargar los comentarios:', error);
        commentsList.innerHTML += '<p class="text-danger">Error al cargar los comentarios.</p>';
      }
    };
    

    // Cargar comentarios iniciales
    await loadComments();

    // Crear botón de volver
    const backButton = document.createElement('button');
    backButton.classList.add('btn', 'btn-primary', 'mt-4', 'mb-4', 'btn-back');
    backButton.textContent = 'Volver';
    backButton.addEventListener('click', () => {
      location.reload();
    });
    
    // Agregar los elementos al contenedor
    postContainer.appendChild(titleElement);
    postContainer.appendChild(descriptionContainer);
    commentsSection.appendChild(commentForm);
    commentsSection.appendChild(commentsList);
    postContainer.appendChild(starsContainer);
    postContainer.appendChild(commentsSection);
    postContainer.appendChild(backButton);
    
    // Agregar el contenedor al main
    mainContainer.appendChild(postContainer);
    
  } catch (error) {
    console.error('Error al cargar la publicación:', error);
  }
};

async function eliminarPublicacion(postId, element) {
  if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
    try {
      const response = await fetch(`http://localhost:3000/post/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        element.remove();
      } else {
        alert('Error al eliminar la publicación');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la publicación');
    }
  }
}

function editarPublicacion(postId) {
  window.location.href = `edit-post.html?id=${postId}`;
}

// Función modificada para crear una nueva tarjeta de publicación
// Función para extraer texto de párrafos y truncarlo
function extractAndTruncateDescription(htmlContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const paragraphs = doc.getElementsByTagName('p');
  
  if (paragraphs.length === 0) return null;
  
  const text = paragraphs[0].textContent;
  return text.length > 120 ? text.substring(0, 120) + '...' : text;
}

// Actualizar la función crearNuevaPublicacion
function crearNuevaPublicacion(titulo, descripcion, postId) {
  const contenedorPublicaciones = document.getElementById('publicaciones');
  const descripcionTruncada = extractAndTruncateDescription(descripcion);

  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.classList.add('card-publi');

  const nuevaImagen = document.createElement('img');
  nuevaImagen.classList.add('card-img-top', 'cardImg');
  nuevaImagen.src = './imh-maniobras-emergencia.png';

  const cuerpoTarjeta = document.createElement('div');
  cuerpoTarjeta.classList.add('card-body');

  const nuevoTitulo = document.createElement('h5');
  nuevoTitulo.classList.add('card-title-publi');
  nuevoTitulo.textContent = titulo;

  const nuevaDescripcion = document.createElement('p');
  nuevaDescripcion.classList.add('card-text');
  nuevaDescripcion.textContent = descripcionTruncada;

  const contenedorEstrellas = document.createElement('div');
  contenedorEstrellas.classList.add('star-rating');

  // Crear 5 estrellas utilizando SVG
  for (let i = 1; i <= 5; i++) {
    const estrella = document.createElement('span');
    estrella.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>`;
    estrella.classList.add('star');
    contenedorEstrellas.appendChild(estrella);
  }

  // Crear contenedor para los botones
  const botonesContainer = document.createElement('div');
  botonesContainer.classList.add('botones-container');

  // Botón de editar
  const botonEditar = document.createElement('button');
  botonEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
  botonEditar.innerHTML = '<i class="fas fa-edit me-1"></i>Editar';
  botonEditar.addEventListener('click', (e) => {
    e.stopPropagation();
    editarPublicacion(postId);
  });

  // Botón de eliminar
  const botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
  botonEliminar.innerHTML = '<i class="fas fa-trash me-1"></i>Eliminar';
  botonEliminar.addEventListener('click', (e) => {
    e.stopPropagation();
    eliminarPublicacion(postId, nuevaTarjeta);
  });

  botonesContainer.appendChild(botonEditar);
  botonesContainer.appendChild(botonEliminar);

  // Añadir todo al cuerpo de la tarjeta
  cuerpoTarjeta.appendChild(nuevoTitulo);
  cuerpoTarjeta.appendChild(nuevaDescripcion);
  cuerpoTarjeta.appendChild(contenedorEstrellas);
  cuerpoTarjeta.appendChild(botonesContainer);

  nuevaTarjeta.appendChild(nuevaImagen);
  nuevaTarjeta.appendChild(cuerpoTarjeta);

  // Agregar evento de clic para ver la publicación completa
  nuevaTarjeta.addEventListener('click', () => {
    cargarPublicacionCompleta(postId);
  });

  contenedorPublicaciones.appendChild(nuevaTarjeta);
}

// Obtener publicaciones y generar tarjetas
fetch('http://localhost:3000/post', {
  credentials: 'include',
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((post) => {
      crearNuevaPublicacion(post.title, post.description, post.id);
    });
  })
  .catch((error) => {
    console.error('Error al obtener las publicaciones:', error);
  });

async function eliminarVideo(videoId, element) {
  if (confirm('¿Estás seguro de que deseas eliminar este video?')) {
    try {
      const response = await fetch(`http://localhost:3000/video/${videoId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        element.remove();
      } else {
        alert('Error al eliminar el video');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el video');
    }
  }
}

function editarVideo(videoId) {
  window.location.href = `edit-video.html?id=${videoId}`;
}

const cargarVideoCompleto = async (videoId) => {
  try {
    const response = await fetch(`http://localhost:3000/video/${videoId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al obtener el video');
    }

    const video = await response.json();

    // Limpiar el contenedor principal
    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';

    // Crear el contenedor para el video completo
    const videoContainer = document.createElement('div');
    videoContainer.classList.add(
      'container',
      'video-detail-container',
      'mt-5',
      'pt-5',
    );

    // Crear el título
    const titleElement = document.createElement('h1');
    titleElement.classList.add('text-center', 'mb-4');
    titleElement.textContent = video.title;

    // Crear el contenedor del video
    const videoPlayerContainer = document.createElement('div');
    videoPlayerContainer.classList.add('video-player-wrapper', 'mb-4');

    // Crear el iframe para el video
    const videoPlayer = document.createElement('iframe');
    videoPlayer.classList.add('video-player');
    videoPlayer.src = video.video;
    videoPlayer.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    videoPlayer.allowFullscreen = true;

    // Crear el contenedor para la descripción
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container', 'mt-4');
    descriptionContainer.innerHTML = video.description;

    // Crear botón de volver
    const backButton = document.createElement('button');
    backButton.classList.add('btn', 'btn-primary', 'mt-4', 'btn-back');
    backButton.textContent = 'Volver';
    backButton.addEventListener('click', () => {
      location.reload();
    });

    // Agregar los elementos al contenedor
    videoPlayerContainer.appendChild(videoPlayer);
    videoContainer.appendChild(titleElement);
    videoContainer.appendChild(videoPlayerContainer);
    videoContainer.appendChild(descriptionContainer);
    videoContainer.appendChild(backButton);

    // Agregar el contenedor al main
    mainContainer.appendChild(videoContainer);
  } catch (error) {
    console.error('Error al cargar el video:', error);
  }
};

// Función modificada para crear una nueva tarjeta de video
function crearNuevoVideo(titulo, descripcion, videoId) {
  const contenedorPublicaciones = document.getElementById('videos');

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
  nuevaDescripcion.classList.add('card-text-publi');
  nuevaDescripcion.textContent = descripcion;

  const contenedorEstrellas = document.createElement('div');
  contenedorEstrellas.classList.add('star-rating');

  // Crear 5 estrellas utilizando SVG
  for (let i = 1; i <= 5; i++) {
    const estrella = document.createElement('span');
    estrella.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
            </svg>`;
    estrella.classList.add('star');
    contenedorEstrellas.appendChild(estrella);
  }

  // Crear contenedor para los botones
  const botonesContainer = document.createElement('div');
  botonesContainer.classList.add('botones-container');

  // Botón de editar
  const botonEditar = document.createElement('button');
  botonEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
  botonEditar.innerHTML = '<i class="fas fa-edit me-1"></i>Editar';
  botonEditar.addEventListener('click', (e) => {
    e.stopPropagation();
    editarPublicacion(videoId);
  });

  // Botón de eliminar
  const botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
  botonEliminar.innerHTML = '<i class="fas fa-trash me-1"></i>Eliminar';
  botonEliminar.addEventListener('click', (e) => {
    e.stopPropagation();
    eliminarPublicacion(videoId, nuevaTarjeta);
  });

  botonesContainer.appendChild(botonEditar);
  botonesContainer.appendChild(botonEliminar);

  // Añadir todo al cuerpo de la tarjeta
  cuerpoTarjeta.appendChild(nuevoTitulo);
  cuerpoTarjeta.appendChild(nuevaDescripcion);
  cuerpoTarjeta.appendChild(contenedorEstrellas);
  cuerpoTarjeta.appendChild(botonesContainer);

  nuevaTarjeta.appendChild(nuevaImagen);
  nuevaTarjeta.appendChild(cuerpoTarjeta);

  // Agregar evento de clic para ver el video completo
  nuevaTarjeta.addEventListener('click', () => {
    cargarVideoCompleto(videoId);
  });

  contenedorPublicaciones.appendChild(nuevaTarjeta);
}


// Obtener videos y generar tarjetas
fetch('http://localhost:3000/video', {
  credentials: 'include',
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((video) => {
      crearNuevoVideo(video.title, video.description, video.id);
    });
  })
  .catch((error) => {
    console.error('Error al obtener todos los videos:', error);
  });

async function eliminarQuiz(quizId, element) {
  if (confirm('¿Estás seguro de que deseas eliminar este cuestionario?')) {
    try {
      const response = await fetch(`http://localhost:3000/quiz/${quizId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        element.remove();
      } else {
        alert('Error al eliminar el cuestionario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el cuestionario');
    }
  }
}

function crearNuevoQuiz(titulo, descripcion, id) {
  const contenedorPublicaciones = document.getElementById('quiz');

  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.classList.add('card-publi', 'col-md-4', 'mb-4');

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

  const botonesContainer = document.createElement('div');
  botonesContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-3');

  const enlaceLeerMas = document.createElement('button');
  enlaceLeerMas.classList.add('btn', 'btn-primary', 'btn-sm');
  enlaceLeerMas.innerHTML = '<i class="fas fa-play me-1"></i>Comenzar Quiz';
  enlaceLeerMas.onclick = () => cargarPreguntas(id);

  // Botón de eliminar
  const botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
  botonEliminar.innerHTML = '<i class="fas fa-trash me-1"></i>Eliminar';
  botonEliminar.addEventListener('click', (e) => {
    e.stopPropagation();
    eliminarQuiz(id, nuevaTarjeta);
  });

  botonesContainer.appendChild(enlaceLeerMas);
  botonesContainer.appendChild(botonEliminar);

  cuerpoTarjeta.appendChild(nuevoTitulo);
  cuerpoTarjeta.appendChild(nuevaDescripcion);
  cuerpoTarjeta.appendChild(botonesContainer);

  nuevaTarjeta.appendChild(nuevaImagen);
  nuevaTarjeta.appendChild(cuerpoTarjeta);
  contenedorPublicaciones.appendChild(nuevaTarjeta);
}

function cargarPreguntas(quizId) {
  const contenedorPublicaciones = document.getElementById('quiz');
  const publicacionesContenedor = document.getElementById(
    'publicaciones-contenedor',
  );
  const videosContenedor = document.getElementById('videos-contenedor');
  const cuestionariosContenedor = document.getElementById(
    'cuestionarios-contenedor',
  );

  publicacionesContenedor.style.display = 'none';
  videosContenedor.style.display = 'none';

  contenedorPublicaciones.innerHTML = '';
  cuestionariosContenedor.className = 'container quiz-active-container';

  fetch(`http://localhost:3000/question/${quizId}`)
    .then((response) => response.json())
    .then((preguntas) => {
      mostrarPregunta(preguntas, 0);
    })
    .catch((error) => {
      console.error('Error al obtener las preguntas', error);
    });
}

let totalScore = 0;

function mostrarPregunta(preguntas, index) {
  const contenedorPublicaciones = document.getElementById('quiz');
  contenedorPublicaciones.innerHTML = '';

  if (index < preguntas.length) {
    const preguntaActual = preguntas[index];

    const preguntaDiv = document.createElement('div');
    preguntaDiv.classList.add('pregunta-card');

    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');

    const timerCircle = document.createElement('div');
    timerCircle.classList.add('timer-circle');

    const timerNumber = document.createElement('div');
    timerNumber.classList.add('timer-number');
    timerNumber.textContent = '20';

    timerCircle.appendChild(timerNumber);
    timerContainer.appendChild(timerCircle);
    preguntaDiv.appendChild(timerContainer);

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress', 'mb-3');
    progressBar.innerHTML = `  
                <div class="progress-bar" role="progressbar" 
                     style="width: ${((index + 1) / preguntas.length) * 100}%" 
                      aria-valuenow="${index + 1}" 
                      aria-valuemin="0" 
                      aria-valuemax="${preguntas.length}">
                  Pregunta ${index + 1} de ${preguntas.length}
                </div>
              `;
    preguntaDiv.appendChild(progressBar);

    const textoPregunta = document.createElement('h4');
    textoPregunta.classList.add('pregunta-texto', 'mb-4');
    textoPregunta.textContent = preguntaActual.content;
    preguntaDiv.appendChild(textoPregunta);

    const opcionesContainer = document.createElement('div');
    opcionesContainer.classList.add('opciones-container');

    let timeLeft = 20;
    let questionScore = 1000;
    let timerId = null;

    const startTimer = () => {
      timerCircle.style.setProperty('--progress', '1');
      timerId = setInterval(() => {
        timeLeft--;
        questionScore = Math.max(0, 1000 - 50 * (20 - timeLeft));
        timerNumber.textContent = timeLeft;
        timerCircle.style.setProperty('--progress', timeLeft / 20);

        if (timeLeft <= 5) {
          timerCircle.classList.add('timer-warning');
        }

        if (timeLeft <= 0) {
          clearInterval(timerId);
          mostrarRespuestaCorrecta();
          setTimeout(() => {
            mostrarPregunta(preguntas, index + 1);
          }, 1500);
        }
      }, 1000);
    };

    const mostrarRespuestaCorrecta = () => {
      const botones = opcionesContainer.getElementsByTagName('button');
      Array.from(botones).forEach((btn) => {
        btn.disabled = true;
        btn.classList.add('disabled');

        const esCorrecta = preguntaActual.options.find(
          (opt) => opt.description === btn.textContent,
        ).status;

        if (esCorrecta) {
          btn.classList.add('correcta');
        }
      });
    };

    preguntaActual.options.forEach((opcion) => {
      const botonOpcion = document.createElement('button');
      botonOpcion.classList.add('opcion-btn');
      botonOpcion.textContent = opcion.description;

      botonOpcion.onclick = () => {
        clearInterval(timerId);

        const botones = opcionesContainer.getElementsByTagName('button');
        Array.from(botones).forEach((btn) => {
          btn.disabled = true;
          btn.classList.add('disabled');
        });

        const esCorrecta = opcion.status;
        if (esCorrecta) {
          totalScore += questionScore;
        }

        Array.from(botones).forEach((btn) => {
          const esEstaOpcion = btn.textContent === opcion.description;
          const esCorrectaOpcion = preguntaActual.options.find(
            (opt) => opt.description === btn.textContent,
          ).status;

          if (esCorrectaOpcion) {
            btn.classList.add('correcta');
          } else if (esEstaOpcion && !esCorrectaOpcion) {
            btn.classList.add('incorrecta');
          }
        });

        setTimeout(() => {
          mostrarPregunta(preguntas, index + 1);
        }, 1500);
      };

      opcionesContainer.appendChild(botonOpcion);
    });

    preguntaDiv.appendChild(opcionesContainer);
    contenedorPublicaciones.appendChild(preguntaDiv);

    setTimeout(startTimer, 100);
  } else {
    const finQuizDiv = document.createElement('div');
    finQuizDiv.classList.add('fin-quiz');

    const mensajeFin = document.createElement('h3');
    mensajeFin.textContent = `¡Quiz completado! Tu puntaje final es: ${totalScore}`;

    const botonVolver = document.createElement('button');
    botonVolver.classList.add('btn-volver');
    botonVolver.textContent = 'Volver a cuestionarios';
    botonVolver.onclick = () => {
      window.location.reload();
    };

    finQuizDiv.appendChild(mensajeFin);
    finQuizDiv.appendChild(botonVolver);
    contenedorPublicaciones.appendChild(finQuizDiv);
  }
}

fetch('http://localhost:3000/quiz', {
  credentials: 'include',
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((quiz) => {
      crearNuevoQuiz(quiz.title, quiz.description, quiz.id);
    });
  })
  .catch((error) => {
    console.error('Error al obtener todos los cuestionarios', error);
  });