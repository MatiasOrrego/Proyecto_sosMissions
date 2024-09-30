
import dotenv from 'dotenv';

dotenv.config()

export const SECRET_KEY = process.env.SECRET_KEY

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const DB_USER = 'root';
export const DB_NAME = 'sosmissions';
export const DB_PORT = 3306;
export const DB_HOST = 'localhost';