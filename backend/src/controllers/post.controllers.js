import { createPost, deletePostById, getAllPost, getPostByCategory, getPostById, getPosts } from '../models/post.model.js';

export const getAllPostsCtrl = async (req, res) => {
  const userId = req.user.id;
  const post = await getPosts(userId);

  res.status(200).json(post);
};

export const getAllGeneralPost = async (req, res) => {
  const post = await getAllPost();

  res.status(200).json(post)
}

export const getPostByIdCtrl = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const post = await getPostById(id, user.id);

  if (!post) {
    return res.status(404).json({ message: 'Publicación no encontrada' });
  }

  res.status(200).json(post);
};

export const getPostByCategoryCtrl = async (req, res) => {
  const { categoryId } = parseInt(req.params)

  const post = await getPostByCategory(categoryId)

  res.status(200).json(post)
}

export const createPostCtrl = async (req, res) => {
  const userId = req.user.id;
  const { title, description, categoryId } = req.body;

  const post = await createPost(title, description, userId, categoryId);

  res.status(201).json(post);
};

export const deletePostCtrl = async (req, res) => {
  const { id } = req.params
  const { user } = req;

  const deletePost = await deletePostById(id, user.id);

  if (!deletePost) {
    return res.status(404).json({ message: 'Publicación no encontrada' })
  }
  res.status(204).send()
};

// let image = null;
// let video = null

// if (req.files?.image) {
//     try {
//         // Sube la imagen usando la ruta temporal proporcionada por `express-fileupload`
//         image = await uploadImage(req.files.image.tempFilePath);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary' });
//     }
// }

// if (req.files?.video) {
//     try {
//         video = await uploadVideo(req.files.video.tempFilePath);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error al subir el video a Cloudinary' });
//     }
// }
