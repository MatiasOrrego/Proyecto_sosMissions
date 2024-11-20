import { conn } from "../database/db.js";

export const getUserRating = async (userId, postId) => {
    const [rows] = await conn.query(
      `SELECT * FROM user_ratings WHERE userId = ? AND postId = ?`,
      [userId, postId]
    );
    if (rows.length === 0) {
      throw new Error("No se encontró un rating para este usuario y publicación");
    }
    return rows[0];
  };
  

export const createUserRating = async (userId, postId, rating) => {
    if (rating < 1 || rating > 5) {
      throw new Error("El rating debe estar entre 1 y 5");
    }
  
    const [result] = await conn.query(
      `INSERT INTO user_ratings (userId, postId, rating) VALUES (?, ?, ?)`,
      [userId, postId, rating]
    );
  
    return { id: result.insertId, userId, postId, rating };
  };

  export const updateUserRating = async (userId, postId, rating) => {
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
  