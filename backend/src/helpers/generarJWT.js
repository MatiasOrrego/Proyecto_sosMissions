import pkg from 'jsonwebtoken';
const { sign } = pkg

export const generarJWT = (id_usuario) => {
    return new Promise((resolve, reject) => {
        sign(id_usuario, 'mysecret', {
            expiresIn: 60*60
        }, (err, token) => {
            (err)?reject(err):resolve(token);
        })
    })
}