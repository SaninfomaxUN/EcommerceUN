const ConnectionDB = require("../../Database/ConnectionDB");
const serviceProduct = require("../Product/serviceProduct");

const getProduct = async (idProducto) => {
    let product = null
    await serviceProduct.getProductSinceBack({idProducto: idProducto})
        .then(res => {
            product = res
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    console.log(product)
    return product
}


module.exports = {
    getListAllOrders: async (idPedido) =>{
        try {
            const connection = await ConnectionDB.getConnection();
            const selectListOrderSQL = "SELECT * FROM listapedido WHERE ID_PEDIDO = ?"

            const resultSQL = await connection.execute(selectListOrderSQL, [idPedido]);
            if (resultSQL[0].length < 1) {
                return false;
            } else {
                const dataListOrders = resultSQL[0];
                for(let product in dataListOrders){
                    dataListOrders[product]["Producto"] = await getProduct(dataListOrders[product]["ID_PRODUCTO"])
                }
                return dataListOrders;
            }

        } catch (error) {
            console.error(error);

        }
    },
    insertListOrder: async (idPedido, idComprador, cart) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const insertListOrderSQL = "INSERT INTO listapedido VALUES (NULL,?,?,?,?,?)"

            let dicProducts = cart["Products"]

            for (let product of dicProducts) {
                try {
                    await connection.execute(insertListOrderSQL, [idPedido, product["ID_PRODUCTO"], product["CANTIDAD"], product["PRECIOFINAL"], product["CANTIDAD"] * product["PRECIOFINAL"]]);
                } catch (error) {
                    console.log("Adentro")
                    console.error(error);
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}