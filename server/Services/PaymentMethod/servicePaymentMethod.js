const ConnectionDB = require("../../Database/ConnectionDB");

module.exports = {
    getPaymentMethod: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador

            const resultSQL = await connection.execute("SQL", "Parameters");
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No hay un Metodo de Pago asociado a " + ""+ " ."});
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
            const idComprador = req.body.idComprador

            const resultSQL = await connection.execute("SQL", [idComprador]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No hay Métodos de Pago asociados a " + ""+ " ."});
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
            const idComprador = req.body.idComprador

            await connection.execute("SQL", [idComprador]);
            return res.status(200).json({message: "Método de Pago ingresado con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al ingresar Método de Pago."});
        }

    },
    updatePaymentMethod: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();


            await connection.execute("SQL", "Parameters");
            return res.status(200).json({message: "Método de Pago actualizado con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al actualizar Método de Pago."});
        }

    },
    removePaymentMethod: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();


            await connection.execute("SQL", "Parameters");
            return res.status(200).json({message: "Método de Pago eliminado con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar Método de Pago."});
        }

    },
    cleanPaymentMethods: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador

            await connection.execute("SQL", [idComprador]);
            return res.status(200).json({message: "Métodos de Pago eliminados con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar Métodos de Pago."});
        }

    }

}