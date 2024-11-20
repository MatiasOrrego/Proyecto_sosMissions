document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("post-category");
  const questionsSelect = document.getElementById("questions");
  const quizContainer = document.querySelector(".quiz-container");

  for (let i = 3; i <= 10; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      questionsSelect.appendChild(option);
  }

  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("titulo").value;
      const description = document.getElementById("descripcion").value;
      const categories = document.getElementById("categories").value;
      const categoryId = parseInt(categories);

      try {
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

          const quizData = await response.json();
          const quizId = quizData.id;

          alert('Publicación creada con éxito!');

          form.style.display = 'none';
          const questionCount = parseInt(questionsSelect.value);

          const questionsContainer = document.createElement("div");
          questionsContainer.id = "generated-questions";
          questionsContainer.className = "mt-4";

          for (let i = 1; i <= questionCount; i++) {
              const questionDiv = document.createElement("div");
              questionDiv.className = "card mb-4";

              const questionCard = document.createElement("div");
              questionCard.className = "card-body";

              const questionHeader = document.createElement("h5");
              questionHeader.className = "card-title mb-3";
              questionHeader.textContent = `Pregunta ${i}`;

              const questionInput = document.createElement("input");
              questionInput.type = "text";
              questionInput.className = "form-control mb-3";
              questionInput.name = `question_${i}`;
              questionInput.placeholder = `Escribe la pregunta ${i}`;
              questionInput.required = true;

              // Add options count selector for this question
              const optionsCountDiv = document.createElement("div");
              optionsCountDiv.className = "mb-3";
              
              const optionsLabel = document.createElement("label");
              optionsLabel.className = "form-label";
              optionsLabel.textContent = "Cantidad de opciones";
              
              const optionsSelect = document.createElement("select");
              optionsSelect.className = "form-select";
              optionsSelect.name = `options_count_${i}`;
              
              // Populate options (2-6)
              for (let j = 2; j <= 6; j++) {
                  const option = document.createElement("option");
                  option.value = j;
                  option.textContent = j;
                  if (j === 4) option.selected = true;
                  optionsSelect.appendChild(option);
              }

              optionsCountDiv.appendChild(optionsLabel);
              optionsCountDiv.appendChild(optionsSelect);

              const optionsContainer = document.createElement("div");
              optionsContainer.className = "options-container";
              optionsContainer.id = `options_container_${i}`;

              // Function to generate options for this question
              const generateOptions = (count) => {
                  optionsContainer.innerHTML = ''; // Clear existing options
                  for (let j = 1; j <= count; j++) {
                      const optionDiv = document.createElement("div");
                      optionDiv.className = "input-group mb-2";

                      const radioWrapper = document.createElement("div");
                      radioWrapper.className = "input-group-text";

                      const optionRadio = document.createElement("input");
                      optionRadio.type = "radio";
                      optionRadio.className = "form-check-input mt-0";
                      optionRadio.name = `correct_option_${i}`;
                      optionRadio.value = `option_${j}`;
                      optionRadio.required = true;

                      const optionInput = document.createElement("input");
                      optionInput.type = "text";
                      optionInput.className = "form-control";
                      optionInput.placeholder = `Opción ${j}`;
                      optionInput.name = `option_${i}_${j}`;
                      optionInput.required = true;

                      radioWrapper.appendChild(optionRadio);
                      optionDiv.appendChild(radioWrapper);
                      optionDiv.appendChild(optionInput);

                      optionsContainer.appendChild(optionDiv);
                  }
              };

              // Initial generation of options
              generateOptions(4);

              // Update options when count changes
              optionsSelect.addEventListener('change', (e) => {
                  generateOptions(parseInt(e.target.value));
              });

              questionCard.appendChild(questionHeader);
              questionCard.appendChild(questionInput);
              questionCard.appendChild(optionsCountDiv);
              questionCard.appendChild(optionsContainer);

              questionDiv.appendChild(questionCard);
              questionsContainer.appendChild(questionDiv);
          }

          quizContainer.appendChild(questionsContainer);

          const submitQuizButton = document.createElement("button");
          submitQuizButton.type = "button";
          submitQuizButton.className = "submit-quiz-btn";
          submitQuizButton.textContent = "Crear cuestionario";

          submitQuizButton.addEventListener("click", async () => {
              const questions = [];
              for (let i = 1; i <= questionCount; i++) {
                  const questionText = document.querySelector(`input[name="question_${i}"]`).value;
                  const optionsCount = parseInt(document.querySelector(`select[name="options_count_${i}"]`).value);
                  const options = [];
                  
                  for (let j = 1; j <= optionsCount; j++) {
                      const optionText = document.querySelector(`input[name="option_${i}_${j}"]`).value;
                      const isCorrect = document.querySelector(`input[name="correct_option_${i}"]:checked`).value === `option_${j}`;
                      options.push({ description: optionText, status: isCorrect });
                  }
                  questions.push({ content: questionText, options });
              }

              try {
                  const response = await fetch('http://localhost:3000/question', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      credentials: 'include',
                      body: JSON.stringify({
                          questions,
                          quizId
                      })
                  });

                  if (!response.ok) {
                      throw new Error('Error al crear el cuestionario');
                  }

                  alert('Cuestionario creado con éxito!');
                  window.location.href = 'medic-publications.html';

              } catch (error) {
                  alert('Hubo un error al crear el cuestionario');
                  console.error(error);
              }
          });

          quizContainer.appendChild(submitQuizButton);
      } catch (error) {
          alert('Hubo un error al crear la publicación');
          console.error(error);
      }
  });
});