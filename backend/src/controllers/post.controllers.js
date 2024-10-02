import { conn } from "../database/db.js";
import { authMiddleware } from "../middleware/user.authen.js";
import { authorizeRoles } from "../middleware/user.authorize.js";
import { validationResult } from "express-validator";
import { validatePost } from "./validate.post.js";

export const getAllPosts = [authMiddleware, authorizeRoles, async (req, res) => {
    try {
        const connection = await conn();
        const [result] = await connection.query(`SELECT * FROM posts`);
        res.json(result);
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

export const getPostById = [authMiddleware, authorizeRoles, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const connection = await conn();
        const [result] = await connection.query(`SELECT * FROM posts WHERE id = ?`, [id]);
        if (result.length === 0) {
            connection.end();
            return res.status(404).json({ msg: 'Post no encontrado' });
        }
        res.status(200).json(result[0]);
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];

export const createPost = [authMiddleware, authorizeRoles, validatePost, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, image } = req.body;
        const connection = await conn();
        const [result] = await connection.query(`INSERT INTO posts (title, description, image) VALUES (?, ?, ?)`, [title, description, image]);
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

export const updatePost = [authMiddleware, authorizeRoles, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description, image } = req.body;
        const connection = await conn();
        const [result] = await connection.query(`SELECT * FROM posts WHERE id = ?`, [id]);

        if (result.length === 0) {
            connection.end();
            return res.status(404).json({ msg: 'Post no encontrado' });
        }

        await connection.query(`UPDATE posts SET title = ?, description = ?, image = ? WHERE id = ?`, [title, description, image, id]);
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

export const deletePost = [authMiddleware, authorizeRoles, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const connection = await conn();
        const [result] = await connection.query('SELECT * FROM posts WHERE id = ?', [id]);

        if (result.length === 0) {
            connection.end();
            return res.status(404).json({ msg: 'Post no encontrado' });
        }

        await connection.query(`DELETE FROM posts WHERE id = ?`, [id]);
        res.status(200).json({ msg: 'Post eliminado' });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}];