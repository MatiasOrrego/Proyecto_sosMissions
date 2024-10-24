import { getAllVideo, getVideo, getVideoById, getVideoByCategory, createVideo, deleteVideoById } from "../models/video.model.js";

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
  const { user } = req;

  const video = await getVideoById(id, user.id);

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
  const { title, description, url, categoryId } = req.body;

  const video = await createVideo(title, description, url, userId, categoryId);

  res.status(201).json(video);
};

export const deleteVideoCtrl = async (req, res) => {
  const { id } = req.params
  const { user } = req;

  const deletePost = await deleteVideoById(id, user.id);

  if (!deletePost) {
    return res.status(404).json({ message: 'video no encontrada' })
  }
  res.status(204).send()
};