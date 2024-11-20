import { conn } from '../database/db.js';
import { createPost, getAllPost, getPostByCategory, getPostById, getPosts, updatePost } from '../models/post.model.js';

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

  const post = await getPostById(id);

  if (!post) {
    return res.status(404).json({ message: 'Publicación no encontrada' });
  }

  res.status(200).json(post);
};

export const getPostByCategoryCtrl = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    if (isNaN(categoryId)) {
      return res.status(400).json({ message: 'Categoría no válida' });
    }

    const posts = await getPostByCategory(categoryId);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las publicaciones por categoría' });
  }
};


export const createPostCtrl = async (req, res) => {
  const userId = req.user.id;
  const { title, description, categoryId } = req.body;

  const post = await createPost(title, description, userId, categoryId);

  res.status(201).json(post);
};

export const updatePostCtrl =  async (req, res) => {
  const { id } = req.params;
  const { title, description, categoryId } = req.body;
  const userId = req.user.id;

  try {
    const success = await updatePost(id, title, description, categoryId, userId);
    if (success) {
      res.status(200).json({ message: 'Post actualizado exitosamente' });
    } else {
      res.status(404).json({ message: 'Post no encontrado o no autorizado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar el post'});
  }
};

export const deleteCommentsByPostId = async (postId) => {
  const [result] = await conn.query(`DELETE FROM comments_post WHERE postId = ?`, [postId]);
  return result.affectedRows > 0; // Devuelve true si se eliminaron comentarios
};

export const deletePostById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM post WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0; // Devuelve true si se eliminó la publicación
};

export const deletePostCtrl = async (req, res) => {
  const { id } = req.params; // ID de la publicación
  const { user } = req; // Usuario autenticado

  try {
    // Eliminar los comentarios relacionados con la publicación
    await deleteCommentsByPostId(id);

    // Eliminar la publicación
    const deletePost = await deletePostById(id, user.id);

    // Verificar si la publicación fue eliminada
    if (!deletePost) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).json({ message: 'Error al eliminar la publicación' });
  }
};
