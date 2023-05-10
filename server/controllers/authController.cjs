const jwt =require('jsonwebtoken')
const bcryptjs = require('bcrypt')
const {promisify} = require('util')




exports.login = async (req, res)=>{
    
    const conexion = mysql.createConnection({
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

                if(results.length ===0 || !(await bcryptjs.compare(pass, results[0].pass))){
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