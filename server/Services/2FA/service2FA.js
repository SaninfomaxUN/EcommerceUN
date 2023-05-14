const nodemailer = require("nodemailer");
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

let code2FA = "";
function generate2FA(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


module.exports = {
    send2FA: async (req, res) => {
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "0dbe72d85cacdc",
                pass: "7d0ed0d61960f8"
            }
        });
        const email = req.body.email
        console.log(email)

        code2FA = generate2FA(6)
        console.log(code2FA)
        const mailOptions = {
            from: "verification@EcommerceUN.com",
            to: email,
            subject: "Verificación en 2 Pasos - EcommerceUN",
            text: "Tu código de Verificación es: " + code2FA,
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
