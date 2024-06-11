const verifcarUser =()=> {
    app.post('/cuenta', async (req, res) => {

        const connection = await newConnection()
    
        const { username, contraseña, email, tipo_usuario, fecha_registro } = req.body
    
        connection.query(`INSERT INTO cuenta (username, contraseña, email, tipo_usuario, fecha_registro) values (?,?,?,?,?)`, [username, contraseña, email, tipo_usuario, fecha_registro])
    
        res.send("Usuario creado correctamente")
    
        connection.end()
    })
}

module.exports = {
    verifcarUser
}