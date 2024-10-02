import { createPool } from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PORT, DB_USER } from "../../config/config.js";

const createMyPoolConnection = () => {
    try {
        const pool = createPool({
            host: DB_HOST,
            database: DB_NAME,
            user: DB_USER,
            port: DB_PORT
        })
        return pool;
    } catch (error) {
        console.error('Hubo un error al conectarse con la base de datos')
    }
}

const conn = createMyPoolConnection();

export { conn };