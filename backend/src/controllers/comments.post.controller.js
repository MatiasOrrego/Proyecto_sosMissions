import { createComment, createCommentVideo, deleteCommentById, getCommentById, getComments, getCommentsVideo } from "../models/comments.js";

export const getAllCommentsCtrl = async (req, res) => {
  const userId = req.user.id;
  const comment = await getComments(userId);

  res.status(200).json(comment);
};

export const getCommentByIdCtrl = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await getComments(postId);
    
    if (!comments) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    

    res.status(200).json(comments);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener comentarios", error });
  }
};

export const getCommentVideoByIdCtrl = async (req, res) => {
  const { videoId } = req.params;

  try {
    const comments = await getCommentsVideo(videoId);
    
    if (!comments) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Error al obtener comentarios", error });
  }
};

export const createCommentCtrl = async (req, res) => {
  const userId = req.user.id;
  const { text } = req.body;
  const { postId } = req.params;

  try {
    const comment = await createComment(userId, postId, text);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el comentario", error });
  }
};

export const createCommentVideoCtrl = async (req, res) => {
  const userId = req.user.id;
  const { text } = req.body;
  const { videoId } = req.params;

  try {
    const comment = await createCommentVideo(userId, videoId, text);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el comentario", error });
  }
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
