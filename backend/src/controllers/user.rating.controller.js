import { createUserRating, getUserRating, updateUserRating } from "../models/user.rating.model.js";

export const addRatingCtrl = async (req, res) => {
  try {
    const userId = req.user.id
    const { postId }  = req.params;
    const { rating } = req.body;

    const userRating = await createUserRating(userId, postId, rating);
    return res.status(201).json({ message: "Rating agregado exitosamente", userRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar el rating", error: error.message });
  }
};

export const getRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const rating = await getUserRating(userId, postId);
    return res.status(200).json({ message: "Rating obtenido exitosamente", rating });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Error al obtener el rating", error: error.message });
  }
};

export const modifyRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { postId }  = req.params;
    const { rating } = req.body;

    const updatedRating = await updateUserRating(userId, postId, rating);
    return res.status(200).json({ message: "Rating actualizado exitosamente", updatedRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el rating", error: error.message });
  }
};
