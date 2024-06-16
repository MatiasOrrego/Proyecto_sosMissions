const jwt = require('jsonwebtoken');

const generarJWT = (id_usuario) => {
    return new Promise((resolve, reject) => {
        jwt.sign(id_usuario, 'mysecret', {
            expiresIn: 60*60
        }, (err, token) => {
            (err)?reject(err):resolve(token);
        })
    })
}

module.exports = generarJWT;