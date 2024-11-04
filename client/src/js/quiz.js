document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("post-category");
  const questionsSelect = document.getElementById("questions");
  const quizContainer = document.querySelector(".quiz-container");

  // Poblamos el selector de cantidad de preguntas
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    questionsSelect.appendChild(option);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenimos el envío del formulario

    // Obtener los valores de title, description y categoryId
    const title = document.getElementById("titulo").value;
    const description = document.getElementById("descripcion").value;
    const categories = document.getElementById("categories").value;

    const categoryId = parseInt(categories);

    try {
      // Enviar los datos al servidor para crear el quiz
      const response = await fetch('http://localhost:3000/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title,
          description,
          categoryId
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear la publicación');
      }

      const quizData = await response.json(); // Obtener el quizId de la respuesta
      const quizId = quizData.id; // Asegúrate de que esto corresponde a la forma en que tu servidor envía el id del quiz

      alert('Publicación creada con éxito!');

      // Limpiamos el contenedor del cuestionario solo si el envío fue exitoso
      quizContainer.innerHTML = "";

      // Obtener el número de preguntas
      const questionCount = parseInt(questionsSelect.value);

      // Creamos un contenedor para las preguntas generadas
      const questionsContainer = document.createElement("div");
      questionsContainer.id = "generated-questions";

      for (let i = 1; i <= questionCount; i++) {
        // Crear un div para cada pregunta
        const questionDiv = document.createElement("div");
        questionDiv.className = "form-group mb-4";

        // Etiqueta para la pregunta
        const questionLabel = document.createElement("label");
        questionLabel.textContent = `Pregunta ${i}`;
        questionDiv.appendChild(questionLabel);

        // Campo de texto para la pregunta
        const questionInput = document.createElement("input");
        questionInput.type = "text";
        questionInput.className = "form-control";
        questionInput.name = `question_${i}`;
        questionInput.placeholder = `Escribe la pregunta ${i}`;
        questionInput.required = true;
        questionDiv.appendChild(questionInput);

        // Contenedor para las opciones
        const optionsContainer = document.createElement("div");
        optionsContainer.className = "options-container mt-3";

        for (let j = 1; j <= 4; j++) {
          // Div para cada opción
          const optionDiv = document.createElement("div");
          optionDiv.className = "form-check";

          // Radio button para seleccionar la opción correcta
          const optionRadio = document.createElement("input");
          optionRadio.type = "radio";
          optionRadio.className = "form-check-input";
          optionRadio.name = `correct_option_${i}`; // Permite seleccionar solo una opción por pregunta
          optionRadio.value = `option_${j}`;
          optionRadio.required = true;

          // Campo de texto para escribir la opción
          const optionInput = document.createElement("input");
          optionInput.type = "text";
          optionInput.className = "form-control d-inline-block ms-2";
          optionInput.placeholder = `Opción ${j}`;
          optionInput.name = `option_${i}_${j}`;
          optionInput.required = true;

          // Etiqueta para la opción
          const optionLabel = document.createElement("label");
          optionLabel.className = "form-check-label";
          optionLabel.textContent = `Opción ${j}: `;

          // Añadir elementos al contenedor de la opción
          optionDiv.appendChild(optionRadio);
          optionDiv.appendChild(optionLabel);
          optionDiv.appendChild(optionInput);

          // Agregar cada opción al contenedor de opciones
          optionsContainer.appendChild(optionDiv);
        }

        // Agregar el contenedor de opciones al div de la pregunta
        questionDiv.appendChild(optionsContainer);

        // Agregar la pregunta completa (con sus opciones) al contenedor de preguntas
        questionsContainer.appendChild(questionDiv);
      }

      // Agregar el contenedor de preguntas al formulario
      quizContainer.appendChild(questionsContainer);

      // Crear y agregar el botón "Crear cuestionario" al final de las preguntas
      const submitQuizButton = document.createElement("button");
      submitQuizButton.type = "button";
      submitQuizButton.className = "btn btn-primary mt-4";
      submitQuizButton.textContent = "Crear cuestionario";

      submitQuizButton.addEventListener("click", async () => {
        // Obtener todas las preguntas y opciones
        const questions = [];
        for (let i = 1; i <= questionCount; i++) {
          const questionText = document.querySelector(`input[name="question_${i}"]`).value;
          const options = [];
          for (let j = 1; j <= 4; j++) {
            const optionText = document.querySelector(`input[name="option_${i}_${j}"]`).value;
            const isCorrect = document.querySelector(`input[name="correct_option_${i}"]:checked`).value === `option_${j}`;
            options.push({ description: optionText, status: isCorrect });
          }
          questions.push({ content: questionText, options });
        }

        try {
          // Enviar el cuestionario con las preguntas y opciones al servidor
          const response = await fetch('http://localhost:3000/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              questions,
              quizId // Usar el quizId obtenido previamente
            })
          });

          if (!response.ok) {
            throw new Error('Error al crear el cuestionario');
          }

          alert('Cuestionario creado con éxito!');
          window.location.href = 'seccion-general.html'

        } catch (error) {
          alert('Hubo un error al crear el cuestionario');
          console.error(error);
        }
      });

      // Agregar el botón de envío al contenedor de preguntas
      quizContainer.appendChild(submitQuizButton);
    } catch (error) {
      alert('Hubo un error al crear la publicación');
      console.error(error);
    }
  });
});
