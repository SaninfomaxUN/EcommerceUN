const nodemailer = require("nodemailer");


const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ecommerceunal@gmail.com",
        pass: "pakonrivkffnzlxf"
    }
});

mailTransporter.verify(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Servicio de Mensajería listo!");
    }
});


module.exports = {

    setMailTransporterOptions: (mailOptions) => {
        return {
            from: mailOptions.from + " <ecommerceunal@gmail.com>",
            to: mailOptions.destinationEmail,
            subject: mailOptions.subject,
            html: mailOptions.messageHtml,
        };
    },
    getMailTransporter: () => {
        return mailTransporter;
    }
}