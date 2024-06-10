const express = require("express");
const app = express();

app.use(express.json());

const { newConnection } = require("./db");

app.get('/', async (req, res) => {
    const connection = await newConnection();

    const result = await connection.query('SELECT * FROM cuenta');

    console.log(result);

    res.json(result[0]);

    connection.end();
})

app.get('/cuenta/:id_cuenta', async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id_cuenta

    const result = await connection.query('SELECT * FROM cuenta WHERE id_cuenta = ?', id_cuenta)

    res.status(200).json(result[0])

    connection.end()
})

//Crear un nuevo libro
app.post('/cuenta', async (req, res) => {

    const connection = await newConnection()

    const { username, contraseña, email, tipo_usuario, fecha_registro } = req.body

    connection.query(`INSERT INTO cuenta (username, contraseña, email, tipo_usuario, fecha_registro) values (?,?,?,?,?)`, [username, contraseña, email, tipo_usuario, fecha_registro])

    res.send("Usuario creado correctamente")

    connection.end()
})

// Actualizar un libro
app.patch('/cuenta/:id_cuenta', async (req, res) => {
    const connection = await newConnection();
    const id = req.params.id_cuenta;
    const { username, contraseña, email, tipo_usuario, fecha_registro } = req.body;

    try {
        const existingUser = await connection.query('SELECT * FROM cuenta WHERE id_cuenta = ?', id_cuenta);

        if (existingUser[0].length === 0) {
            return res.status(404).json({ error: 'El usuario no fue encontrado' });
        }

        if (username) {
            await connection.query('UPDATE cuenta SET username = ? WHERE id_cuenta = ?', [username, id_cuenta]);
        }
        if (contraseña) {
            await connection.query('UPDATE cuenta SET contraseña = ? WHERE id_cuenta = ?', [contraseña, id_cuenta]);
        }

        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
    } finally {
        connection.end();
    }
});





//Eliminar un libro
app.delete('/books/:id_cuenta', async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id_cuenta

    const result = await connection.query('DELETE FROM cuenta WHERE id = ?', id_cuenta)

    res.status(200).json(result[0])

    connection.end()
})

app.listen(3000);
console.log("servidor iniciado");