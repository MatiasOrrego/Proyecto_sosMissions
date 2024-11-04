import { createOptions, createQuestions, getAllOptions, getAllQuestions, getOptionsByQuestion, getQuestionByQuizId } from "../models/questions.model.js"

export const getAllGeneralQuestionsCtrl = async (_req, res) => {
  try {
    const questions = await getAllQuestions();
    const options = await getAllOptions();

    res.status(200).json({ questions, options });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener preguntas y opciones' });
  }
}

export const getAllOptionsByQuestionIdCtrl = async (req, res) => {
  const { questionId } = req.params;
  try {
    const options = await getOptionsByQuestion(questionId);

    if (!options) {
      return res.status(404).json({ message: 'Opcion no encontrada' })
    }

    res.status(200).json(options);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las opciones' });
  }
}

export const getQuestionByQuizIdCtrl = async (req, res) => {
  const { quizId } = req.params;

  try {
    const questions = await getQuestionByQuizId(quizId);
    const questionsWithOptions = await Promise.all(
      questions.map(async (question) => {
        const options = await getOptionsByQuestion(question.id);
        return { ...question, options };
      })
    );

    if (!questionsWithOptions.length) {
      return res.status(404).json({ message: 'Cuestionario no encontrado' });
    }

    res.status(200).json(questionsWithOptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las preguntas', error });
  }
};


// Controlador para crear preguntas y opciones en el backend
export const createQuestionsWithOptionsCtrl = async (req, res) => {
  const { questions, quizId } = req.body;

  try {
    for (const question of questions) {
      // Crear la pregunta
      const newQuestion = await createQuestions(question.content, quizId);

      // Crear las opciones de la pregunta usando el ID de la nueva pregunta
      for (const option of question.options) {
        // Aquí pasas newQuestion.id como questionId
        await createOptions(option.description, option.status, newQuestion.id);
      }
    }

    res.status(201).json({ message: 'Preguntas y opciones creadas con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear preguntas y opciones', error });
  }
};