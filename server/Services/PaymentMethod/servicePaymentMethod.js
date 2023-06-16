const ConnectionDB = require("../../Database/ConnectionDB");

module.exports = {
    getPaymentMethod: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getPaymentMethodSQL = "SELECT * FROM metodopago WHERE ID_COMPRADOR = ? AND ID_METODOPAGO = ?"

            const idComprador = req.body["idComprador"]
            const idMetodoPago = req.body["idMetodoPago"]

            const resultSQL = await connection.execute(getPaymentMethodSQL, [idComprador,idMetodoPago]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "El Método de Pago asociado NO se encontró."});
            } else {
                const dataPaymentMethod = resultSQL[0];
                console.log(dataPaymentMethod)

                return res.status(200).send({PaymentMethod: dataPaymentMethod});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Método de Pago.'});
        }

    },
    getPaymentMethods: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getPaymentMethodsSQL = "SELECT * FROM metodopago WHERE ID_COMPRADOR = ?"

            const idComprador = req.body["idComprador"]

            const resultSQL = await connection.execute(getPaymentMethodsSQL, [idComprador]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No se encontraron Métodos de Pago asociados a " + idComprador + " ."});
            } else {
                const dataPaymentMethods = resultSQL[0];
                console.log(dataPaymentMethods)

                return res.status(200).send({PaymentMethods: dataPaymentMethods});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Métodos de Pago.'});
        }

    },
    insertPaymentMethod: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const insertPaymentMethodSQL = "INSERT INTO metodopago VALUES (NULL, ?,?,?,?,?,?)"

            const idComprador = req.body["idComprador"]
            const tipoMetodo = req.body["tipoMetodo"]
            const nombreTitular = req.body["nombreTitular"]
            const numeroTarjeta = req.body["numeroTarjeta"]
            const fechaVencimiento = req.body["fechaVencimiento"]
            const ccv = req.body["ccv"]

            await connection.execute(insertPaymentMethodSQL, [idComprador,tipoMetodo,nombreTitular,numeroTarjeta,fechaVencimiento,ccv]);
            return res.status(200).json({message: "Método de Pago ingresado con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al ingresar Método de Pago."});
        }

    },
    updatePaymentMethod: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const updatePaymentMethodSQL = "UPDATE metodopago SET TIPOMETODO = ?,NOMBRETITULAR = ?,NUMEROTARJETA = ?,FECHAVENCIMIENTO = ?,CCV = ? WHERE ID_METODOPAGO = ? AND ID_COMPRADOR = ?"

            const idMetodoPago = req.body["idMetodoPago"]
            const idComprador = req.body["idComprador"]
            const tipoMetodo = req.body["tipoMetodo"]
            const nombreTitular = req.body["nombreTitular"]
            const numeroTarjeta = req.body["numeroTarjeta"]
            const fechaVencimiento = req.body["fechaVencimiento"]
            const ccv = req.body["ccv"]

            const resultSQL = await connection.execute(updatePaymentMethodSQL, [tipoMetodo,nombreTitular,numeroTarjeta,fechaVencimiento,ccv,idMetodoPago,idComprador]);

            if(resultSQL[0].affectedRows>0){
                return res.status(200).json({message: "Método de Pago actualizado con éxito."});
            }else{
                return res.status(400).json({message: "Método de Pago NO actualizado. Datos inconsistentes."});
            }



        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al actualizar Método de Pago."});
        }

    },
    removePaymentMethod: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const removePaymentMethodSQL = "DELETE FROM metodopago WHERE ID_COMPRADOR = ? AND ID_METODOPAGO = ?"

            const idComprador = req.body["idComprador"]
            const idMetodoPago = req.body["idMetodoPago"]

            const resultSQL = await connection.execute(removePaymentMethodSQL, [idComprador,idMetodoPago]);

            if(resultSQL[0].affectedRows>0){
                return res.status(200).json({message: "Método de Pago eliminado con éxito."});
            }else{
                return res.status(400).json({message: "Método de Pago NO eliminado. Datos inconsistentes."});
            }


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar Método de Pago."});
        }

    },
    cleanPaymentMethods: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const removePaymentMethodSQL = "DELETE FROM metodopago WHERE ID_COMPRADOR = ?"

            const idComprador = req.body["idComprador"]

            await connection.execute(removePaymentMethodSQL, [idComprador]);
            return res.status(200).json({message: "Métodos de Pago eliminados con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar Métodos de Pago."});
        }

    }

}