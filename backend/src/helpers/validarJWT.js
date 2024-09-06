import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/config.js';
import { newConnection } from '../database/db.js';
import { json } from 'express';

export const validarJWT = async (req,res,next) => {
    console.log(req.session);
    console.log('----------');
    console.log(req.cookies);

    const token = req.cookies.authToken || req.session.token

    if (!token) {
        return res.status(403).json({ msg: 'Token no proporcionado' })
    }
    
    try {

        const decoded = jwt.verify(token, SECRET_KEY);

        const connection = await newConnection();

        const [user] = await connection.query('SELECT * FROM usuarios WHERE id = ? LIMIT 1', [decoded.id]);

        if (user.length === 0) {
            connection.end();
            return res.status(401).json({ msg: 'Token inválido' })
        }

        req.user = user[0];

        connection.end()

        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error interno del servidor', error:error.msg });
    }
}