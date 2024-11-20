import { conn } from "../database/db.js";

export const createQuestions = async (content, quizId) => {
  const [result] = await conn.query(`INSERT INTO questions (content, quizId) VALUES (?,?)`, [content, quizId]);

  return { id: result.insertId, content, quizId };
};

export const createOptions = async (description, status, questionId) => {
  const [result] = await conn.query(`INSERT INTO options (description, status, questionId) VALUES (?, ?, ?)`, [description, status, questionId]);

  return { id: result.insertId, description, status, questionId };
}


export const getAllQuestions = async () => {
  const [result] = await conn.query(`SELECT * FROM questions`);
  return result;
}

export const getOptionsByQuestion = async (questionId) => {
  const [result] = await conn.query(`SELECT * FROM options WHERE questionId = ?`, [questionId]);
  return result;
}

export const getAllOptions = async () => {
  const [result] = await conn.query(`SELECT * FROM questions`);
  return result;
}

export const getQuestionByQuizId = async (quizId) => {
  const [result] = await conn.query(`SELECT * FROM questions WHERE quizId = ?`, [quizId])
  return result || null;
};