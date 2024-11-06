function crearNuevoQuiz(titulo, descripcion, id) {
  const contenedorPublicaciones = document.getElementById('quiz');

  const nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.classList.add('card-publi', 'col-md-4', 'mb-4');
  nuevaTarjeta.onclick = () => cargarPreguntas(id);

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
  enlaceLeerMas.textContent = 'Comenzar Quiz';

  cuerpoTarjeta.appendChild(nuevoTitulo);
  cuerpoTarjeta.appendChild(nuevaDescripcion);
  cuerpoTarjeta.appendChild(enlaceLeerMas);

  nuevaTarjeta.appendChild(nuevaImagen);
  nuevaTarjeta.appendChild(cuerpoTarjeta);
  contenedorPublicaciones.appendChild(nuevaTarjeta);
}

function cargarPreguntas(quizId) {
  const contenedorPublicaciones = document.getElementById('quiz');
  const publicacionesContenedor = document.getElementById('publicaciones-contenedor');
  const videosContenedor = document.getElementById('videos-contenedor');
  const cuestionariosContenedor = document.getElementById('cuestionarios-contenedor');

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

let totalScore = 0;  // Variable para el puntaje total del cuestionario

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
    let questionScore = 1000;  // Puntaje por pregunta
    let timerId = null;

    // Función para iniciar el temporizador
    const startTimer = () => {
      timerCircle.style.setProperty('--progress', '1');
      timerId = setInterval(() => {
        timeLeft--;
        questionScore = Math.max(0, 1000 - (50 * (20 - timeLeft)));  // Restar puntos por segundo
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

    // Función para mostrar la respuesta correcta
    const mostrarRespuestaCorrecta = () => {
      const botones = opcionesContainer.getElementsByTagName('button');
      Array.from(botones).forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
        
        const esCorrecta = preguntaActual.options.find(opt => 
          opt.description === btn.textContent
        ).status;

        if (esCorrecta) {
          btn.classList.add('correcta');
        }
      });
    };

    // Manejadores de clic en las opciones
    preguntaActual.options.forEach((opcion) => {
      const botonOpcion = document.createElement('button');
      botonOpcion.classList.add('opcion-btn');
      botonOpcion.textContent = opcion.description;
      
      botonOpcion.onclick = () => {
        clearInterval(timerId);  // Detener el temporizador

        const botones = opcionesContainer.getElementsByTagName('button');
        Array.from(botones).forEach(btn => {
          btn.disabled = true;
          btn.classList.add('disabled');
        });

        // Comprobar si la opción seleccionada es correcta
        const esCorrecta = opcion.status;  // Saber si la opción seleccionada es la correcta
        if (esCorrecta) {
          totalScore += questionScore;  // Solo sumar si es correcta
        }

        Array.from(botones).forEach(btn => {
          const esEstaOpcion = btn.textContent === opcion.description;
          const esCorrectaOpcion = preguntaActual.options.find(opt => 
            opt.description === btn.textContent
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
    
    // Iniciar el temporizador después de renderizar la pregunta
    setTimeout(startTimer, 100);
  } else {
    // Mostrar el puntaje final al terminar el cuestionario
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