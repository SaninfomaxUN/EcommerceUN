const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const nodemailer = require("nodemailer");
const generate2FA = require("../Services/service2FA.cjs");


// router.post('/login', async (req, res) => {

//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'kali',
//     database: 'ecommerce'
//   });

//   const { email, password } = req.body;
//   const query = "SELECT * FROM credencialcomprador WHERE email = ?";

//   connection.query(query, [email], (error, results) => {
//     if (error) throw error;

//     if (results.length === 0) {
//       res.status(401).send("Usuario o contraseña incorrectos");
//       return;
//     }

//     const user = results[0];

//     bcrypt.compare(password, user.password, (error, result) => {
//       if (error) throw error;

//       if (result) {
//         res.send({
//           id: user.id,
//           email: user.email,
//         });
//       } else {
//         res.status(401).send("Usuario o contraseña incorrectos");
//       }
//     });
//   });
// });



exports.login = async (req, res)=>{
  const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecommerce'
  });
  
  try{
      const email = req.body.email 
      const pass = req.body.password
      if(!email || !pass){
      res.render('login',{
          alert:true,
          alerTitle: "Advertencia",
          alertMessage: "Ingrese un correo y contraseña",
          alertIcon:'info',
          showConfirmButton:true,
          timer:false,
          ruta:'login'

          
          })
      }else{
          conexion.query('SELECT*FROM credencialcomprador WHERE email =?',[email],async(error,results)=>{

              if(results.length ==0 || !(await bcryptjs.compare(pass, results[0].pass))){
                  res.render('login',{
                      alert:"Error",
                      alerTitle: "Advertencia",
                      alertMessage: "correo y/o contraseña incorrectas",
                      alertIcon:'succes',
                      showConfirmButton:true,
                      timer:false,
                      ruta:'login'
              
          })
      }else{

     const id = results[0].id
     const token = jwt.sing({id:id}, process.env.JWT_SECRETO,{
  expiresIn:process.env.JWT_TIEMPO_EXPIRA   
  })
//GENERAMOS EL TOKEN sIN FECHA DE EXPIRACION
console.log("TOKEN:"+token+ "para el USUARIO:"+email)


const cookiesOptions ={
  expires: new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
  httpOnly: true

} 
  res.cookie('jwt',token, cookiesOptions)
  res.render('login',{
  alert:"Error",
  alerTitle: "Conexión exitosa",
  alertMessage: "Ingreso correcto",
  alertIcon:'success',
  showConfirmButton:false,
  timer:800,
  ruta:''
})  

        }
      })
   }
  } catch (error){
    console.log(error)
  }
}

exports.isAuthenticated = async (req, res, next)=>{

if (req.cookies.jwt){
  try{
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
      conexion.query('SELECT* FROM credencialcomprador WHERE id=?',[decodificada.id],(error, results)=>{
          if(!results){return next()}
          req.email=results[0]
          return next()
      })
  }catch(error){
      console.log(error)
      return next()
  }
}else{
  res.redirect('/login')
 next( 

 )
}

}

exports.logout = (req, res)=>{
  res.clearCookie('jwt')
  return res.redirect('/')
}

































router.post('/serviceSignUpShopper', async (req, res) => {
    const sql = "INSERT INTO comprador (nombre, apellido, pais, telefono, fechaRegistro) VALUES (?, ?, ?, ?, NOW())";
    const values = [
        req.body.nombre,
        req.body.apellido,
        req.body.pais,
        req.body.telefono,
    ];

    const email = req.body.email;
    const password = req.body.password;
    const sqlSelect = "SELECT COUNT(*) as count FROM credencialcomprador WHERE email = ?";
    const sqlInsert = "INSERT INTO credencialcomprador (email, password) VALUES (?, ?)";
    const valuesSelect = [email];
    const valuesInsert = [email, password];

    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'ecommerce'
        });

        // Insert new record in the "comprador" table
        await connection.execute(sql, values);
        // Check if email is already registered
        const [rows] = await connection.execute(sqlSelect, valuesSelect);
        if (rows[0].count > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        } else {
            // Insert new record in the "credencialcomprador" table
            await connection.execute(sqlInsert, valuesInsert);
            return res.status(200).json({ message: 'Usuario registrado correctamente' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Error al registrar usuario'});
    }})





//registro vendedores
router.post('/serviceSignUpSeller', async (req, res) => {
  const sql = "INSERT INTO vendedor (nombre, apellido, nit, telefono, pais, direccionPersonal, razonSocial, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
 
  const email = req.body.email;
  const password = req.body.password;
  const sqlSelect = "SELECT COUNT(*) as count FROM credencialvendedor WHERE email = ?";
  const sqlInsert = "INSERT INTO credencialvendedor (email, password) VALUES (?, ?)";
  const valuesSelect = [email];
  const valuesInsert = [email, password];

  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.nit,
    req.body.telefono,
    req.body.pais,
    req.body.direccionPersonal,
    req.body.razonSocial,
  ];
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ecommerce'
    });
    // Insert new record in the "comprador" table
    await connection.execute(sql, values);
    // Check if email is already registered
    const [rows] = await connection.execute(sqlSelect, valuesSelect);
    if (rows[0].count > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
     
    } else {
      // Insert new record in the "credencialcomprador" table
      await connection.execute(sqlInsert, valuesInsert);
      return res.status(200).json({ message: 'Usuario registrado correctamente' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al registrar usuario' });
 
  }
});



router.post("/sendTwoFA", async (req,res) =>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "0dbe72d85cacdc",
            pass: "7d0ed0d61960f8"
        }
    });
    const email = req.body.email
    console.log(email)

    const code2FA = generate2FA(6)

    const mailOptions = {
        from: "Remitente",
        to: "santy.happy79@gmail.com",
        subject: "Enviado por tu EcommerceUN",
        text: "Aqui esta tu codigo de seguridad: " + code2FA,
    };



    await transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
            console.log("Email NO enviado!!!")
            console.log(error)
        } else {
            console.log("Email enviado!!!")
            res.status(200).jsonp(code2FA);
        }
    });
});


module.exports = router;





























