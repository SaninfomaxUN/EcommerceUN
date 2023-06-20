const ConnectionDB = require("../../Database/ConnectionDB");


module.exports = {

  getAllShoppers: async (req, res) => {
    const sql = "SELECT * FROM comprador INNER JOIN credencialcomprador ON comprador.id_comprador = credencialcomprador.id_comprador";
    try {
      const connection = await ConnectionDB.getConnection();
      const [rows, fields] = await connection.query(sql);
  
      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al consultar los compradores.' });
    }
  },

  getAllSellers:async (req, res) => {
    const sql = "SELECT * FROM vendedor INNER JOIN credencialvendedor ON vendedor.id_vendedor = credencialvendedor.id_vendedor";
    try {
      const connection = await ConnectionDB.getConnection();
      const [rows, fields] = await connection.query(sql);
  
      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al consultar los vendedores.' });
    }
  },

  deleteShopper: async (req, res) => {

    const deleteShopperQuery = "DELETE FROM comprador WHERE id_comprador = ?"
    const shopperId = req.body.id_comprador;
  
    try {
      const connection = await ConnectionDB.getConnection();
      await connection.execute(deleteShopperQuery, [shopperId]);
      return res.status(200).json({ message: 'Comprador y credenciales eliminados exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar el comprador y las credenciales' });
    }
  },
 
  deleteSeller: async (req, res) => {
    const deleteShopperQuery = "DELETE FROM vendedor WHERE id_vendedor = ?";
    const sellerId = req.body.id_vendedor;

    console.log("el id vendedor en delete es:",sellerId)
    try {
      const connection = await ConnectionDB.getConnection();
      await connection.execute(deleteShopperQuery, [sellerId]);
      return res.status(200).json({ message: 'vendedor y credenciales eliminados exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar el vendedor y las credenciales' });
    }
  },
  
  deleteProduct2: async (req, res) => {
        const deleteProduct = "DELETE FROM producto WHERE id_producto = ?";

        console.log(req.body.id_producto)
        const dataProduct = [
            req.body.id_producto,
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

 
  
  activateShopper: async (req, res) => {
      const activeSellerQuery = "UPDATE credencialcomprador SET estado = 'activo' WHERE id_comprador = ?";
      console.log("el id de activate en la api es:",req.body.id_comprador)
      const shopperId = [req.body.id_comprador];
    
      try {
        const connection = await ConnectionDB.getConnection();
        await connection.execute(activeSellerQuery, shopperId);
        return res.status(200).json({ message: 'comprador y credenciales activados exitosamente' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al activar el comprador y las credenciales' });
      }
    },
  activateSeller: async (req, res) => {
    const activeSellerQuery = "UPDATE credencialvendedor SET estado = 'activo' WHERE id_vendedor = ?";
    console.log("el id de activate en la api es:",req.body.id_vendedor)
    const sellerId = [req.body.id_vendedor];
  
    try {
      const connection = await ConnectionDB.getConnection();
      await connection.execute(activeSellerQuery, sellerId);
      return res.status(200).json({ message: 'Vendedor y credenciales activados exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al activados el vendedor y las credenciales' });
    }
  },
  activateProduct: async (req, res) => {
    const activeProductQuery = "UPDATE producto SET estado = 'activo' WHERE id_producto = ?";
    console.log("el id de activate en la api es:",req.body.id_producto)
    const productId = [req.body.id_producto];
  
    try {
      const connection = await ConnectionDB.getConnection();
      await connection.execute(activeProductQuery, productId);
      return res.status(200).json({ message: 'producto activado exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al activar el producto' });
    }
  },



  suspendProduct: async (req, res) => {
    const suspendProductQuery = "UPDATE producto SET estado = 'suspendido' WHERE id_producto = ?";
    console.log("el id de suspend es en la api es:",req.body.id_producto)
    const productId = [req.body.id_producto];
  
    try {
      const connection = await ConnectionDB.getConnection();
      await connection.execute(suspendProductQuery, productId);
      return res.status(200).json({ message: 'producto suspendido exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al suspender el producto' });
    }
  },

  suspendShopper: async (req, res) => {
    const suspendSellerQuery = "UPDATE credencialcomprador SET estado = 'suspendido' WHERE id_comprador = ?";
    console.log("el id de suspend es en la api es:",req.body.id_comprador)
    const shopperId = [req.body.id_comprador];
  
    try {
      const connection = await ConnectionDB.getConnection();
      await connection.execute(suspendSellerQuery, shopperId);
      return res.status(200).json({ message: 'comprador y credenciales suspendidos exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al suspender el comprador y las credenciales' });
    }
  },

  suspendSeller: async (req, res) => {
    const suspendSellerQuery = "UPDATE credencialvendedor SET estado = 'suspendido' WHERE id_vendedor = ?";
    console.log("el id de suspend es en la api es:",req.body.id_vendedor)
    const sellerId = [req.body.id_vendedor];
  
    try {
      const connection = await ConnectionDB.getConnection();
      await connection.execute(suspendSellerQuery, sellerId);
      return res.status(200).json({ message: 'Vendedor y credenciales suspendidos exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al suspender el vendedor y las credenciales' });
    }
  },




}