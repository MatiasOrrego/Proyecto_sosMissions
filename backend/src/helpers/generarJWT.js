import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../../config/config.js';

export const generarJWT = (id) => {
    return new Promise((resolve, reject) => {

        const payload = { id };
        jwt.sign( payload, SECRET_KEY, {
            expiresIn: '5h',

        }, (error, token) => {
            if (error) {
                console.log( error)
                reject('No se pudo generar el token')
            } else {
                resolve (token)
            }
        } )
    })
}