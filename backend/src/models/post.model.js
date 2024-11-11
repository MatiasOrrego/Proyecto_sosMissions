import { conn } from "../database/db.js";

export const createPost = async (title, description, userId, fecha_publi, categoryId) => {
const [result] = await conn.query(`INSERT INTO post (title, description, userId, fecha_publi, categoryId) VALUES (?,?,?,CURRENT_DATE(),?)`, [title, description, userId, fecha_publi, categoryId])

return { id: result.insertId, title, description, userId, fecha_publi, categoryId }
};

export const getAllPost = async () => {
  const [result] = await conn.query(`SELECT * FROM post`);
  return result;
} 
export const getPosts = async (userId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE userId = ?`, [userId]);
  return result
};

export const getPostById = async (id) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE id = ?`, [id])
  return result[0] || null;
};

export const getPostByCategory = async (categoryId) => {
  const [result] = await conn.query(`SELECT * FROM post WHERE categoryId = ?`, [categoryId])

  return result
}

export const deletePostById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM post WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
