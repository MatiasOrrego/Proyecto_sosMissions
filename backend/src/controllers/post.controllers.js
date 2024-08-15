import { pool } from "../database/db.js";
import { authMiddleware } from "../middleware/user.authen.js";
import { authorizeAdmin } from "../middleware/user.authorize.js";

export const getAllPosts = [authMiddleware, authorizeAdmin, async (req,res) => {
    const connection = await pool()

    const [result] = await connection.query(`SELECT * FROM publicaciones`)

    res.json(result)

    connection.end()
}];

export const getPostById = [authMiddleware, authorizeAdmin,  async (req,res) => {

    const id = parseInt(req.params.id)

    const connection = await pool()

    const [result] = await connection.query(`SELECT * FROM publicaciones WHERE id = ?`, [id]);

    res.status(200).json(result[0])

    connection.end()
}];

export const createPost = [authMiddleware, authorizeAdmin,async (req,res) => {
    const { title,description,image } = req.body

    const connection = await pool()

    const [result] = await connection.query(`INSERT INTO publicaciones
    (title,description,image)
    VALUES (?,?,?)`)

    res.status(201).json({
        id: result.insertId,
        title,
        description,
        image
    })

    connection.end()
}];

export const updatePost = [authMiddleware,authorizeAdmin, async (req,res) => {
    const id = parseInt(req.params.id)

    const { title, description, image } = req.body

    const connection = await pool()

    const [result] = await connection.query(`SELECT * FROM publicaciones WHERE id = ?`)

    if (result.length === 0) {
        return res.status(404).json( { msg: 'Tarea no encontrada' });
    };

    await connection.query(`
        UPDATE publicaciones SET title = ?, description = ?, image = ? WHERE id = ?`, [title, description, isCompleted, id]
    );

    res.status(201).json({
        id: id,
        title,
        description,
        image
    });

    connection.end();
}]; 

export const deletePost = [authMiddleware, authorizeAdmin, async (req,res) => {
    const id = parseInt(req.params.id);

    const connection = await pool();

    const [result] = await connection.query('SELECT * FROM publicaciones WHERE id = ?', [id]);
    
    if (result.length === 0) {
        return res.status(404).json( { msg: 'Tarea no encontrada' });
    };

    await connection.query(`
        DELETE FROM publicaciones WHERE id = ?`, [id]
    );

    res.status(200).json({ msg: 'Tarea eliminada' })

    connection.end();
}];