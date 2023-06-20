const ConnectionDB = require("../../../Database/ConnectionDB");

module.exports = {
    getSeller: async (req,res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getProfileSellerSQL = "SELECT vendedor.ID_VENDEDOR, vendedor.NOMBRE, vendedor.APELLIDO, vendedor.NIT, vendedor.TELEFONO, vendedor.PAIS, vendedor.DIRECCIONPERSONAL, vendedor.RAZONSOCIAL, credencialvendedor.EMAIL FROM vendedor INNER JOIN credencialvendedor ON vendedor.id_vendedor = credencialvendedor.id_vendedor WHERE vendedor.ID_VENDEDOR = ?"

            const idVendedor = req.body["idVendedor"]

            const resultSQL = await connection.execute(getProfileSellerSQL, [idVendedor]);
            //console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "El Vendedor NO se encontró."});
            } else {
                const dataProfileSeller = resultSQL[0];

                return res.status(200).send({DataSeller: dataProfileSeller[0]});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Vendedor.'});
        }
    },
    getSellerSinceBack: async (idVendedor) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getProfileSellerSQL = "SELECT vendedor.ID_VENDEDOR, vendedor.NOMBRE, vendedor.APELLIDO, vendedor.NIT, vendedor.TELEFONO, vendedor.PAIS, vendedor.DIRECCIONPERSONAL, vendedor.RAZONSOCIAL, credencialvendedor.EMAIL FROM vendedor INNER JOIN credencialvendedor ON vendedor.id_vendedor = credencialvendedor.id_vendedor WHERE vendedor.ID_VENDEDOR = ?"

            const resultSQL = await connection.execute(getProfileSellerSQL, [idVendedor]);
            //console.log(resultSQL[0])

            if (resultSQL[0].length < 1) {
                return null;
            } else {
                const dataProfileSeller = resultSQL[0];
                return  dataProfileSeller[0];
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    updateSeller: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const updateProfileSellerSQL = "UPDATE vendedor INNER JOIN credencialvendedor ON vendedor.id_vendedor = credencialvendedor.id_vendedor SET vendedor.NOMBRE = ?, vendedor.APELLIDO = ?, vendedor.NIT = ?, vendedor.TELEFONO = ?, vendedor.DIRECCIONPERSONAL = ?, vendedor.RAZONSOCIAL = ?, credencialvendedor.EMAIL = ? WHERE vendedor.ID_VENDEDOR = ?"

            const idVendedor = req.body["idVendedor"]
            const nombre = req.body["nombre"]
            const apellido = req.body["apellido"]
            const nit = req.body["nit"]
            const telefono = req.body["telefono"]
            const direccionPersonal = req.body["direccionPersonal"]
            const razonSocial = req.body["razonSocial"]
            const email = req.body["email"]

            const resultSQL = await connection.execute(updateProfileSellerSQL, [nombre, apellido, nit, telefono, direccionPersonal, razonSocial, email, idVendedor]);

            if (resultSQL[0].affectedRows > 0) {
                return res.status(200).json({message: "Vendedor actualizado con éxito."});
            } else {
                return res.status(400).json({message: "Vendedor NO actualizado. Datos inconsistentes."});
            }


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al actualizar Vendedor."});
        }
    }

}