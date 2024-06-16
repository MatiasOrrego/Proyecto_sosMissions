const jwt = require('jsonwebtoken');
const { newConnection } = require('../database/db');

const validarJWT = async (token) => {
    try {
        const {id_usuario } = jwt.verify(token, 'mysecret');

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

module.exports = validarJWT;