const ConnectionDB = require("../../Database/ConnectionDB");


module.exports = {
    searchProduct: async (req, res) => {
        const sqlVerifyId = "SELECT * FROM producto WHERE n_producto LIKE CONCAT('%',?,'%') AND estado = 'ACTIVO'";
        try {
            const connection = await ConnectionDB.getConnection();
            const toSearch = [req.body.toSearch]

            console.log(req.body.toSearch)


            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, toSearch);

            if (resultId[0].length < 1) {
                return res.status(400).json({message: "Busqueda " + req.body.toSearch + " no encontrada."});
            } else {

                const map = resultId[0];
                console.log(map)
                console.log("#######")
                return res.status(200).send(map);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al realizar busqueda.'});
        }

    },
    searchAllProduct: async (req, res) => {
        const sqlVerifyId = "SELECT * FROM producto";
        try {
            const connection = await ConnectionDB.getConnection();

            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId);

            if (resultId[0].length < 1) {
                return res.status(400).json({message: "Busqueda " + req.body.toSearch + " no encontrada."});
            } else {

                const map = resultId[0];
                console.log(map)
                return res.status(200).send(map);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al realizar busqueda.'});
        }

    }
}