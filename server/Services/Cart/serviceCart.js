const ConnectionDB = require("../../Database/ConnectionDB");
const serviceProduct = require("../Product/serviceProduct")

module.exports = {
    getCart: async (req, res) => {
        const sqlVerifyId = "SELECT * FROM carritocompras WHERE id_comprador = ?";
        try {
            const connection = await ConnectionDB.getConnection();
            const id = [req.body.idComprador]

            console.log(req.body.idComprador)

            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);
            if (resultId[0].length < 1) {
                return res.status(400).json({message: "No hay un carrito almacenado asociado a " + req.body.nit + " ."});
            } else {

                const rowCart = resultId[0];

                const listIDProducts = rowCart[0].LISTAPRODUCTOS.split("$#")
                let listProducts = []

                for (const idProduct of listIDProducts) {
                    await serviceProduct.getProductSinceBack({idProducto: idProduct})
                        .then(data => {
                            listProducts.push(data)
                        }).catch(error => {
                            console.log(error)
                        })
                }

                //console.log(listProducts);
                return res.status(200).send({Cart: rowCart, Products: listProducts});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar carrito.'});
        }

    }

}