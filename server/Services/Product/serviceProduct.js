const ConnectionDB = require("../../Database/ConnectionDB");


module.exports = {

    insertProduct:async (req, res) => {
        const insertProduct = "INSERT INTO producto (id_vendedor, n_producto, descripcion, precioBase, precioFinal, imagen, stock, marca, modelo, categoria, estado, fechaPublicacion) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
        const dataProduct = [
        req.body.id_vendedor,  
        req.body.n_producto,
        req.body.descripcion,
        req.body.precioBase,
        req.body.precioFinal,
        req.body.imagen,
        req.body.stock,
        req.body.marca,
        req.body.modelo,
        req.body.categoria,
        req.body.estado,
        ];  
    try {
    const connection = await ConnectionDB.getConnection();

    await connection.execute(insertProduct, dataProduct);
           
            // Aquí puedes agregar la lógica para insertar el producto en tu base de datos
        return   res.status(200).json({ message: 'Producto insertado exitosamente' });
          } catch (error) {
            console.error(error);
            return  res.status(500).json({ error: 'Error al insertar el producto' });
          }
    },

    getSellerProducts: async (req, res) => {
        const sqlVerifyId = "SELECT * FROM producto WHERE id_vendedor = ?";
        try {
            const connection = await ConnectionDB.getConnection();
            const id = [req.body.id_vendedor]

            console.log("el id es",req.body.id_vendedor)

            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);
            console.log(resultId[0])
            if (resultId[0].length < 1) {
                return res.status(400).json({message: "El Producto " + req.body.nit + " no se encuentra registrado."});
            } else {
                
                const row = resultId[0];
                console.log(row)
                return res.status(200).send(row);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Producto.'});
        }
    },

// Editar un producto
    updateProduct: async (req, res) => {
    const updateProduct = "UPDATE producto SET n_producto = ?, descripcion = ?, precioBase = ?, precioFinal = ?, imagen = ?, stock = ?, marca = ?, modelo = ?, categoria = ?, estado = ? WHERE id_vendedor = ? AND id_producto = ?";
    

    const id_product = req.body.id_product;
        if (id_product === undefined) {
          return res.status(400).json({ error: 'El ID del producto no está definido' });
        }
    const dataProduct = [
        req.body.n_producto,
        req.body.descripcion,
        req.body.precioBase,
        req.body.precioFinal,
        req.body.imagen,
        req.body.stock,
        req.body.marca,
        req.body.modelo,
        req.body.categoria,
        req.body.estado,
        req.body.id_vendedor,
        req.body.id_product
    ];
    try {

        console.log("Los productos son:",dataProduct)
        const connection = await ConnectionDB.getConnection();
        await connection.execute(updateProduct, dataProduct);
        return res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
},

    deleteProduct: async (req, res) => {
    const deleteProduct = "DELETE FROM producto WHERE id_vendedor = ? AND id_producto = ?";

    console.log(req.body.id_vendedor)
    console.log(req.body.id_producto)
    const dataProduct = [
        req.body.id_vendedor,
        req.body.id_producto
    ];
    try {
        const connection = await ConnectionDB.getConnection();
        await connection.execute(deleteProduct, dataProduct);
        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
},

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