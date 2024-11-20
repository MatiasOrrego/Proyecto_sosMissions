const cargarVideoCompleto = async (videoId) => {
  try {
    const response = await fetch(`http://localhost:3000/video/${videoId}`, {
      credentials: 'include'
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
    videoContainer.classList.add('container', 'video-detail-container', 'mt-5', 'pt-5');
    
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
    videoPlayer.src = video.video; // URL del video
    videoPlayer.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoPlayer.allowFullscreen = true;
    
    // Crear el contenedor para la descripción
    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('description-container', 'mt-4');
    descriptionContainer.innerHTML = video.description;

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
          const response = await fetch(`http://localhost:3000/rating/video/${videoId}`, {
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
        const response = await fetch(`http://localhost:3000/video/${videoId}/comment`, {
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
        const response = await fetch(`http://localhost:3000/video/${videoId}/comment`, {
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

    await loadComments();
    
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
    videoContainer.appendChild(starsContainer);
    commentsSection.appendChild(commentForm);
    commentsSection.appendChild(commentsList);
    videoContainer.appendChild(commentsSection);
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
  
  // Hacer que toda la tarjeta sea clickeable
  nuevaTarjeta.style.cursor = 'pointer';
  nuevaTarjeta.addEventListener('click', () => {
    cargarVideoCompleto(videoId);
  });

  const nuevaImagen = document.createElement('img');
  nuevaImagen.classList.add('card-img-top', 'cardImg');
  nuevaImagen.src = '../../assets/img/imh-maniobras-emergencia.png';

  const cuerpoTarjeta = document.createElement('div');
  cuerpoTarjeta.classList.add('card-body');

  const nuevoTitulo = document.createElement('h5');
  nuevoTitulo.classList.add('card-title-publi');
  nuevoTitulo.textContent = titulo;

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

  // Añadir todo al cuerpo de la tarjeta
  cuerpoTarjeta.appendChild(nuevoTitulo);
  cuerpoTarjeta.appendChild(contenedorEstrellas);

  nuevaTarjeta.appendChild(nuevaImagen);
  nuevaTarjeta.appendChild(cuerpoTarjeta);
  contenedorPublicaciones.appendChild(nuevaTarjeta);
}

// Obtener videos y generar tarjetas
fetch('http://localhost:3000/video/general')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((video) => {
      crearNuevoVideo(video.title, video.description, video.id);
    });
  })
  .catch((error) => {
    console.error('Error al obtener todos los videos:', error);
  });