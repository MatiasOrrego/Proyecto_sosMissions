import { newConnection } from "../database/db.js";

export const getAllPosts = async (req,res) => {
    const connection = await newConnection()

    const [result] = await connection.query(`SELECT * FROM post`)

    res.json(result)

    connection.end()
}

export const getPostById = async (req,res) => {

    const id = parseInt(req.params.id)

    const connection = await newConnection()

    const [result] = await connection.query(`SELECT * FROM post WHERE id = ?`, [id]);

    res.status(200).json(result[0])

    connection.end()
}

export const createPost = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename: null

    const connection = await newConnection();

    const [result] = await connection.query(
        `INSERT INTO post (title, description, image) VALUES (?, ?, ?)`,
        [title, description, image]
    );

    res.status(201).json({
        id: result.insertId,
        title,
        description,
        image
    });

    connection.end();
};

export const updatePost = async (req,res) => {
    const id = parseInt(req.params.id)

    const { title, description, image } = req.body

    const connection = await newConnection()

    const [result] = await connection.query(`SELECT * FROM post WHERE id = ?`)

    if (result.length === 0) {
        return res.status(404).json( { msg: 'Tarea no encontrada' });
    };

    await connection.query(`
        UPDATE post SET title = ?, description = ?, image = ? WHERE id = ?`, [title, description, isCompleted, id]
    );

    res.status(201).json({
        id: id,
        title,
        description,
        image
    });

    connection.end();
} 

export const deletePost = async (req,res) => {
    const id = parseInt(req.params.id);

    const connection = await newConnection();

    const [result] = await connection.query('SELECT * FROM post WHERE id = ?', [id]);
    
    if (result.length === 0) {
        return res.status(404).json( { msg: 'Tarea no encontrada' });
    };

    await connection.query(`
        DELETE FROM publicaciones WHERE id = ?`, [id]
    );

    res.status(200).json({ msg: 'Tarea eliminada' })

    connection.end();
}