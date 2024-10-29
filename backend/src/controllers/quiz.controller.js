import { createQuiz, deleteQuizById, getAllQuiz, getQuiz, getQuizByCategory, getQuizById } from "../models/quiz.model.js";

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
  const { title, description, categoryId, status } = req.bodys;

  try {
    const newQuiz = await createQuiz(title, description, categoryId, userId, status);
    
    res.status(201).json(newQuiz);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al crear el cuestionario', error });
  }
};

export const deleteQuizCtrl = async (req, res) => {
  const { id } = req.params
  const { user } = req;

  const deleteQuiz = await deleteQuizById(id, user.id);

  if (!deleteQuiz) {
    return res.status(404).json({ message: 'video no encontrada' })
  }
  res.status(204).send();
};