let currentUserType = 'patient';
let questions = [];

// Simular algunas preguntas iniciales
const initialQuestions = [
    {
        id: 1,
        text: "¿Cuáles son los síntomas comunes de la migraña?",
        author: "Usuario123",
        date: "2024-03-28",
        answers: [
            {
                text: "Los síntomas más comunes incluyen dolor de cabeza pulsátil, sensibilidad a la luz y sonido, náuseas. Es importante consultar a un médico para un diagnóstico preciso.",
                author: "Dr. García",
                date: "2024-03-28"
            }
        ]
    }
];

// Cargar preguntas iniciales
window.onload = function() {
    questions = initialQuestions;
    updateQuestionsList();
};

function setUserType(type) {
    currentUserType = type;
    document.getElementById('patientBtn').classList.remove('active');
    document.getElementById('doctorBtn').classList.remove('active');
    document.getElementById(`${type}Btn`).classList.add('active');
    
    // Mostrar/ocultar el formulario de preguntas según el tipo de usuario
    document.getElementById('questionForm').classList.toggle('hidden', type === 'doctor');
    updateQuestionsList();
}

function submitQuestion() {
    const questionText = document.querySelector('.question-form textarea').value.trim();
    
    if (questionText) {
        const newQuestion = {
            id: questions.length + 1,
            text: questionText,
            author: "Usuario" + Math.floor(Math.random() * 1000),
            date: new Date().toISOString().split('T')[0],
            answers: []
        };

        questions.unshift(newQuestion);
        document.querySelector('.question-form textarea').value = '';
        updateQuestionsList();
    }
}

function submitAnswer(questionId) {
    const answerText = document.querySelector(`#answer-${questionId}`).value.trim();
    
    if (answerText) {
        const question = questions.find(q => q.id === questionId);
        if (question) {
            question.answers.push({
                text: answerText,
                author: "Dr. " + Math.floor(Math.random() * 1000),
                date: new Date().toISOString().split('T')[0]
            });
            updateQuestionsList();
        }
    }
}

function updateQuestionsList() {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = questions.map(question => `
        <div class="question">
            <h3>Pregunta #${question.id}</h3>
            <p>${question.text}</p>
            <div class="metadata">
                Publicado por: ${question.author} | Fecha: ${question.date}
            </div>
            <div class="answers">
                ${question.answers.map(answer => `
                    <div class="answer">
                        <p>${answer.text}</p>
                        <div class="metadata">
                            Respondido por: ${answer.author} | Fecha: ${answer.date}
                        </div>
                    </div>
                `).join('')}
                ${currentUserType === 'doctor' ? `
                    <div class="answer-form">
                        <textarea id="answer-${question.id}" placeholder="Escribe tu respuesta..."></textarea>
                        <button onclick="submitAnswer(${question.id})">Responder</button>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}