const { newConnection } = require('../database/db');
const bcrypt = require('bcrypt');
const generarJWT = require('../helpers/generarJWT');

const ctrl = {};

ctrl.register = async (req, res) => {
    const { username, contrasenia, email, fecha_registro } = req.body;

    const connection = await newConnection();

    const sql = 'INSERT INTO usuarios (username, contrasenia, email, fecha_registro) VALUES (?,?,?,CURRENT_DATE())';

    const hashContrasenia = bcrypt.hashSync(contrasenia, 10);

    await connection.query(sql, [username, hashContrasenia, email, fecha_registro]);

    res.json({
        msg: 'Registrado correctamente'
    });
    connection.end()
}

ctrl.login = async (req,res) => {
    const { username, contrasenia} = req.body;

    const connection = await newConnection();

    const sql = 'SELECT * FROM usuarios where username=? LIMIT 1';

    const [buscarUsuario] = await connection.query(sql, username);

    if(!buscarUsuario[0]) {
        return res.status(400).json({
            msg: 'El usuario no existe'
        })
    }
    const validarContrasenia = bcrypt.compareSync(contrasenia, buscarUsuario[0].contrasenia);

    if(!validarContrasenia) {
        return res.status(401).json({
            msg: 'El usuario o contraseña no coinciden'
        })
    }

    const token = await generarJWT({id_usuario: buscarUsuario[0].id_usuario});
    return res.json({
        msg: 'Inicio de sesión exitoso',
        token
    })
}

module.exports = {
    ctrl
}

// const insertUser =()=> {
//     app.post('/cuenta', async (req, res) => {

//         const connection = await newConnection()
    
//         const { username, contraseña, email, tipo_usuario, fecha_registro } = req.body
    
//         connection.query(`INSERT INTO cuenta (username, contraseña, email, tipo_usuario, fecha_registro) values (?,?,?,?,?)`, [username, contraseña, email, tipo_usuario, fecha_registro])
    
//         res.send("Usuario creado correctamente")
    
//         connection.end()
//     })
// }

