import { conn } from "../database/db.js";

export const createVideo = async (title, description, url, userId, categoryId, date) => {
const [result] = await conn.query(`INSERT INTO video (title, description, url, userId, categoryId, date) VALUES (?,?,?,?,?,CURRENT_DATE())`, [title, description, url, userId, categoryId, date])

return { id: result.insertId, title, description, url, userId, categoryId, date }
};

export const getAllVideo = async () => {
  const [result] = await conn.query(`SELECT * FROM video`);
  return result;
} 
export const getVideo = async (userId) => {
  const [result] = await conn.query(`SELECT * FROM video WHERE userId = ?`, [userId]);
  return result
};

export const getVideoById = async (id, userId) => {
  const [result] = await conn.query(`SELECT * FROM video WHERE id = ? AND userId = ?`, [id, userId])
  return result[0] || null;
};

export const getVideoByCategory = async (categoryId) => {
  const [result] = await conn.query(`SELECT * FROM video WHERE categoryId = ?`, [categoryId])

  return result
}

export const deleteVideoById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM video WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
