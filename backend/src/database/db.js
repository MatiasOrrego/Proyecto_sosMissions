import mysql from "mysql2/promise";

export const pool = async () => {
    return await mysql.createPool ({
        host:"localhost",
        user: "root",
        password: '',
        database: "sosmissions"
    })
}