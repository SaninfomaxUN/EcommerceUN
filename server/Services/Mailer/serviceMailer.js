const ElasticEmail = require('@elasticemail/elasticemail-client');


const callback = function (error, data, response) {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully.');
    }
};



module.exports = {

    sendEmail: (mailOptions) => {

        const client = ElasticEmail.ApiClient.instance;
        const apikey = client.authentications['apikey'];
        apikey.apiKey = "75F0A34099D8E73CDF3DC19334699A836F1482174EB1761DDB0D80BE85E87E523A6A7C404D7A40E66C54F056163B2C9D";
        const emailsApi = new ElasticEmail.EmailsApi();
        const emailData = {
            Recipients: {
                To: [mailOptions.destinationEmail]
            },
            Content: {
                Body: [
                    {
                        ContentType: "HTML",
                        Charset: "utf-8",
                        Content: mailOptions.messageHtml
                    },
                    {
                        ContentType: "PlainText",
                        Charset: "utf-8",
                        Content: "Contenido del Correo."
                    }
                ],
                From: "ecommerceunal@gmail.com",
                Subject: mailOptions.subject
            }
        };
        emailsApi.emailsTransactionalPost(emailData, callback);


    }
}