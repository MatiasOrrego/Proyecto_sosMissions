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
    descriptionContainer.innerHTML = post.description; // Usar innerHTML para renderizar el contenido HTML del editor Quill
    
    // Crear botón de volver
    const backButton = document.createElement('button');
    backButton.classList.add('btn', 'btn-primary', 'mt-4');
    backButton.textContent = 'Volver';
    backButton.addEventListener('click', () => {
      location.reload(); // Recargar la página para volver a la vista de tarjetas
    });
    
    // Agregar los elementos al contenedor
    postContainer.appendChild(titleElement);
    postContainer.appendChild(descriptionContainer);
    postContainer.appendChild(backButton);
    
    // Agregar el contenedor al main
    mainContainer.appendChild(postContainer);
    
  } catch (error) {
    console.error('Error al cargar la publicación:', error);
  }
};

// Función modificada para crear una nueva tarjeta de publicación
function crearNuevaPublicacion(titulo, descripcion, postId) {
  const contenedorPublicaciones = document.getElementById('publicaciones');

  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.classList.add('card-publi');
  
  // Hacer que toda la tarjeta sea clickeable
  nuevaTarjeta.style.cursor = 'pointer';
  nuevaTarjeta.addEventListener('click', () => {
    cargarPublicacionCompleta(postId);
  });

  const nuevaImagen = document.createElement('img');
  nuevaImagen.classList.add('card-img-top', 'cardImg');
  nuevaImagen.src = '../src/assets/img/fuego-100.jpg';

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

// Obtener publicaciones y generar tarjetas
fetch('http://localhost:3000/post/category/4')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((post) => {
      crearNuevaPublicacion(post.title, post.description, post.id);
    });
  })
  .catch((error) => {
    console.error('Error al obtener las publicaciones:', error);
  });

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
      
      // Crear botón de volver
      const backButton = document.createElement('button');
      backButton.classList.add('btn', 'btn-primary', 'mt-4');
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
    
    // Hacer que toda la tarjeta sea clickeable
    nuevaTarjeta.style.cursor = 'pointer';
    nuevaTarjeta.addEventListener('click', () => {
      cargarVideoCompleto(videoId);
    });
  
    const nuevaImagen = document.createElement('img');
    nuevaImagen.classList.add('card-img-top', 'cardImg');
    nuevaImagen.src = '../src/assets/img/fuego-100.jpg';
  
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
  fetch('http://localhost:3000/video/category/4')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((video) => {
        crearNuevoVideo(video.title, video.description, video.id);
      });
    })
    .catch((error) => {
      console.error('Error al obtener todos los videos:', error);
    });