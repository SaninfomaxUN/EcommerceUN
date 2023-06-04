const ConnectionDB = require("../../Database/ConnectionDB");
const serviceProduct = require("../Product/serviceProduct")

const sqlGetQuantityByID = async (connection, idComprador) => {
    const sqlGetCart = "SELECT * FROM carritocompras WHERE id_comprador = ?";
    const resultId = await connection.execute(sqlGetCart, [idComprador] );

    if (resultId[0].length < 1) {
        return [false,false];
    } else {
        const rowCart = resultId[0];
        let dicQuantity = {}
        const listIDQuantity = rowCart[0].LISTAPRODUCTOS.split(";;")
        if (listIDQuantity.length !== 1 && listIDQuantity[0] !== "") {
            for (const arrayQuantityProduct of listIDQuantity) {
                dicQuantity[arrayQuantityProduct.split("##")[0]] = arrayQuantityProduct.split("##")[1];
            }

        }
        return [rowCart, dicQuantity];
    }
}

const sqlUpdateQuantityByID = async (connection, idComprador, updatedListStr) => {
    const sqlUpdateCart = "UPDATE carritocompras SET listaproductos = ? WHERE id_comprador = ?";
    await connection.execute(sqlUpdateCart, [updatedListStr, idComprador] , (err, result) => {
        if (err) {
            console.error(err);
            return false;
        }

        const affectedRows = result.affectedRows;
        console.log(`Se actualizaron ${affectedRows} filas.`);
        return true
    });
    return true
}

const updateList = async (connection, idComprador, idProducto, newQuantity) => {
    let [, dicQuantity] = await sqlGetQuantityByID(connection, idComprador)
    dicQuantity[idProducto] = newQuantity
    return joinDicQuantity(dicQuantity)
}

const joinDicQuantity = (dicQuantity) => {
    let updatedListStr = '';

    for (let idProducto in dicQuantity) {
        updatedListStr += idProducto + '##' + dicQuantity[idProducto] + ';;';
    }
    return updatedListStr.slice(0, -2);
}

module.exports = {
    getCart: async (req, res) => {

        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador

            //console.log(req.body.idComprador)

            // Check if id is already registered
            let [dataCart, dicQuantity] = await sqlGetQuantityByID(connection, idComprador)
            if (!dataCart) {
                return res.status(400).json({message: "No hay un carrito almacenado asociado a " + req.body.idComprador + " ."});
            } else {

                let listProducts = []
                //console.log(dicQuantity)
                for (let idProduct in dicQuantity) {
                    if (dicQuantity.hasOwnProperty(idProduct)) {
                        await serviceProduct.getProductSinceBack({idProducto: idProduct})
                            .then(data => {
                                data.CANTIDAD = dicQuantity[idProduct];
                                listProducts.push(data);
                            }).catch(error => {
                                console.log(error)
                            })
                    }
                }

                //console.log(listProducts);
                return res.status(200).send({Cart: dataCart, Products: listProducts});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar carrito.'});
        }

    },
    updateProductCart: async (req, res) => {

        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador
            const idProducto = req.body.idProducto
            const newQuantity = req.body.newQuantity

            console.log(req.body.idComprador)

            let updatedListStr = await updateList(connection, idComprador, idProducto, newQuantity)
            if (!updatedListStr) {
                return res.status(400).json({message: "No se pudo actualizar el producto " + idProducto + " .\nDatos incorrectos."});
            }

            if (!await sqlUpdateQuantityByID(connection, idComprador, updatedListStr)) {
                return res.status(400).json({message: "No se pudo actualizar el producto " + idProducto + " ."});
            } else {
                return res.status(200).json({message: "Producto " + idProducto + " actualizado correctamente."});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar carrito.'});
        }

    },
    cleanCart: async (req, res) => {

        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador

            console.log(req.body.idComprador)

            if (!await sqlUpdateQuantityByID(connection, idComprador, "")) {
                return res.status(400).json({message: "No se pudo limpiar el carrito asociado a " + idComprador + " ."});
            } else {
                return res.status(200).json({message: "Carrito asociado a " + idComprador + " limpiado correctamente."});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar carrito.'});
        }

    }

}