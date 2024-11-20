import { conn } from "../database/db.js";

export const createUserRatingVideo = async (userId, videoId, rating) => {
    if (rating < 1 || rating > 5) {
      throw new Error("El rating debe estar entre 1 y 5");
    }
  
    const [result] = await conn.query(
      `INSERT INTO user_rating_video (userId, videoId, rating) VALUES (?, ?, ?)`,
      [userId, videoId, rating]
    );
  
    return { id: result.insertId, userId, videoId, rating };
  };

  export const updateUserRating = async (userId, videoId, rating) => {
    if (rating < 1 || rating > 5) {
      throw new Error("El rating debe estar entre 1 y 5");
    }
  
    const [result] = await conn.query(
      `UPDATE user_ratings SET rating = ? WHERE userId = ? AND postId = ?`,
      [rating, userId, postId]
    );
  
    if (result.affectedRows === 0) {
      throw new Error("No se encontró un rating para actualizar");
    }
  
    return { userId, postId, rating };
  };
  