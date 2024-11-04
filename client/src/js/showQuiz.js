function crearNuevoQuiz(titulo, descripcion, id) {
  const contenedorPublicaciones = document.getElementById('quiz');

  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.classList.add('card-publi');
  nuevaTarjeta.onclick = () => cargarPreguntas(id); // Agrega el evento de clic

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

  // Añadir todo al cuerpo de la tarjeta
  cuerpoTarjeta.appendChild(nuevoTitulo);
  cuerpoTarjeta.appendChild(nuevaDescripcion);
  cuerpoTarjeta.appendChild(enlaceLeerMas);

  nuevaTarjeta.appendChild(nuevaImagen);
  nuevaTarjeta.appendChild(cuerpoTarjeta);
  contenedorPublicaciones.appendChild(nuevaTarjeta);
}

function cargarPreguntas(quizId) {
  const contenedorPublicaciones = document.getElementById('quiz');

  // Limpiar el contenedor de publicaciones y videos
  contenedorPublicaciones.innerHTML = '';
  document.getElementById('publicaciones-contenedor').innerHTML = '';
  document.getElementById('videos-contenedor').innerHTML = '';

  // Fetch para obtener preguntas
  fetch(`http://localhost:3000/question/${quizId}`) // Asegúrate de que el endpoint es correcto
    .then((response) => response.json())
    .then((preguntas) => {
      mostrarPregunta(preguntas, 0); // Cambia esta línea para usar el nuevo formato
    })
    .catch((error) => {
      console.error('Error al obtener las preguntas', error);
    });
}

function mostrarPregunta(preguntas, index) {
  const contenedorPublicaciones = document.getElementById('quiz');

  if (index < preguntas.length) {
    const preguntaActual = preguntas[index];

    const preguntaDiv = document.createElement('div');
    preguntaDiv.classList.add('pregunta');

    const textoPregunta = document.createElement('h5');
    textoPregunta.textContent = preguntaActual.content;
    preguntaDiv.appendChild(textoPregunta);

    preguntaActual.options.forEach((opcion) => {
      const botonOpcion = document.createElement('button');
      botonOpcion.classList.add('btn', 'btn-outline-primary', 'm-2');
      botonOpcion.textContent = opcion.description;
      
      botonOpcion.onclick = () => {
        // Mostrar todas las respuestas correctas en verde
        preguntaActual.options.forEach((opt) => {
          const boton = Array.from(preguntaDiv.getElementsByTagName('button'))
            .find(btn => btn.textContent === opt.description);
            
          if (opt.status) {
            // Si es una opción correcta, siempre se muestra en verde
            boton.classList.remove('btn-outline-primary');
            boton.classList.add('btn-success');
          } else if (boton === botonOpcion) {
            // Si es la opción seleccionada y es incorrecta, mostrar en rojo
            boton.classList.remove('btn-outline-primary');
            boton.classList.add('btn-danger');
          }
        });

        // Deshabilitar todos los botones después de la selección
        const botones = preguntaDiv.getElementsByTagName('button');
        Array.from(botones).forEach(btn => {
          btn.disabled = true;
          // Remover el estilo de hover para botones deshabilitados
          btn.classList.remove('btn-outline-primary');
        });
        
        // Esperar un segundo antes de mostrar la siguiente pregunta
        setTimeout(() => {
          mostrarPregunta(preguntas, index + 1);
        }, 1000);
      };
      
      preguntaDiv.appendChild(botonOpcion);
    });

    contenedorPublicaciones.appendChild(preguntaDiv);
  } else {
    // Mostrar mensaje de finalización
    const mensajeFin = document.createElement('h5');
    mensajeFin.textContent = '¡Gracias por responder!';
    contenedorPublicaciones.appendChild(mensajeFin);
  }
}


// Obtener publicaciones y generar tarjetas
fetch('http://localhost:3000/quiz/general')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((quiz) => {
      crearNuevoQuiz(quiz.title, quiz.description, quiz.id);
    });
  })
  .catch((error) => {
    console.error('Error al obtener todos los cuestionarios', error);
  });