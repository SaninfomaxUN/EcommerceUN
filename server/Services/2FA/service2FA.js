const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const serviceMailer = require("../Mailer/serviceMailer.js");

let dicCode2FA = new Map();
function generate2FA(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

/*function setTime2FACode(){
    setTimeout(reset2FACode, 600000)
}*/
function reset2FACode(codeEmailToDelete){
    dicCode2FA.delete(codeEmailToDelete)
}

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}


const send2FA = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    const code2FA = generate2FA(6)
    console.log(code2FA)
    console.log(req.body.email)

    dicCode2FA.set(req.body.email, code2FA)

    const mailOptions = {
        from: "EcommerceUN",
        subject: "Código de Verificación",
        destinationEmail: req.body.email,
        messageHtml: message2FAHtml(req.body)
    }

    serviceMailer.sendEmail(mailOptions)

    res.send(code2FA)
    // setTime2FACode(req.body.email)
}

const check2FA = async (req, res) => {
    const codeEntered = req.body.code
    const code2FA = dicCode2FA.get(req.body.dataToSend.email)

    if (codeEntered===code2FA){
        res.send(true);
    }else{
        res.send(false);
    }

}


module.exports.send2FA = allowCors(send2FA)
module.exports.check2FA = allowCors(check2FA)



const message2FAHtml = (data) => {
    return '<body style=\"background-color: #f4f4f4;\">\n' +
        "    <div style=\"background-color: #dcffdc; border: 1px solid #7fca7f; border-radius: 5px; padding: 20px; margin: 20px;\">\n" +
        "      <h1 style=\"color: #7fca7f;\">Autenticación en dos pasos</h1>\n" +
        "      <p>Hola, " + data.nombre + "</p>\n" +
        "      <p>Para continuar, por favor introduce el código de verificación que se muestra a continuación:</p>\n" +
        "      <p style=\"font-size: 24px; font-weight: bold; padding: 10px; background-color: #7fca7f; color: #fff; border-radius: 5px;\">" + dicCode2FA.get(data.email) + "</p>\n" +
        "      <p>Este código de verificación expirará en 10 minutos.</p>\n" +
        "      <p>Si no has solicitado una autenticación en dos pasos, por favor ignora este mensaje.</p>\n" +
        "      <p>Gracias,</p>\n" + "</br>" +
        "      <p>Att: El equipo de soporte de EcommerceUN 😉</p>\n" +
        "    </div>\n" +
        "  </body>"}

