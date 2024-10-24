
const form = document.getElementById('post-category');

form.addEventListener('submit',async (e) => {
  e.preventDefault();

  const title = document.getElementById('titulo').value;
  const description = document.getElementById('descripcion').value;

  const category = document.getElementById('categories').value;
  console.log(category)

  const categoryId = parseInt(category)

  try {
    const response = await fetch('http://localhost:3000/video', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        title,
        description,
        categoryId
      })
    })
    if(!response.ok) {
        throw new Error('Error al crear la publicacion')
    } else {
      window.location.href = 'seccion-general.html'
    }
  } catch (error) {
    alert('Hubo un error al crear la publicacion')
  }
})


function crearNuevoVideo(titulo, descripcion) {
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
  fetch('http://localhost:3000/video/general')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((video) => {
        crearNuevoVideo(video.title, video.description, video.id);
      });
    })
    .catch((error) => {
      console.error('Error al obtener todos los videos', error);
    });