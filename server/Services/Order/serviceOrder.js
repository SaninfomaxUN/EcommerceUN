const ConnectionDB = require("../../Database/ConnectionDB");
const serviceCart = require("../Cart/serviceCart")
const serviceListOrder = require("../Order/serviceListOrder")
const serviceAddress = require("../Address/serviceAddress")
const servicePaymentMethod = require("../PaymentMethod/servicePaymentMethod");
const serviceOrderMailer = require("../Order/serviceOrderMailer")


module.exports = {
    getOrder: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getOrderSQL = "SELECT * FROM pedido WHERE ID_PEDIDO = ?"

            const idPedido = req.body["idPedido"]

            const resultSQL = await connection.execute(getOrderSQL, [idPedido]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No se encontró el pedido #" + idPedido + "."});
            } else {
                const dataOrder = resultSQL[0];

                dataOrder[0]["ListadoProductos"] = await serviceListOrder.getListAllOrders(idPedido)
                dataOrder[0]["ID_DIRECCION"] = await serviceAddress.getAddressSinceBack(dataOrder[0]["ID_COMPRADOR"],dataOrder[0]["ID_DIRECCION"])
                dataOrder[0]["ID_METODOPAGO"] = await servicePaymentMethod.getPaymentMethodSinceBack(dataOrder[0]["ID_COMPRADOR"],dataOrder[0]["ID_METODOPAGO"])

                return res.status(200).send({Order: dataOrder});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar pedido.'});
        }

    },
    getOrders: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getOrdersSQL = "SELECT * FROM pedido WHERE ID_COMPRADOR = ?"

            const idComprador = req.body["idComprador"]

            const resultSQL = await connection.execute(getOrdersSQL, [idComprador]);
            console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "No hay pedidos asociados a " + idComprador + " ."});
            } else {
                const dataOrders = resultSQL[0];

                for (let order in dataOrders) {
                    dataOrders[order]["ListadoProductos"] = await serviceListOrder.getListAllOrders(dataOrders[order]["ID_PEDIDO"])
                }

                return res.status(200).send({Orders: dataOrders});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar pedidos.'});
        }

    },
    insertOrder: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const insertOrderSQL = "INSERT INTO pedido VALUES (NULL,?,?,?,?,NULL,?,?,?)"

            const idComprador = req.body["idComprador"]
            const cart = await serviceCart.getCartSinceBack(idComprador)
            const idDireccion = req.body["idDireccion"]
            const idMetodoPago = req.body["idMetodoPago"]
            const fechaPedido = req.body["fechaPedido"]
            const cantidadTotal = cart["Cart"][0]["CANTIDADTOTAL"]
            const total = cart["Cart"][0]["COSTOFINAL"]
            const totalSinIva =  Math.round(total * (1 - 0.19))

            const resultSQL = await connection.execute(insertOrderSQL, [idComprador, idDireccion, idMetodoPago, fechaPedido, cantidadTotal, totalSinIva, total]);

            const idPedido = resultSQL[0]["insertId"]

            const result2SQL = await serviceListOrder.insertListOrder(idPedido, idComprador, cart)
            if (result2SQL){
                let sent = await serviceOrderMailer.sendOrder(idPedido, idComprador, idDireccion, idMetodoPago, cart["Products"], fechaPedido, cantidadTotal, totalSinIva, total, cart)

                if(sent){
                    return res.status(200).json({message: "Pedido ingresado con éxito."});
                }else{
                    return res.status(200).json({message: "Pedido ingresado con éxito, pero estamos presentando inconvenientes con el envío de tu factura!"});
                }

            }else {
                return res.status(500).json({message: "Error al ingresar productos del pedido."});
            }



        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al ingresar pedido."});
        }

    },
    removeOrder: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const removeOrderSQL = "DELETE FROM pedido WHERE ID_COMPRADOR = ? AND ID_PEDIDO = ?"

            const idComprador = req.body["idComprador"]
            const idPedido = req.body["idPedido"]

            const resultSQL = await connection.execute(removeOrderSQL, [idComprador, idPedido]);

            if (resultSQL[0].affectedRows > 0) {
                return res.status(200).json({message: "Pedido eliminado con éxito."});
            } else {
                return res.status(400).json({message: "Pedido NO eliminado. Datos inconsistentes."});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al eliminar pedido."});
        }

    }

}