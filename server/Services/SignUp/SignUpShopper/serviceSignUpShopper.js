const ConnectionDB = require('../../../Database/ConnectionDB.js')
const mysql = require("mysql");
const bcrypt = require('bcrypt');


module.exports = {
    signUpNewShopper: async (req, res) => {
        const saltRounds = 10;

        const sql = "INSERT INTO comprador (id_Comprador, nombre, apellido, pais, telefono, fechaRegistro) VALUES (?, ?, ?, ?, ?, NOW())";
        const values = [
            req.body.idComprador,
            req.body.nombre,
            req.body.apellido,
            req.body.pais,
            req.body.telefono,
        ];

        const idComprador = req.body.idComprador;
        const email = req.body.email;
        const password = req.body.password;
        const sqlSelect = "SELECT COUNT(*) as count FROM credencialcomprador WHERE email = ?";
        const sqlInsert = "INSERT INTO credencialcomprador (id_Comprador, email, password) VALUES (?, ?, ?)";
        const valuesSelect = [email];

        try {
            const connection = ConnectionDB.getConnection();

            // Insert new record in the "comprador" table
            await connection.execute(sql, values);
            // Check if email is already registered
            const result = await connection.execute(sqlSelect, valuesSelect);
            const rows = result[0];
            if (Array.isArray(rows)) {
                console.log('El correo electrónico ya está registrado')
                return res.status(400).json({ message: 'El correo electrónico ya está registrado' });

            } else {
                // Hash password
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                // Insert new record in the "credencialcomprador" table with hashed password
                const valuesInsert = [idComprador, email, hashedPassword];
                await connection.execute(sqlInsert, valuesInsert);
                console.log('Usuario registrado correctamente')
                return res.status(200).json({ message: 'Usuario registrado correctamente' });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al registrar usuario'});
        }


    }
}
