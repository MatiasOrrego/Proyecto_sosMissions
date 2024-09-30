import { conn } from "../database/db.js";

export const createComment = async (postId, userId, text, fecha_comentario) => {
const [result] = await conn.query(`INSERT INTO post (postId, userId, text, fecha_comentario) VALUES (?,?,?,CURRENT_DATE())`, [postId, userId, text, fecha_comentario]);

return { id: result.insertId, postId, userId, userId, fecha_comentario }
};

export const getComments = async (userId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE userId = ?`, [userId]);
  return result
};

export const getCommentById = async (id, userId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE id = ? AND userId = ?`, [id, userId])
  return result[0] || null;
};

export const deleteCommentById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM post WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
