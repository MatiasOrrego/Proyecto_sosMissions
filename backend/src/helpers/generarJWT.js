import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/config.js';

// Función para crear un JWT
export const createJwt = async (userId) => {
  return new Promise((res, rej) => {
    jwt.sign({ userId }, SECRET_KEY, (err, token) => {
      if (err) {
        rej(err);
      }
      res(token);
    });
  });
};
