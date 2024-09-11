import { newConnection } from "../database/db.js";
import { uploadImage, uploadVideo } from "../utils/cludinary.js";

export const getAllPosts = async (req, res) => {
    const connection = await newConnection();

    const [result] = await connection.query(`SELECT * FROM post`);

    res.json(result);

    connection.end();
};

export const getPostById = async (req, res) => {
    const id = parseInt(req.params.id);

    const connection = await newConnection();

    const [result] = await connection.query(`SELECT * FROM post WHERE id = ?`, [id]);

    if (result.length === 0) {
        return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    res.status(200).json(result[0]);

    connection.end();
};

export const createPost = async (req, res) => {
    const { title, description } = req.body;
    let image = null;
    let video = null

    if (req.files?.image) {
        try {
            // Sube la imagen usando la ruta temporal proporcionada por `express-fileupload`
            image = await uploadImage(req.files.image.tempFilePath);
        } catch (error) {
            return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary' });
        }
    }

    if (req.files?.video) {
        try {
            video = await uploadVideo(req.files.video.tempFilePath);
        } catch (error) {
            return res.status(500).json({ message: 'Error al subir el video a Cloudinary' });
        }
    }

    const connection = await newConnection();

    const [result] = await connection.query(
        `INSERT INTO post (title, description, image, video) VALUES (?, ?, ?, ?)`,
        [title, description, image, video]
    );

    res.status(201).json({
        id: result.insertId,
        title,
        description,
        image,
        video
    });

    connection.end();
};

export const updatePost = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    let image = req.body.image;  // Mantener la imagen actual si no se cambia

    if (req.files?.image) {
        // Subir la nueva imagen a Cloudinary
        const result = await uploadImage(req.files.image.tempFilePath);
        image = result.secure_url;
    }

    const connection = await newConnection();

    const [result] = await connection.query(`SELECT * FROM post WHERE id = ?`, [id]);

    if (result.length === 0) {
        return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    await connection.query(
        `UPDATE post SET title = ?, description = ?, image = ? WHERE id = ?`,
        [title, description, image, id]
    );

    res.status(200).json({
        id,
        title,
        description,
        image
    });

    connection.end();
};

export const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);

    const connection = await newConnection();

    const [result] = await connection.query('SELECT * FROM post WHERE id = ?', [id]);

    if (result.length === 0) {
        return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    await connection.query(`DELETE FROM post WHERE id = ?`, [id]);

    res.status(200).json({ msg: 'Publicación eliminada' });

    connection.end();
};
