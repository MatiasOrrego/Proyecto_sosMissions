import { conn } from "../database/db.js";

export const createComment = async (userId, postId, text, fecha_comentario) => {
const [result] = await conn.query(`INSERT INTO comments (userId, postId, text, fecha_comentario) VALUES (?,?,?,CURRENT_DATE())`, [userId, postId, text, fecha_comentario]);

return { id: result.insertId, userId, postId, text, fecha_comentario }
};

export const getComments = async (postId) => {
  const [result] = await conn.query(`SELECT * FROM comments WHERE postId = ?`, [postId]);
  return result
};

export const getCommentById = async (id, postId) => {
  const [result] = await conn.query(`SELECT * FROM comments WHERE id = ? AND postId = ?`, [id, postId])
  console.log(result)
  return result[0] || null;
};

export const deleteCommentById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM comments WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
