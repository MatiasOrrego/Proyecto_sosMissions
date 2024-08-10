import { createConnection } from "mysql2/promise";

export const newConnection = async () => {
    return await createConnection({
        host:"localhost",
        user: "root",
        password: '',
        database: "sosmissions"
    })
}