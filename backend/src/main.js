const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(require('./routes/users.routes'));
app.listen(3000, () => {
    console.log("Servidor iniciado");
})


const { newConnection } = require("./database/db");

app.get('/', async (req, res) => {
    const connection = await newConnection();

    const result = await connection.query('SELECT * FROM usuarios');

    console.log(result);

    res.json(result[0]);

    connection.end();
})

app.get('/usuarios/:id_usuario', async (req, res) => {
    const connection = await newConnection()
    const id = req.params.id_usuario

    const result = await connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', id_usuario)

    res.status(200).json(result[0])

    connection.end()
})

// const { verificarUser } = require("./src/controllers/users.controller");

// app.patch('/cuenta/:id_cuenta', async (req, res) => {
//     const connection = await newConnection();
//     const id = req.params.id_cuenta;
//     const { username, contraseña, email, tipo_usuario, fecha_registro } = req.body;

//     try {
//         const existingUser = await connection.query('SELECT * FROM cuenta WHERE id_cuenta = ?', id_cuenta);

//         if (existingUser[0].length === 0) {
//             return res.status(404).json({ error: 'El usuario no fue encontrado' });
//         }

//         if (username) {
//             await connection.query('UPDATE cuenta SET username = ? WHERE id_cuenta = ?', [username, id_cuenta]);
//         }
//         if (contraseña) {
//             await connection.query('UPDATE cuenta SET contraseña = ? WHERE id_cuenta = ?', [contraseña, id_cuenta]);
//         }

//         res.status(200).json({ message: 'Usuario actualizado correctamente' });
//     } catch (error) {
//         console.error('Error al actualizar el usuario:', error);
//         res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
//     } finally {
//         connection.end();
//     }
// });


// app.delete('/cuenta/:id_cuenta', async (req, res) => {
//     const connection = await newConnection()
//     const id = req.params.id_cuenta

//     const result = await connection.query('DELETE FROM cuenta WHERE id = ?', id_cuenta)

//     res.status(200).json(result[0])

//     connection.end()
// })

// app.get('/', (req, res) => {
//     res.sendFile('registro.html', { root: '../' })
// });



