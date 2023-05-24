const ConnectionDB = require('../../../Database/ConnectionDB.js')
const bcrypt = require('bcrypt');


module.exports = {
    checkExistingSeller: async (req, res) => {

        const sqlVerifyId = "SELECT * FROM credencialvendedor WHERE id_vendedor = ?";
        const sqlVerifyEmail = "SELECT * FROM credencialvendedor WHERE email = ?";


        try {
            const connection = await ConnectionDB.getConnection();
            const id = [req.body.nit]


            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);

            if (resultId[0].length > 0) {
                console.log('El NIT o Número de Cédula ya se encuentra registrado.')
                return res.status(400).json({message: "El NIT o Número de Identificación " + req.body.nit + " ya se encuentra registrado."});
            } else {

                // Check if email is already registered
                const resultEmail = await connection.execute(sqlVerifyEmail, [req.body.email]);
                if (resultEmail[0].length > 0) {
                    console.log('El correo electrónico ya se encuentra está registrado')
                    return res.status(400).json({message: "El Correo electrónico " + req.body.email + " ya se encuentra está registrado."});
                }

                console.log('Vendedor No existe. Continuar.')
                return res.status(200).json();
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al registrar vendedor.'});
        }

    },
    signUpNewSeller: async (req, res) => {

        const insertSellerCredentials = "INSERT INTO credencialvendedor (id_vendedor, email, password) VALUES (?, ?, ?)";
        const insertSeller = "INSERT INTO vendedor (id_vendedor, nombre, apellido, nit, telefono, pais, direccionPersonal, razonSocial, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";

        const dataSeller = [
            req.body.nit,
            req.body.nombre,
            req.body.apellido,
            req.body.nit,
            req.body.telefono,
            req.body.pais,
            req.body.direccionPersonal,
            req.body.razonSocial,
        ];

        const idVendedor = req.body.nit;
        const email = req.body.email;
        const password = req.body.password;


        try {
            const connection = await ConnectionDB.getConnection();

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new record in the "vendedor" table
            await connection.execute(insertSeller, dataSeller);


            // Insert new record in the "credencialvendedor" table with hashed password
            const credentials = [idVendedor, email, hashedPassword];
            await connection.execute(insertSellerCredentials, credentials);




            console.log('Vendedor registrado correctamente')
            return res.status(200).json({message: 'Vendedor registrado correctamente'});

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al registrar usuario'});

        }

    }
}
