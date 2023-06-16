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
            const insertAddressSQL = "INSERT INTO direccion VALUES (NULL,?,?,?,?,?,?,?)"

            const idComprador = req.body["idComprador"]
            const pais = req.body["pais"]
            const ciudad = req.body["ciudad"]
            const direccion = req.body["direccion"]
            const codigopostal = req.body["codigopostal"]
            const descripcion = req.body["descripcion"]
            const telefono = req.body["telefono"]

            await connection.execute(insertAddressSQL, [idComprador,pais,ciudad,direccion,codigopostal,descripcion,telefono]);
            return res.status(200).json({message: "Dirección ingresada con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al ingresar dirección."});
        }

    },
    updateAddress: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const updateAddressSQL = "UPDATE direccion SET PAIS = ?, CIUDAD = ?, DIRECCION = ?, CODIGOPOSTAL = ?, DESCRIPCION = ?, TELEFONO = ? WHERE ID_DIRECCION = ? AND ID_COMPRADOR = ?"

            const idDireccion = req.body["idDireccion"]
            const idComprador = req.body["idComprador"]
            const pais = req.body["pais"]
            const ciudad = req.body["ciudad"]
            const direccion = req.body["direccion"]
            const codigopostal = req.body["codigopostal"]
            const descripcion = req.body["descripcion"]
            const telefono = req.body["telefono"]

            const resultSQL = await connection.execute(updateAddressSQL, [pais,ciudad,direccion,codigopostal,descripcion,telefono,idDireccion,idComprador]);

            if(resultSQL[0].affectedRows>0){
                return res.status(200).json({message: "Dirección actualizada con éxito."});
            }else{
                return res.status(400).json({message: "Dirección NO actualizada. Datos inconsistentes."});
            }


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

            const resultSQL = await connection.execute(removeAddressSQL, [idComprador,idDireccion]);

            if(resultSQL[0].affectedRows>0){
                return res.status(200).json({message: "Dirección eliminada con éxito."});
            }else{
                return res.status(400).json({message: "Dirección NO eliminada. Datos inconsistentes."});
            }


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

    },
    getAddressSinceBack: async (idComprador,idDireccion) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getAddressSQL = "SELECT * FROM direccion WHERE ID_COMPRADOR = ? AND ID_DIRECCION = ?"

            const resultSQL = await connection.execute(getAddressSQL, [idComprador,idDireccion]);
            console.log(resultSQL[0])

            if (resultSQL[0].length < 1) {
                return false;
            } else {
                const dataAddress = resultSQL[0];
                console.log(dataAddress)

                return dataAddress;
            }
        } catch (error) {
            console.error(error);
            return false;
        }

    }

}