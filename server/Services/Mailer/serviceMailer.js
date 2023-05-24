



/*
async function serviceMailer(req, res) {
    await new Promise((resolve, reject) => {
        // verify connection configuration
        mailTransporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Servicio de Mensajería listo!");
                resolve(success);
            }
        });
    });

}*/


module.exports = {

    setMailTransporterOptions: (mailOptions) => {
        return {
            from: mailOptions.from + " <ecommerceunal@gmail.com>",
            to: mailOptions.destinationEmail,
            subject: mailOptions.subject,
            html: mailOptions.messageHtml,
        };
    }
}