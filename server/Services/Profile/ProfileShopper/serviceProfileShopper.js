const ConnectionDB = require("../../../Database/ConnectionDB");

module.exports = {
    getShopper: async (req,res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getShopperSQL = "SELECT comprador.ID_COMPRADOR, comprador.NOMBRE, comprador.APELLIDO, comprador.TELEFONO, comprador.PAIS, credencialcomprador.EMAIL FROM comprador INNER JOIN credencialcomprador ON comprador.id_comprador = credencialcomprador.id_comprador WHERE comprador.ID_COMPRADOR = ?"

            const idComprador = req.body["idComprador"]

            const resultSQL = await connection.execute(getShopperSQL, [idComprador]);
            //console.log(resultSQL[0])


            if (resultSQL[0].length < 1) {
                return res.status(400).json({message: "El Comprador NO se encontró."});
            } else {
                const dataShopper = resultSQL[0];

                return res.status(200).send({DataShopper: dataShopper[0]});
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Error al consultar Comprador.'});
        }
    },
    getShopperSinceBack: async (idComprador) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const getShopperSQL = "SELECT comprador.ID_COMPRADOR, comprador.NOMBRE, comprador.APELLIDO, comprador.TELEFONO, comprador.PAIS, credencialcomprador.EMAIL FROM comprador INNER JOIN credencialcomprador ON comprador.id_comprador = credencialcomprador.id_comprador WHERE comprador.ID_COMPRADOR = ?"

            const resultSQL = await connection.execute(getShopperSQL, [idComprador]);
            //console.log(resultSQL[0])

            if (resultSQL[0].length < 1) {
                return null;
            } else {
                const dataShopper = resultSQL[0];
                return  dataShopper[0];
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    updateShopper: async (req, res) => {
        try {
            const connection = await ConnectionDB.getConnection();
            const updateProfileShopperSQL = "UPDATE comprador INNER JOIN credencialcomprador ON comprador.id_comprador = credencialcomprador.id_comprador SET comprador.NOMBRE = ?, comprador.APELLIDO = ?, comprador.TELEFONO = ?, credencialcomprador.EMAIL = ? WHERE comprador.ID_COMPRADOR = ?"

            const idComprador = req.body["idComprador"]
            const nombre = req.body["nombre"]
            const apellido = req.body["apellido"]
            const telefono = req.body["telefono"]
            const email = req.body["email"]

            const resultSQL = await connection.execute(updateProfileShopperSQL, [nombre, apellido, telefono, email, idComprador]);

            if (resultSQL[0].affectedRows > 0) {
                return res.status(200).json({message: "Comprador actualizado con éxito."});
            } else {
                return res.status(400).json({message: "Comprador NO actualizado. Datos inconsistentes."});
            }


        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al actualizar Comprador."});
        }
    },
    deleteShopper: async (req, res) => {
    
        const deleteShopperQuery = "DELETE FROM comprador WHERE id_comprador = ?"
        const shopperId = req.body.idComprador;
      
        try {
          const connection = await ConnectionDB.getConnection();
          await connection.execute(deleteShopperQuery, [shopperId]);
          return res.status(200).json({ message: 'Comprador y credenciales eliminados exitosamente' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al eliminar el comprador y las credenciales' });
        }
      },

}