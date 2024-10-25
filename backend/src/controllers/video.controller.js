import { getAllVideo, getVideo, getVideoById, getVideoByCategory, createVideo, deleteVideoById } from "../models/video.model.js";
import { uploadVideo } from "../utils/cludinary.js";

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
  const { title, description, categoryId } = req.body;
  let video = null;
console.log(req.files);
console.log(req.file)

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
    console.log({
      "prueba": video
    });
    
    const newVideo = await createVideo(title, description, video, userId, categoryId);
    console.log();
    
    res.status(201).json(newVideo);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error al crear el video en la base de datos', error });
  }
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