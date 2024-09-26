import { newConnection } from '../database/db.js';

export const getAllComments = async (req, res) => {
    try {
        const connection = await newConnection();
        const sql = 'SELECT c.texto, c.fecha_comentario, u.username, c.post_id FROM comentarios c JOIN usuarios u ON c.user_id = u.id_usuario';
        const [comments] = await connection.query(sql);
        
        res.json(comments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

export const addComment = async (req, res) => {
    const { postId, userId, commentText } = req.body;

    const connection = await newConnection();

    const sql = 'INSERT INTO comentarios (post_id, user_id, texto, fecha_comentario) VALUES (?, ?, ?, CURRENT_DATE())';
    await connection.query(sql, [postId, userId, commentText]);

    res.json({ msg: 'Comentario agregado correctamente' });
    connection.end();
};

export const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    const connection = await newConnection();
    const sql = 'SELECT c.texto, c.fecha_comentario, u.username FROM comentarios c JOIN usuarios u ON c.user_id = u.id_usuario WHERE c.post_id = ?';
    const [comments] = await connection.query(sql, [postId]);

    res.json(comments);
    connection.end();
};
