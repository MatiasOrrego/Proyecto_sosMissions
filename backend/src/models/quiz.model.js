import { conn } from "../database/db.js";

export const createQuiz = async (title, description, categoryId, userId, status, date) => {
  const [result] = await conn.query(`INSERT INTO quiz (title, description, categoryId, userId, status, date) VALUES (?,?,?,?,true,CURRENT_DATE())`, [title, description, categoryId, userId, status, date])

  return { id: result.insertId, title, description, categoryId, userId, status, date }
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

export const deleteOptionsByQuestionID = async (questionId) => {;
  const [result] = await conn.query(`DELETE FROM options WHERE questionId = ?`, [questionId]);
  return result
}

export const deleteQuestionBYquizID = async (quizId) => {
  const [result] = await conn.query(`DELETE FROM questions WHERE quizId = ?`, [quizId]);
  return result;
}

export const deleteQuizById = async (id, userId) => {
  const [result] = await conn.query(`DELETE FROM quiz WHERE id = ? AND userId = ?`, [id, userId]);
  return result.affectedRows > 0
};
