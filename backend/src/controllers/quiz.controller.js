import { conn } from "../database/db.js";
import { createQuiz, deleteOptionsByQuestionID, deleteQuestionBYquizID, deleteQuizById, getAllQuiz, getQuiz, getQuizByCategory, getQuizById } from "../models/quiz.model.js";

export const getAllQuizCtrl = async (req, res) => {
  const userId = req.user.id;
  const quiz = await getQuiz(userId);

  res.status(200).json(quiz);
};

export const getAllGeneralQuiz = async (req, res) => {
  const quiz = await getAllQuiz();

  res.status(200).json(quiz)
}

export const getQuizByIdCtrl = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const quiz = await getQuizById(id, user.id);

  if (!quiz) {
    return res.status(404).json({ message: 'Video no encontrado' });
  }

  res.status(200).json(quiz);
};

export const getQuizByCategoryCtrl = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    const quiz = await getQuizByCategory(categoryId);

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vídeos por categoría' });
  }
};


export const createQuizCtrl = async (req, res) => {
  const userId = req.user.id;
  const { title, description, categoryId } = req.body;

  try {
    const newQuiz = await createQuiz(title, description, categoryId, userId);
    
    res.status(201).json(newQuiz);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al crear el cuestionario', error });
  }
};

// Ajuste en deleteQuizCtrl
export const deleteQuizCtrl = async (req, res) => {
  const { id } = req.params; // ID del quiz
  const { user } = req; // Usuario autenticado

  try {
    // Obtener las preguntas relacionadas con el cuestionario
    const [questions] = await conn.query(`SELECT id FROM questions WHERE quizId = ?`, [id]);

    // Iterar sobre las preguntas y eliminar sus opciones
    for (const question of questions) {
      await deleteOptionsByQuestionID(question.id);
    }

    // Eliminar las preguntas relacionadas con el cuestionario
    await deleteQuestionBYquizID(id);

    // Eliminar el cuestionario
    const deleteQuiz = await deleteQuizById(id, user.id);

    // Verificar si el cuestionario fue eliminado
    if (!deleteQuiz) {
      return res.status(404).json({ message: 'Cuestionario no encontrado' });
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    console.error('Error al eliminar el cuestionario:', error);
    res.status(500).json({ message: 'Error al eliminar el cuestionario' });
  }
};
