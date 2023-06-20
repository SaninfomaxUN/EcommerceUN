const ConnectionDB = require("../../Database/ConnectionDB");


module.exports = {
    getSales: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getSalesSQL = "SELECT producto.ID_PRODUCTO, producto.ID_VENDEDOR, producto.N_PRODUCTO, producto.IMAGEN, COALESCE(SUM(listapedido.CANTIDAD), 0) AS TOTAL_VENDIDOS, producto.PRECIOFINAL, COALESCE(SUM(listapedido.PRECIOTOTAL), 0) AS TOTAL_VENTAS, producto.PRECIOBASE AS PRECIO_NETO, COALESCE(SUM(ROUND(listapedido.PRECIOTOTAL * ? * ?)), 0) AS GANANCIAS FROM producto LEFT JOIN listapedido ON listapedido.ID_PRODUCTO = producto.ID_PRODUCTO WHERE producto.ID_VENDEDOR = ? GROUP BY producto.ID_PRODUCTO;"

            const idVendedor = req.body["idVendedor"]
            const impuesto = 1 - 0.19
            const comision = 1 - 0.05

            const resultSQL = await connection.execute(getSalesSQL, [impuesto, comision, idVendedor]);
            //console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No se encontraron ventas asociadas a " + idVendedor + "."});
            } else {
                const dataSales = resultSQL[0];
                console.log(dataSales)

                return res.status(200).send({Sales: dataSales});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar ventas.'});
        }
    },
    getSalesByProduct: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getSalesByProductSQL = "SELECT producto.ID_PRODUCTO, producto.ID_VENDEDOR, producto.N_PRODUCTO, producto.IMAGEN, COALESCE(SUM(listapedido.CANTIDAD), 0) AS TOTAL_VENDIDOS, producto.PRECIOFINAL, COALESCE(SUM(listapedido.PRECIOTOTAL), 0) AS TOTAL_VENTAS, producto.PRECIOBASE AS PRECIO_NETO, COALESCE(SUM(ROUND(listapedido.PRECIOTOTAL * ? * ?)), 0) AS GANANCIAS FROM producto LEFT JOIN listapedido ON listapedido.ID_PRODUCTO = producto.ID_PRODUCTO WHERE producto.ID_VENDEDOR = ? AND producto.ID_PRODUCTO = ? GROUP BY producto.ID_PRODUCTO;"

            const idVendedor = req.body["idVendedor"]
            const idProducto = req.body["idProducto"]
            const impuesto = 1 - 0.19
            const comision = 1 - 0.05

            const resultSQL = await connection.execute(getSalesByProductSQL, [impuesto, comision, idVendedor, idProducto]);
            //console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No se encontraron ventas asociadas al producto " + idProducto + "."});
            } else {
                const dataSalesByProduct = resultSQL[0];
                console.log(dataSalesByProduct)

                return res.status(200).send({SalesByProduct: dataSalesByProduct});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar ventas.'});
        }
    }
}