const ConnectionDB = require("../../Database/ConnectionDB");
const bcrypt = require("bcrypt");

const doSetQuery = async (sqlSetNewCredential, email, newPassword) => {
    try {

        const connection = await ConnectionDB.getConnection();

        // Hash password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        const credentials = [newHashedPassword,email];
        await connection.execute(sqlSetNewCredential, credentials);

        return true;


    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    doRecoverPasswordShopper: async (req, res) => {
        const sqlSetNewCredentialShopper = "UPDATE credencialcomprador SET password=? WHERE email = ?";

        if(await doSetQuery(sqlSetNewCredentialShopper,req.body.email,req.body.newPassword)){
            console.log('Contraseña Actualizada correctamente!')
            return res.status(200).json({message: 'Contraseña actualizada correctamente!'});
        }

        return res.status(500).json({message: 'Error al actualizar contraseña!'});

    },
    doRecoverPasswordSeller: async (req, res) => {
        const sqlSetNewCredentialSeller = "UPDATE credencialvendedor SET password=? WHERE email = ?";


        if(await doSetQuery(sqlSetNewCredentialSeller,req.body.email,req.body.newPassword)){
            console.log('Contraseña Actualizada correctamente!')
            return res.status(200).json({message: 'Contraseña actualizada correctamente!'});
        }

        return res.status(500).json({message: 'Error al actualizar contraseña!'});

    }
}