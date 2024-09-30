import { conn } from "../database/db.js";

export const createPost = async (title, description, userId, fecha_publi) => {
const [result] = await conn.query(`INSERT INTO post (title, description, userId, fecha_publi) VALUES (?,?,?,CURRENT_DATE())`, [title, description, userId, fecha_publi])

return { id: result.insertId, title, description, userId, fecha_publi }
};

export const getPosts = async (userId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE userId = ?`, [userId]);
  return result
};

export const getPostById = async (id, userId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE id = ? AND userId = ?`, [id, userId])
  return result[0] || null;
};

export const deletePostById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM post WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
