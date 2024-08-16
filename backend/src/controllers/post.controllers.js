import { pool } from "../database/db.js";
import { authMiddleware } from "../middleware/user.authen.js";
import { authorizeAdmin } from "../middleware/user.authorize.js";
import { validationResult } from "express-validator";
import { validatePost } from "./validate.post.js";

export const getAllPosts = [authMiddleware, authorizeAdmin, async (req, res) => {
    try {
        const connection = await pool();
        const [result] = await connection.query(`SELECT * FROM publicaciones`);
        res.json(result);
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

export const getPostById = [authMiddleware, authorizeAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const connection = await pool();
        const [result] = await connection.query(`SELECT * FROM publicaciones WHERE id = ?`, [id]);
        if (result.length === 0) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }
        res.status(200).json(result[0]);
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

export const createPost = [authMiddleware, authorizeAdmin, validatePost, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, image } = req.body;
        const connection = await pool();
        const [result] = await connection.query(`INSERT INTO publicaciones (title, description, image) VALUES (?, ?, ?)`, [title, description, image]);
        res.status(201).json({
            id: result.insertId,
            title,
            description,
            image
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

export const updatePost = [authMiddleware, authorizeAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description, image } = req.body;
        const connection = await pool();
        const [result] = await connection.query(`SELECT * FROM publicaciones WHERE id = ?`, [id]);

        if (result.length === 0) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        await connection.query(`UPDATE publicaciones SET title = ?, description = ?, image = ? WHERE id = ?`, [title, description, image, id]);
        res.status(201).json({
            id: id,
            title,
            description,
            image
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

export const deletePost = [authMiddleware, authorizeAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const connection = await pool();
        const [result] = await connection.query('SELECT * FROM publicaciones WHERE id = ?', [id]);

        if (result.length === 0) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        await connection.query(`DELETE FROM publicaciones WHERE id = ?`, [id]);
        res.status(200).json({ msg: 'Publicación eliminada' });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];