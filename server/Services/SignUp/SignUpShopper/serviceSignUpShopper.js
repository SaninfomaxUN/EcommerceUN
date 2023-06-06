const ConnectionDB = require('../../../Database/ConnectionDB.js')
const bcrypt = require('bcrypt');


module.exports = {
    checkExistingShopper: async (req, res) => {
        const sqlVerifyId = "SELECT * FROM credencialcomprador WHERE id_comprador = ?";
        const sqlVerifyEmail = "SELECT * FROM credencialcomprador WHERE email = ?";
        try {
            const connection = await ConnectionDB.getConnection();
            const id = [req.body.idComprador]


            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);

            if (resultId[0].length > 0) {
                console.log('El Número de Cédula ya se encuentra registrado.')
                return res.status(400).json({message: "El Número de Identificación " + req.body.idComprador + " ya se encuentra registrado."});
            } else {

                // Check if email is already registered
                const resultEmail = await connection.execute(sqlVerifyEmail, [req.body.email]);
                if (resultEmail[0].length > 0) {
                    console.log('El correo electrónico ya se encuentra está registrado')
                    return res.status(400).json({message: "El Correo electrónico " + req.body.email + " ya se encuentra está registrado."});
                }

                return res.status(200).json();
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al registrar usuario'});
        }

    },
    signUpNewShopper: async (req, res) => {

        const insertShopperCredentials = "INSERT INTO credencialcomprador (id_Comprador, email, password) VALUES (?, ?, ?)";
        const insertShopper = "INSERT INTO comprador (id_Comprador, nombre, apellido, pais, telefono, fechaRegistro) VALUES (?, ?, ?, ?, ?, NOW())";

        const dataShopeer = [
            req.body.idComprador,
            req.body.nombre,
            req.body.apellido,
            req.body.pais,
            req.body.telefono,
        ];

        const idComprador = req.body.idComprador;
        const email = req.body.email;
        const password = req.body.password;


        try {
            const connection = await ConnectionDB.getConnection();

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new record in the "comprador" table
            await connection.execute(insertShopper, dataShopeer);

            // Insert new record in the "credencialcomprador" table with hashed password
            const credentials = [idComprador, email, hashedPassword];
            await connection.execute(insertShopperCredentials, credentials);




            console.log('Usuario registrado correctamente')
            return res.status(200).json({message: 'Usuario registrado correctamente'});

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al registrar usuario'});
        }


    }
}