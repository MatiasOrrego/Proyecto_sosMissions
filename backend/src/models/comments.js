import { conn } from "../database/db.js";

export const createComment = async (userId, postId, text, fecha_comentario) => {
const [result] = await conn.query(`INSERT INTO comments (userId, postId, text, fecha_comentario) VALUES (?,?,?,CURRENT_DATE())`, [userId, postId, text, fecha_comentario]);

return { id: result.insertId, userId, postId, text, fecha_comentario }
};

export const getComments = async (userId) => {
  const [result] = await conn.query(`SELECT * FROM comments WHERE userId = ?`, [userId]);
  return result
};

export const getCommentById = async (id, userId) => {
  const [result] = await conn.query(`SELECT * FROM comments WHERE id = ? AND userId = ?`, [id, userId])
  return result[0] || null;
};

export const deleteCommentById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM comments WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
