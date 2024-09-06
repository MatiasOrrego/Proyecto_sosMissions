import { newConnection } from '../database/db.js';
import { hashSync, compareSync } from 'bcrypt';
import { generarJWT } from '../helpers/generarJWT.js';


export const register = async (req, res) => {
    const { username, contrasenia, email, activo, fecha_registro } = req.body;

    const connection = await newConnection();

    const verificarUser = 'SELECT * FROM usuarios WHERE username = ? LIMIT 1'
    const [userExists] = await connection.query(verificarUser, [username]);

    if (userExists.length > 0) {
        return res.status(400).json({
            msg: 'El nombre de usuario ya existe'
            })
        }

    const sql = 'INSERT INTO usuarios (username, contrasenia, email, activo, fecha_registro) VALUES (?,?,?,true,CURRENT_DATE())';

    const hashContrasenia = hashSync(contrasenia, 10);

    await connection.query(sql, [username, hashContrasenia, email, activo, fecha_registro]);

    res.json({
        msg: 'Registrado correctamente'
    });
    connection.end()
}

export const login = async (req,res) => {
    const { username, contrasenia} = req.body;

    const connection = await newConnection();

    const sql = 'SELECT * FROM usuarios where username=? LIMIT 1';

    const [buscarUsuario] = await connection.query(sql, username);

    if(!buscarUsuario[0]) {
        return res.status(400).json({
            msg: 'El usuario no existe'
        })
    }
    const validarContrasenia = compareSync(contrasenia, buscarUsuario[0].contrasenia);

    if(!validarContrasenia) {
        return res.status(401).json({
            msg: 'El usuario o contraseña no coinciden'
        })
    }

    const token = await generarJWT(username[0].id);

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    });

    connection.end()
    return res.json({msg: 'Inicio de sesión exitoso'  })
};

export const session = async (req, res) => {
    if(req.session.id) {
        try {
            const connection = await newConnection();
            const [result] = await connection.query('SELECT id, username FROM usuarios WHERE id = ?', [req.session.id]);

            if (result.length > 0) {
                const user = result[0];
                return res.json({
                    loggedIn: true,
                    user: { id: user.id, username: user.username }
                });
            } else {
                return res.status(401).json({ loggedIn: false, msg: 'No hay sesión activa' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Error interno del servidor' })
        }
    } else {
        return res.status(401).json({ loggedIn: false, msg: 'No hay sesión activa' })
    }
}

export const logout = async (req,res) => {
        res.clearCookie('sid');
        return res.json({ msg: 'Sesión cerrada' })
    }