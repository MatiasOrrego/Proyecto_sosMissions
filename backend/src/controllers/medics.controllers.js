import { conn } from '../database/db.js';
import { hashSync, compareSync } from 'bcrypt';
import { createJwt } from '../helpers/createJwt.js';

export const medicController = {
    register: async (req, res) => {
        const { username, contrasenia, email, fecha_registro } = req.body;

        try {
            const connection = await conn();

            const verificarMedico = 'SELECT * FROM medicos WHERE username = ? LIMIT 1';
            const [medicoExists] = await connection.query(verificarMedico, [username]);

            if (medicoExists.length > 0) {
                connection.end();
                return res.status(400).json({
                    msg: 'El nombre de usuario ya existe'
                });
            }

            const sql = 'INSERT INTO medicos (username, contrasenia, email, fecha_registro) VALUES (?,?,?,CURRENT_DATE())';
            const hashContrasenia = hashSync(contrasenia, 10);

            await connection.query(sql, [username, hashContrasenia, email, fecha_registro]);

            res.json({
                msg: 'Registrado correctamente'
            });
            connection.end();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error del servidor' });
        }
    },

    login: async (req, res) => {
        const { username, contrasenia } = req.body;

        try {
            const connection = await conn();

            const sql = 'SELECT * FROM medicos WHERE username = ? LIMIT 1';
            const [buscarMedico] = await connection.query(sql, [username]);

            if (!buscarMedico[0]) {
                connection.end();
                return res.status(400).json({
                    msg: 'El usuario no existe'
                });
            }

            const validarContrasenia = compareSync(contrasenia, buscarMedico[0].contrasenia);

            if (!validarContrasenia) {
                connection.end();
                return res.status(401).json({
                    msg: 'El usuario o contraseña no coinciden'
                });
            }

            req.session.id_medico = buscarMedico[0].id_medico;

            const token = await createJwt({ id_medico: buscarMedico[0].id_medico });
            connection.end();
            return res.json({
                msg: 'Inicio de sesión exitoso',
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error del servidor' });
        }
    },

    session: async (req, res) => {
        if (req.session.id_medico) {
            try {
                const connection = await conn();
                const [rows] = await connection.query('SELECT id_usuario, username FROM usuarios WHERE id_usuario = ?', [req.session.id_medico]);

                if (rows.length > 0) {
                    const medicos = rows[0];
                    connection.end();
                    return res.json({
                        loggedIn: true,
                        user: { id: medicos.id_usuario, username: medicos.username }
                    });
                } else {
                    connection.end();
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

export default medicController;