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
        if(rowCart[0]["LISTAPRODUCTOS"] != null){
            const listIDQuantity = rowCart[0]["LISTAPRODUCTOS"].split(";;")
            if (listIDQuantity[0] !== "") {
                for (const arrayQuantityProduct of listIDQuantity) {
                    let quantity = arrayQuantityProduct.split("##")[1]
                    if ( quantity > 0){
                        dicQuantity[arrayQuantityProduct.split("##")[0]] = quantity;
                    }

                }
            }
        }
        return [rowCart, dicQuantity];
    }
}

const sqlGetListByID = async (dicQuantity) => {
    let listProducts = []
    for (let idProduct in dicQuantity) {
        if (dicQuantity.hasOwnProperty(idProduct)) {
            await serviceProduct.getProductSinceBack({idProducto: idProduct})
                .then(data => {
                    data.CANTIDAD = dicQuantity[idProduct];
                    data.COSTOPACIAL = data.PRECIOFINAL * data.CANTIDAD
                    listProducts.push(data);
                }).catch(error => {
                    console.log(error)
                })
        }
    }
    return listProducts
}

const sqlUpdateQuantityByID = async (connection, idComprador, updatedListStr, dicQuantity) => {
    const sqlUpdateCart = "UPDATE carritocompras SET listaproductos = ? WHERE id_comprador = ?";
    const sqlUpdateTotal = "UPDATE carritocompras SET costoparcial = ? WHERE id_comprador = ?";

    const total = await calculateTotal(dicQuantity)

    try {
        // Ejecutar las consultas en paralelo
        const [resultUpdateSQLListProduct, resultUpdateSQLTotal] = await Promise.all([
            connection.execute(sqlUpdateCart, [updatedListStr, idComprador]),
            connection.execute(sqlUpdateTotal, [total, idComprador])
        ]);

        console.log('Resultados de la consulta 1:', resultUpdateSQLListProduct[0]);
        console.log('Resultados de la consulta 2:', resultUpdateSQLTotal[0]);
        return true
    } catch (error) {
        console.error('Error en alguna de las consultas:', error);
        return false;
    }
}

const calculateTotal = async (dicQuantity) => {
    let total = 0
    if(Object.keys(dicQuantity).length === 0){
        return total;
    }

    let listProducts = await sqlGetListByID(dicQuantity)

    for (let product of listProducts) {
        total = total + product['COSTOPACIAL']
    }
    return total
}

const updateList = async (connection, idComprador, idProducto, newQuantity) => {
    let [, dicQuantity] = await sqlGetQuantityByID(connection, idComprador)
    const existingProduct = await checkExistingProduct(idProducto)
    if (existingProduct){
        dicQuantity[idProducto] = newQuantity
        return [joinDicQuantity(dicQuantity),dicQuantity]
    }else{
        return false
    }

}

const checkExistingProduct = async (idProducto) => {
    let existingProduct = false
    await serviceProduct.getProductSinceBack({idProducto: idProducto})
        .then(res => {
            existingProduct = res;

        }).catch(error => {
            console.log(error)
        })
    return existingProduct
}

const joinDicQuantity = (dicQuantity) => {
    let updatedListStr = '';

    for (let idProducto in dicQuantity) {
        updatedListStr += idProducto + '##' + dicQuantity[idProducto] + ';;';
    }
    return updatedListStr.slice(0, -2);
}


const removeList = async (connection, idComprador, idProducto) => {
    let [, dicQuantity] = await sqlGetQuantityByID(connection, idComprador)
    if(!dicQuantity.hasOwnProperty(idProducto)){
        return [false,false]
    }
    delete dicQuantity[idProducto]
    return [joinDicQuantity(dicQuantity),dicQuantity]
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

                let listProducts = await sqlGetListByID(dicQuantity)
                //console.log(dicQuantity)


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

            console.log(req.body.idProducto + "$" + newQuantity + idComprador )

            let [updatedListStr,dicQuantity] = await updateList(connection, idComprador, idProducto, newQuantity)
            if (!updatedListStr) {
                return res.status(400).json({message: "No se pudo actualizar el producto " + idProducto + " .\n Datos incorrectos."});
            }

            if (!await sqlUpdateQuantityByID(connection, idComprador, updatedListStr, dicQuantity)) {
                return res.status(400).json({message: "No se pudo actualizar el producto " + idProducto + " ."});
            } else {
                return res.status(200).json({message: "Producto " + idProducto + " actualizado correctamente."});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar carrito.'});
        }

    },
    removeProductCart: async (req, res) => {

        try {
            const connection = await ConnectionDB.getConnection();
            const idComprador = req.body.idComprador
            const idProducto = req.body.idProducto

            console.log(req.body.idComprador)

            let [updatedListStr,dicQuantity] = await removeList(connection, idComprador, idProducto)

            if (!updatedListStr && updatedListStr !== "") {
                return res.status(400).json({message: "No se pudo remover el producto " + idProducto + " .\n Datos incorrectos."});
            }

            if (!await sqlUpdateQuantityByID(connection, idComprador, updatedListStr, dicQuantity)) {
                return res.status(400).json({message: "No se pudo remover el producto " + idProducto + " ."});
            } else {
                return res.status(200).json({message: "Producto " + idProducto + " removido correctamente."});
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

            if (!await sqlUpdateQuantityByID(connection, idComprador, "", {})) {
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