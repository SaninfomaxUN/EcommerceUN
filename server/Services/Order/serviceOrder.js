const ConnectionDB = require("../../Database/ConnectionDB");

module.exports = {
    getOrder: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador

            const resultSQL = await connection.execute("SQL", "Parameters");
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No hay un pedido asociado a " + ""+ " ."});
            } else {
                const dataOrder = resultSQL[0];
                console.log(dataOrder)

                return res.status(200).send({Address: dataOrder});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar pedido.'});
        }

    },
    getOrders: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador

            const resultSQL = await connection.execute("SQL", [idComprador]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No hay pedidos asociados a " + ""+ " ."});
            } else {
                const dataOrders = resultSQL[0];
                console.log(dataOrders)

                return res.status(200).send({Addresses: dataOrders});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar pedidos.'});
        }

    },
    insertOrder: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador

            await connection.execute("SQL", [idComprador]);
            return res.status(200).json({message: "Pedido ingresado con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al ingresar pedido."});
        }

    },
    removeOrder: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();


            await connection.execute("SQL", "Parameters");
            return res.status(200).json({message: "Pedido eliminado con éxito."});


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar pedido."});
        }

    }

}