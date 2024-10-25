import { conn } from "../database/db.js";

export const createVideo = async (title, description, video, userId, categoryId, date) => {
  console.log(video)
const [result] = await conn.query(`INSERT INTO videos (title, description, video, userId, categoryId, date) VALUES (?,?,?,?,?,CURRENT_DATE())`, [title, description, video, userId, categoryId])

return { id: result.insertId, title, description, video, userId, categoryId, date }
};

export const getAllVideo = async () => {
  const [result] = await conn.query(`SELECT * FROM videos`);
  return result;
} 
export const getVideo = async (userId) => {
  const [result] = await conn.query(`SELECT * FROM videos WHERE userId = ?`, [userId]);
  return result
};

export const getVideoById = async (id, userId) => {
  const [result] = await conn.query(`SELECT * FROM videos WHERE id = ? AND userId = ?`, [id, userId])
  return result[0] || null;
};

export const getVideoByCategory = async (categoryId) => {
  const [result] = await conn.query(`SELECT * FROM videos WHERE categoryId = ?`, [categoryId])

  return result
}

export const deleteVideoById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM videos WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
