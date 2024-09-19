import { verify } from 'jsonwebtoken';
import { newConnection } from '../database/db.js';

export const validarJWT = async (token) => {
    try {
        const { id_usuario } = verify(token, 'mysecret');

        const connection = await newConnection();

        const [username] = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ? LIMIT 1', id_usuario);

        if(!username) {
            return false;
        } else {
            return username[0];
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const validarJWTMedico = async (token) => {
    try {
        const { id_medico } = verify(token, 'mysecret');

        const connection = await newConnection();

        const [medico] = await connection.query('SELECT * FROM medicos WHERE id_medico = ? LIMIT 1', id_medico);

        if (!medico) {
            return false;
        } else {
            return medico[0];
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}