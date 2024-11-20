import { conn } from "../database/db.js";

export const createComment = async (userId, postId, text, fecha_comentario) => {
const [result] = await conn.query(`INSERT INTO comments_post (userId, postId, text, fecha_comentario) VALUES (?,?,?,CURRENT_DATE())`, [userId, postId, text, fecha_comentario]);

return { id: result.insertId, userId, postId, text, fecha_comentario }
};

export const createCommentVideo = async (userId, videoId, text, fecha_comentario) => {
  const [result] = await conn.query(`INSERT INTO comment_video (userId, videoId, text, fecha_comentario) VALUES (?,?,?,CURRENT_DATE())`, [userId, videoId, text, fecha_comentario]);
  
  return { id: result.insertId, userId, videoId, text, fecha_comentario }
  };

export const getComments = async (postId) => {
  const [result] = await conn.query(
    `
    SELECT 
      c.id , 
      c.text, 
      c.fecha_comentario, 
      u.username
    FROM comments_post c
    JOIN users u ON u.id = c.userId
    WHERE c.postId = ?`,
    [postId]
  );
  return result;
};

export const getCommentsVideo = async (videoId) => {
  const [result] = await conn.query(
    `
    SELECT 
      v.id , 
      v.text, 
      v.fecha_comentario, 
      u.username
    FROM comment_video v
    JOIN users u ON u.id = v.userId
    WHERE v.videoId = ?`,
    [videoId]
  );
  return result;
};


export const getCommentById = async (id, postId) => {
  const [result] = await conn.query(`SELECT * FROM comments_post WHERE id = ? AND postId = ?`, [id, postId])
  console.log(result)
  return result[0] || null;
};

export const deleteCommentById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM comments_post WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
