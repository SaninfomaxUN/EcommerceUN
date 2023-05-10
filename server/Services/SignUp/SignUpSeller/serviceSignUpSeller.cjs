const ConnectionDB = require('../../../Database/ConnectionDB.cjs')

module.exports = {
    signUpNewSeller: async (req, res) => {

            const sql = "INSERT INTO vendedor (nombre, apellido, nit, telefono, pais, direccionPersonal, razonSocial, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";

            const email = req.body.email;
            const password = req.body.password;
            const sqlSelect = "SELECT COUNT(*) as count FROM credencialvendedor WHERE email = ?";
            const sqlInsert = "INSERT INTO credencialvendedor (email, password) VALUES (?, ?)";
            const valuesSelect = [email];
            const valuesInsert = [email, password];

            const values = [
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
            const [rows] = await connection.execute(sqlSelect, valuesSelect);
            if (rows[0].count > 0) {
                return res.status(400).json({message: 'El correo electrónico ya está registrado'});

            } else {
                // Insert new record in the "credencialcomprador" table
                await connection.execute(sqlInsert, valuesInsert);
                return res.status(200).json({message: 'Usuario registrado correctamente'});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al registrar usuario'});

        }

    }
}
