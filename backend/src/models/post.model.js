import { conn } from "../database/db.js";

export const createPost = async (title, description, medicId, fecha_publi, categoryId) => {
const [result] = await conn.query(`INSERT INTO post (title, description, medicId, fecha_publi, categoryId) VALUES (?,?,?,CURRENT_DATE())`, [title, description, medicId, fecha_publi, categoryId])

return { id: result.insertId, title, description, medicId, fecha_publi }
};

export const getPosts = async (medicId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE medicId = ?`, [medicId]);
  return result
};

export const getPostById = async (id, medicId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE id = ? AND medicId = ?`, [id, medicId])
  return result[0] || null;
};

export const deletePostById = async (id, medicId) => {
  const [result] = await conn.query(`DELETE FROM post WHERE id = ? AND medicId = ?`, [id, medicId]);
  return result.affectedRows > 0
};
