import { getAllVideo, getVideo, getVideoById, getVideoByCategory, createVideo } from "../models/video.model.js";
import { uploadVideo } from "../utils/cludinary.js";
import { conn } from '../database/db.js';

export const getAllVideoCtrl = async (req, res) => {
  const userId = req.user.id;
  const video = await getVideo(userId);

  res.status(200).json(video);
};

export const getAllGeneralVideos = async (req, res) => {
  const video = await getAllVideo();

  res.status(200).json(video)
}

export const getVideoByIdCtrl = async (req, res) => {
  const { id } = req.params;

  const video = await getVideoById(id);

  if (!video) {
    return res.status(404).json({ message: 'Video no encontrado' });
  }

  res.status(200).json(video);
};

export const getVideoByCategoryCtrl = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    const video = await getVideoByCategory(categoryId);

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vídeos por categoría' });
  }
};


export const createVideoCtrl = async (req, res) => {
  const userId = req.user.id;
  const { title, description, categoryId } = req.body;
  let video = null;

  if (!req.files?.video) {
    console.log('No se encontró el archivo de video en req.files');
    return res.status(400).json({ message: 'El archivo de video es obligatorio' });
  }


  try {
    const videoUploadResponse = await uploadVideo(req.files.video.tempFilePath);
    video = videoUploadResponse;
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al subir el video a Cloudinary' });
  }

  try {
    const newVideo = await createVideo(title, description, video, userId, categoryId);
    
    res.status(201).json(newVideo);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al crear el video en la base de datos', error });
  }
};

export const deleteCommentsByVideoId = async (videoId) => {
  const [result] = await conn.query(`DELETE FROM comment_video WHERE videoId = ?`, [videoId]);
  return result.affectedRows > 0; // Devuelve true si se eliminaron comentarios
};

export const deleteRatingBYId = async(videoId) => {
  const [result] = await conn.query(`DELETE FROM user_rating_video WHERE videoId = ?`, [videoId]);
  return result.affectedRows > 0; // Devuelve true si se eliminaron los ratings
}

export const deleteVideoById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM videos WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0; // Devuelve true si se eliminó la publicación
};

export const deleteVideoCtrl = async (req, res) => {
  const { id } = req.params; // ID de la publicación
  const { user } = req; // Usuario autenticado

  try {
    // Eliminar los comentarios relacionados con la publicación
    await deleteCommentsByVideoId(id);
    await deleteRatingBYId(id)

    // Eliminar la publicación
    const deleteVideo = await deleteVideoById(id, user.id);

    // Verificar si la publicación fue eliminada
    if (!deleteVideo) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    console.error('Error al eliminar el video:', error);
    res.status(500).json({ message: 'Error al eliminar la publicación' });
  }
};
