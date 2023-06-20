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

            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);
           
            if (resultId[0].length < 1) {
                return res.status(400).json({message: "El Producto " + req.body.nit + " no se encuentra registrado."});
            } else {
                
                const row = resultId[0];
                return res.status(200).send(row);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Producto.'});
        }
    },
    
    updateProduct: async (req, res) => {
    const updateProduct = "UPDATE producto SET n_producto = ?, descripcion = ?, precioBase = ?, precioFinal = ?, imagen = ?, stock = ?, marca = ?, modelo = ?, categoria = ?, estado = ? WHERE id_vendedor = ? AND id_producto = ?";
    const id_product = req.body.id_producto;
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
        req.body.id_producto
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

    getProductData: async (req, res) => {
        const idProducto = req.query.id_producto; // Modificar esta línea
      
        const sqlVerifyId = "SELECT * FROM producto WHERE id_producto = ?";
        const data = [idProducto]; // Modificar esta línea
      
        try {
          const connection = await ConnectionDB.getConnection();
          console.log("El id en getProductData es:", data);
          const resultId = await connection.execute(sqlVerifyId, data);
          console.log(resultId[0])
          if (resultId[0].length < 1) {
            return res.status(400).json({ message: "El Producto " + idProducto + " no se encuentra registrado." });
          } else {
            const row = resultId[0];
            console.log(row);
            return res.status(200).send(row);
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error al consultar Producto.' });
        }
      },
      

    getAllProducts: async (req, res) => {
    const sql = "SELECT * FROM producto";
    try {
      const connection = await ConnectionDB.getConnection();
      const [rows, fields] = await connection.query(sql);
  
      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al consultar los productos.' });
    }
    },

    getProduct: async (req, res) => {
        const sqlVerifyId = "SELECT * FROM producto WHERE id_producto = ?";
        try {
            const connection = await ConnectionDB.getConnection();
            const id = [req.body.idProducto]

            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);
            console.log(resultId[0])
            if (resultId[0].length < 1) {
                return res.status(400).json({message: "El Producto " + req.body.idProducto+ " no se encuentra registrado."});
            } else {

                const row = resultId[0];
                console.log(row)
                return res.status(200).send(row);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Producto.'});
        }

    }, getProductSinceBack: async (data) => {
        const sqlVerifyId = "SELECT * FROM producto WHERE id_producto = ?";
        try {
            const connection = await ConnectionDB.getConnection();
            const id = [data.idProducto]


            // Check if id is already registered
            const resultId = await connection.execute(sqlVerifyId, id);
            //console.log(resultId[0])
            if (resultId[0].length < 1) {
                return false;
            } else {

                const row = resultId[0];
                //console.log(row)
                return row[0];
            }
        } catch (error) {
            console.error(error);
            return 'Error al consultar Producto.';
        }

    }
  
}