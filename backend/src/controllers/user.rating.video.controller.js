import { createUserRatingVideo } from "../models/user.rating.video.model.js";

export const addRatingVideoCtrl = async (req, res) => {
  try {
    const userId = req.user.id
    const { videoId }  = req.params;
    const { rating } = req.body;

    const userRating = await createUserRatingVideo(userId, videoId, rating);
    return res.status(201).json({ message: "Rating agregado exitosamente", userRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al agregar el rating", error: error.message });
  }
};