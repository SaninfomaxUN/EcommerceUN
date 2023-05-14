const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const serviceMailer = require("../Mailer/serviceMailer.js");

let code2FA = "";
function generate2FA(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function setTime2FACode(){
    setTimeout(reset2FACode, 600000)
}
function reset2FACode(){
    code2FA = ""
}


module.exports = {
    send2FA: async (req, res) => {
        code2FA = generate2FA(6)
        console.log(code2FA)
        console.log(req.body.email)



        const mailOptions = {
            from: "EcommerceUN",
            subject: "Código de Verificación",
            destinationEmail: req.body.email,
            messageHtml: message2FAHtml(req.body.nombre)
        }


        await serviceMailer.getMailTransporter().sendMail(
            serviceMailer.setMailTransporterOptions(mailOptions), (error) => {
            if (error) {
                res.status(500).send(error.message);
                console.log("Email NO enviado!!!")
                console.log(error)
            } else {
                console.log("Email enviado!!!")
                res.status(200).jsonp(code2FA);
            }
        });
        setTime2FACode()
    },

    check2FA: async (req, res) => {
        const codeEntered = req.body.code
        if (codeEntered===code2FA){
            res.send(true);
        }else{
            res.send(false);
        }

    }
}

const message2FAHtml = (Name) => {
    return '<body style=\"background-color: #f4f4f4;\">\n' +
    "    <div style=\"background-color: #dcffdc; border: 1px solid #7fca7f; border-radius: 5px; padding: 20px; margin: 20px;\">\n" +
    "      <h1 style=\"color: #7fca7f;\">Autenticación en dos pasos</h1>\n" +
    "      <p>Hola, " + Name + "</p>\n" +
    "      <p>Para continuar, por favor introduce el código de verificación que se muestra a continuación:</p>\n" +
    "      <p style=\"font-size: 24px; font-weight: bold; padding: 10px; background-color: #7fca7f; color: #fff; border-radius: 5px;\">" + code2FA + "</p>\n" +
    "      <p>Este código de verificación expirará en 10 minutos.</p>\n" +
    "      <p>Si no has solicitado una autenticación en dos pasos, por favor ignora este mensaje.</p>\n" +
    "      <p>Gracias,</p>\n" + "</br>" +
    "      <p>Att: El equipo de soporte de EcommerceUN 😉</p>\n" +
    "    </div>\n" +
    "  </body>"}

