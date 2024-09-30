import { createComment, deleteCommentById, getCommentById, getComments } from "../models/comments.js";


export const getAllCommentsCtrl = async (req, res) => {
  const userId = req.user.id;
  const comment = await getComments(userId);

  res.status(200).json(comment);
};

export const getCommentByIdCtrl = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const comment = await getCommentById(id, user.id);

  if (!comment) {
    return res.status(404).json({ message: 'Comentario no encontrado' });
  }

  res.status(200).json(comment);
};

export const createCommentCtrl = async (req, res) => {
  const userId = req.user.id;
  const { title, description, postId } = req.body;

  const comment = await createComment(title, description, userId, postId);

  res.status(201).json(comment);
};

export const deleteCommentCtrl = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const deleteComment = await deleteCommentById(id, user.id);

  if (!deleteComment) {
    return res.status(404).json({ message: 'Comentario no encontrado' });
  }
  res.status(204).send();
};
