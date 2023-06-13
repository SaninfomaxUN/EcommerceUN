const ConnectionDB = require("../../Database/ConnectionDB");

module.exports = {
    getAddress: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getAddressSQL = "SELECT * FROM direccion WHERE ID_COMPRADOR = ? AND ID_DIRECCION = ?"

            const idComprador = req.body["idComprador"]
            const idDireccion = req.body["idDireccion"]

            const resultSQL = await connection.execute(getAddressSQL, [idComprador,idDireccion]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "La dirección asociada NO se encontró."});
            } else {
                const dataAddress = resultSQL[0];
                console.log(dataAddress)

                return res.status(200).send({Address: dataAddress});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar dirección.'});
        }

    },
    getAddresses: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getAddressesSQL = "SELECT * FROM direccion WHERE ID_COMPRADOR = ?"

            const idComprador = req.body["idComprador"]

            const resultSQL = await connection.execute(getAddressesSQL, [idComprador]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No se encontraron direcciones asociadas a " + idComprador + " ."});
            } else {
                const dataAddresses = resultSQL[0];
                console.log(dataAddresses)

                return res.status(200).send({Addresses: dataAddresses});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar direcciones.'});
        }

    },
    insertAddress: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const insertAddressSQL = "INSERT INTO direccion VALUES (NULL, ?,...)"

            const idComprador = req.body["idComprador"]

            await connection.execute(insertAddressSQL, [idComprador,"..."]);
            return res.status(200).json({message: "Dirección ingresada con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al ingresar dirección."});
        }

    },
    updateAddress: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const updateAddressSQL = "UPDATE direccion SET ... WHERE ID_COMPRADOR = ? AND ID_DIRECCION = ?"

            const idComprador = req.body["idComprador"]
            const idDireccion = req.body["idDireccion"]

            await connection.execute(updateAddressSQL, ["...",idComprador,idDireccion]);
            return res.status(200).json({message: "Dirección actualizada con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al actualizar dirección."});
        }

    },
    removeAddress: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const removeAddressSQL = "DELETE FROM direccion WHERE ID_COMPRADOR = ? AND ID_DIRECCION = ?"

            const idComprador = req.body["idComprador"]
            const idDireccion = req.body["idDireccion"]

            await connection.execute(removeAddressSQL, [idComprador,idDireccion]);
            return res.status(200).json({message: "Dirección eliminada con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar dirección."});
        }

    },
    cleanAddresses: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const removeAddressesSQL = "DELETE FROM direccion WHERE ID_COMPRADOR = ?"

            const idComprador = req.body["idComprador"]

            await connection.execute(removeAddressesSQL, [idComprador]);
            return res.status(200).json({message: "Direcciones eliminadas con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar direcciones."});
        }

    }

}