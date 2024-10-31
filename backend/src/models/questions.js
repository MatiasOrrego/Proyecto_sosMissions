import { conn } from "../database/db.js";

export const createQuestions = async (content, quizId) => {
  const [result] = await conn.query(`INSERT INTO questions (content, quizId) VALUES (?,?)`, [content, quizId]);

  return { id: result.insertId, content, quizId };
};

export const getAllQuiz = async () => {
  const [result] = await conn.query(`SELECT * FROM quiz`);
  return result;
} 
export const getQuiz = async (userId) => {
  const [result] = await conn.query(`SELECT * FROM quiz WHERE userId = ?`, [userId]);
  return result
};

export const getQuizById = async (id, userId) => {
  const [result] = await conn.query(`SELECT * FROM quiz WHERE id = ? AND userId = ?`, [id, userId])
  return result[0] || null;
};

export const getQuizByCategory = async (categoryId) => {
  const [result] = await conn.query(`SELECT * FROM quiz WHERE categoryId = ?`, [categoryId])

  return result
}

export const deleteQuizById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM quiz WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
