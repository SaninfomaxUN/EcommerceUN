const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser")
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ConnectionDB = require("../../Database/ConnectionDB");
const cors = require('cors'); // Agrega el paquete cors
require('dotenv').config({path: './env/.env'});
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const secret = "your_secret_key"
const time = 30
const cookiexpires = 30
const Cookies = require("js-cookie")
const verifyJWT = async (req, res, next) => {


// Se obtiene el token del encabezado de autorización de la solicitud
const token = req.headers.authorization;
// Se verifica si el token está presente
if (!token) {
return res.status(401).json({ message: 'Token no proporcionado' });
}
try {
// Se decodifica el token y se verifica la firma
console.log("nuestro token",token)
const decoded = jwt.verify(token, secret);
console.log(decoded)
// Se agrega el objeto del usuario decodificado a la solicitud
req.email = decoded;
// Se llama a la siguiente función en la cadena de middleware
next();
} catch (err) {
// Si hay un error en la verificación del token, se responde con un código de estado 401
console.log("error abajo")
  return res.status(401).json({ message: 'Token no válidoooo' });
}
}
module.exports = {
    // login: async (req, res) => {
    //     const connection = await mysql.createConnection({
    //         host: 'localhost',
    //         user: 'root',
    //         password: 'root',
    //         database: 'ecommerce'
    //     });

    //     function getJwtSecret() {
    //         return secret || 'your_secret_key';
    //     }
    //     function cookieOptions(expires) {
    //         return {
    //             httpOnly: true,
    //             expires: new Date(Date.now() + expires * 1000),
    //             sameSite: 'none',
    //             secure: true,
    //         };
    //     }
    //     try {
    //         // const connection = ConnectionDB.getConnection();
    //         const email = req.body.email;
    //         const plainTextPassword = req.body.password;
    //         if (!email || !plainTextPassword) {
    //             return res.json({
    //                 success: false,
    //                 message: 'Ingrese un correo y contraseña',
    //             });
    //         } else {
    //             const [rows, fields] = await connection.query("SELECT * FROM credencialcomprador WHERE email = ?", [email]);

    //             if (rows.length === 0) {
    //                 return res.json({
    //                     success: false,
    //                     message: 'Correo y/o contraseña incorrectas',
    //                 });
    //             } else {
    //                 const hashedPassword = rows[0]['PASSWORD'];
    //                 const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

    //                 if (!isMatch) {
    //                     return res.json({
    //                         success: false,
    //                         message: 'Correo y/o contraseña incorrectas',
    //                     });
    //                 } else {
    //                     const email= rows[0].EMAIL
    //                     const id = rows[0].ID_COMPRADOR;
    //                     const token = jwt.sign({id}, getJwtSecret(), {expiresIn: '30s'});

    //                     const cookieExpires = 30; // Expires in 30 seconds
    //                     const cookieOption = cookieOptions(cookieExpires);
    //                     res.cookie('jwt', token, cookieOption);

    //                     // Send token as response
    //                     res.json({
    //                         success: true,
    //                         message: 'Ingreso correcto',
    //                         id:id,
    //                         email:email,
    //                         token: token,
    //                     });
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return res.json({
    //             success: false,
    //             message: 'Error en el servidor',
    //         });


    //     }
    // },


    login: async (req, res) => {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ecommerce'
      });
    
      function getJwtSecret() {
        return secret || 'your_secret_key';
      }
    
      function cookieOptions(expires) {
        return {
          httpOnly: true,
          expires: new Date(Date.now() + expires * 1000),
          sameSite: 'none',
          secure: true,
        };
      }
    
      try {
        const email = req.body.email;
        const comprador = "comprador";
        const vendedor = "vendedor";
        const plainTextPassword = req.body.password;
    
        if (!email || !plainTextPassword) {
          return res.json({
            success: false,
            message: 'Ingrese un correo y contraseña',
          });
        }
    
        const [rowsComprador, fieldsComprador] = await connection.query("SELECT * FROM credencialcomprador WHERE email = ? AND rol = ? ", [email, comprador]);
        const [rowsVendedor, fieldsVendedor] = await connection.query("SELECT * FROM credencialvendedor WHERE email = ? AND rol = ?", [email, vendedor]);
    
        if (rowsComprador.length === 0 && rowsVendedor.length === 0) {
          return res.json({
            success: false,
            message: 'Correo y/o contraseña incorrectas',
          });
        }
    
        let rows, userType;
        if (rowsComprador.length > 0) {
          rows = rowsComprador;
          userType = 'comprador';
        } else {
          rows = rowsVendedor;
          userType = 'vendedor';
        }
    
        const hashedPassword = rows[0]['PASSWORD'];
        const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    
        if (!isMatch) {
          return res.json({
            success: false,
            message: 'Correo y/o contraseña incorrectas',
          });
        }
    
        const emaill = rows[0].EMAIL;
        const id = rows[0].ID_COMPRADOR || rows[0].ID_VENDEDOR;
        const token = jwt.sign({ id }, getJwtSecret(), { expiresIn: '30s' });
    
        const cookieExpires = 30; // Expires in 30 seconds
        const cookieOption = cookieOptions(cookieExpires);
        res.cookie('role', userType, cookieOption);
        res.cookie('jwt', token, cookieOption);
       // Guardar el rol en una cookie
    
        // Send token as response
        res.json({
          success: true,
          message: 'Ingreso correcto',
          id: id,
          email: emaill,
          userType: userType,
          token: token,
        });
    
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          message: 'Error en el servidor',
        });
      }
    },
      
    isUserAuth: async(req, res, next) => {
        try {
          // Verificar el token
          await verifyJWT(req, res, next)
          // Si el usuario está autenticado, enviar la respuesta
          res.send("¡has sido auntenticado!")
        } catch (error) {
          // Si hay un error en la verificación del token, enviar una respuesta con un código de estado 401
          console.log("error arriba")
          res.status(401).json({ message: 'Token no válida' })
        }
      },
    }