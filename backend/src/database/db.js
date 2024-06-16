const mysql = require("mysql2/promise");

const newConnection = async () => {
    return await mysql.createConnection({
        host:"localhost",
        user: "root",
        password: '',
        database: "sosmissions"
    })
}

module.exports = {
    newConnection
}