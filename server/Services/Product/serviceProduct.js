const ConnectionDB = require("../../Database/ConnectionDB");


module.exports = {

    getProduct: async (req, res) => {
        const sqlVerifyId = "SELECT * FROM producto WHERE id_producto = ?";
        try {
            const connection = await ConnectionDB.getConnection();
            const id = [req.body.idProducto]

            console.log(req.body.idProducto)

            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);
            console.log(resultId[0])
            if (resultId[0].length < 1) {
                return res.status(400).json({message: "El Producto " + req.body.nit + " no se encuentra registrado."});
            } else {

                const row = resultId[0];
                console.log(row)
                console.log("WWWWWWWWW")
                return res.status(200).send(row);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Producto.'});
        }

    }
}