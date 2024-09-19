import { pool } from '../database/db.js';
import { hashSync, compareSync } from 'bcrypt';
import { generarJWT } from '../helpers/generarJWT.js';

export const userController = { 
    register: async (req, res) => {
        const { username, contrasenia, email, fecha_registro } = req.body;

        const connection = await pool();

        const verificarUser = 'SELECT * FROM usuarios WHERE username = ? LIMIT 1';
        const [userExists] = await connection.query(verificarUser, [username]);

        if (userExists.length > 0) {
            return res.status(400).json({
                msg: 'El nombre de usuario ya existe'
            });
        }

        const sql = 'INSERT INTO usuarios (username, contrasenia, email, fecha_registro) VALUES (?,?,?,CURRENT_DATE())';
        const hashContrasenia = hashSync(contrasenia, 10);

        await connection.query(sql, [username, hashContrasenia, email, fecha_registro]);

        res.json({
            msg: 'Registrado correctamente'
        });
        connection.end();
    },

    login: async (req, res) => {
        const { username, contrasenia } = req.body;

        const connection = await pool();

        const sql = 'SELECT * FROM usuarios WHERE username = ? LIMIT 1';
        const [buscarUsuario] = await connection.query(sql, [username]);

        if (!buscarUsuario[0]) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }

        const validarContrasenia = compareSync(contrasenia, buscarUsuario[0].contrasenia);

        if (!validarContrasenia) {
            return res.status(401).json({
                msg: 'El usuario o contraseña no coinciden'
            });
        }

        // Establecer la sesión del usuario
        req.session.id_usuario = buscarUsuario[0].id_usuario;

        const token = await generarJWT({ id_usuario: buscarUsuario[0].id_usuario });
        return res.json({
            msg: 'Inicio de sesión exitoso',
            token
        });
    },

    session: async (req, res) => {
        if (req.session.id_usuario) {
            try {
                const connection = await pool();
                const [rows] = await connection.query('SELECT id_usuario, username FROM usuarios WHERE id_usuario = ?', [req.session.id_usuario]);

                if (rows.length > 0) {
                    const user = rows[0];
                    return res.json({ 
                        loggedIn: true, 
                        user: { id: user.id_usuario, username: user.username } 
                    });
                } else {
                    return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error del servidor' });
            }
        } else {
            return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
        }
    },

    logout: async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar sesión' });
            }
            res.clearCookie('sid');
            return res.json({ message: 'Sesión cerrada' });
        });
    }
};

export default controller;