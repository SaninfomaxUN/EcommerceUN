const ConnectionDB = require('../../../Database/ConnectionDB.js')
const mysql = require("mysql");
const bcrypt = require('bcrypt');
module.exports = {
    signUpNewSeller: async (req, res) => {
        const saltRounds = 10;
            const sql = "INSERT INTO vendedor (id_vendedor, nombre, apellido, nit, telefono, pais, direccionPersonal, razonSocial, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";

            const idVendedor = req.body.nit;
            const email = req.body.email;
            const password = req.body.password;
            const sqlSelect = "SELECT COUNT(*) as count FROM credencialvendedor WHERE email = ?";
            const sqlInsert = "INSERT INTO credencialvendedor (id_vendedor, email, password) VALUES (?, ?, ?)";
            const valuesSelect = [email];
            

            const values = [
                req.body.nit,
                req.body.nombre,
                req.body.apellido,
                req.body.nit,
                req.body.telefono,
                req.body.pais,
                req.body.direccionPersonal,
                req.body.razonSocial,
            ];

        try {
            const connection = ConnectionDB.getConnection();

            // Insert new record in the "comprador" table
            await connection.execute(sql, values);
            // Check if email is already registered
            const result = await connection.execute(sqlSelect, valuesSelect);
            const rows = result[0];
            if (Array.isArray(rows)) {
                console.log('El correo electrónico ya está registrado')
                return res.status(400).json({message: 'El correo electrónico ya está registrado'});
            } else {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const valuesInsert = [idVendedor,email, hashedPassword];
                 // Insert new record in the "credencialcomprador" table
                await connection.execute(sqlInsert, valuesInsert);
                console.log('Usuario registrado correctamente')
                return res.status(200).json({message: 'Usuario registrado correctamente'});
            }
        } catch (error) {
            console.error(error);
            console.log('Error al registrar usuario')
            return res.status(500).json({message: 'Error al registrar usuario'});

        }

    }
}
