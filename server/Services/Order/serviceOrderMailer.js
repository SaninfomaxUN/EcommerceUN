const serviceMailer = require("../Mailer/serviceMailer.js");
const serviceAddress = require("../Address/serviceAddress");
const servicePaymentMethod = require("../PaymentMethod/servicePaymentMethod");
const {getDateFromResultSQL, getTimeFromResultSQL} = require("../../Commons/formatterDateTime");

const formatToCurrency = (strNum) => {
    return strNum.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

}

const porcentajeComision = 0.05;
module.exports = {
    sendOrder: async (idPedido, idComprador, idDireccion, idMetodoPago, products, fechaPedido, cantidadTotal, totalSinIva, total, cart) => {
        let sent;
        let dataShopper;
        let dataAddress = await serviceAddress.getAddressSinceBack(idComprador, idDireccion);
        let dataPaymentMethod = await servicePaymentMethod.getPaymentMethodSinceBack(idComprador, idMetodoPago);

        const porcenDescuento = cart["Cart"][0]["DESCUENTO"]
        let messageHTML = orderHTML(idPedido, dataShopper, dataAddress, dataPaymentMethod, products, fechaPedido, cantidadTotal, totalSinIva, porcenDescuento, total);

        const mailOptions = {
            from: "EcommerceUN",
            subject: "Confirmación del Pedido #" + idPedido,
            destinationEmail: "santy.happy79@gmail.com",
            messageHtml: messageHTML
        }

        serviceMailer.sendEmail(mailOptions)

        sent = true
        return sent
    }
}





const getProductsHTML = (products) => {
    let str = ""

    for (let product of products){
        str = str + '     <tr>\n' +
            '              <td>\n' +
            '                <img src="' + product["IMAGEN"] +   '" alt="' + product["N_PRODUCTO"] +   '" class="product-image">\n' +
            '              </td>\n' +
            '              <td>' + product["N_PRODUCTO"] +   '</td>\n' +
            '              <td>' + product["CANTIDAD"] +   '</td>\n' +
            '              <td>' + formatToCurrency(product["PRECIOBASE"]/(1-porcentajeComision)) +   '</td>\n' +
            '              <td>' + formatToCurrency(product["PRECIOBASE"]/(1-porcentajeComision)*product["CANTIDAD"]) +   '</td>\n' +
            '            </tr>\n'
    }


    return str
}

const orderHTML = (idPedido, dataShopper, dataAddress, dataPaymentMethod, products, fechaPedido, cantidadTotal, totalSinIva, porcenDescuento, total) => {

    let valorIva = (total - totalSinIva);
    let descuento = (total - total * (1 - (porcenDescuento !== 0 ? (porcenDescuento / 100) : 0)));

    let messageHTML =
        '<html lang ="es" >\n' +
        '  <head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title>Factura</title>\n' +
        '    <style>\n' +
        '      .bodyMsgOrder {\n' +
        '        font-family: Arial, sans-serif;\n' +
        '        color: #333333;\n' +
        '        background-color: #e1fac0;\n' +
        '        margin: 0;\n' +
        '        padding: 20px;\n' +
        '      }\n' +
        '\n' +
        '      .containerMsgOrder {\n' +
        '        max-width: 800px;\n' +
        '        margin: 0 auto;\n' +
        '        background-color: #ffffff;\n' +
        '        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n' +
        '        padding: 40px 40px 20px 40px;\n' +
        '      }\n' +
        '\n' +
        '      .cardMsgOrder {\n' +
        '        border: 1px solid #dddddd;\n' +
        '        padding: 20px;\n' +
        '        margin-bottom: 20px;\n' +
        '        border-radius: 4px;\n' +
        '        background-color: #ffffff;\n' +
        '      }\n' +
        '\n' +
        '      .colorDark {\n' +
        '        color: #333333;\n' +
        '      }\n' +
        '\n' +
        '      .colorGreen {\n' +
        '        color: #bde68e;\n' +
        '      }\n' +
        '\n' +
        '      .tableMsgOrder {\n' +
        '        width: 100%;\n' +
        '        border-collapse: collapse;\n' +
        '        margin-top: 20px;\n' +
        '      }\n' +
        '\n' +
        '      table.tableMsgOrder th,\n' +
        '      table.tableMsgOrder td {\n' +
        '        padding: 10px;\n' +
        '        text-align: center;\n' +
        '        border-bottom: 1px solid #dddddd;\n' +
        '      }\n' +
        '\n' +
        '      table.tableMsgOrder th {\n' +
        '        background-color: #f2f2f2;\n' +
        '      }\n' +
        '\n' +
        '      .textCenter {\n' +
        '        text-align: center;\n' +
        '        margin-top: 50px;\n' +
        '        font-size: 15px;\n' +
        '        color: #333333;\n' +
        '      }\n' +
        '\n' +
        '      .product-image {\n' +
        '        width: 100px;\n' +
        '        height: 100px;\n' +
        '        object-fit: contain;\n' +
        '      }\n' +
        '      .logo {\n' +
        '        width: 120px;\n' +
        '        object-fit: contain;\n' +
        '      }\n' +
        '      .line-divisor{\n' +
        '          height:1px;\n' +
        '          background-color:#c0c0c0;\n' +
        '          color:#c0c0c0;\n' +
        '      }\n' +
        '    </style>\n' +
        '  </head>\n' +
        '  <body>\n' +
        '    <div>\n' +
        '    <img src="https://iili.io/H6sBhQf.png" alt="H6sBhQf.th.png" class="logo">\n' +
        '    <hr class="line-divisor">\n' +
        '       <p><strong> Hola, ..</strong></p>\n' +
        '       <p> Te enviamos el comprobante de compra del <strong>pedido #' + idPedido +'</strong> . Si tienes alguna duda o inconveniente con tu pedido, puedes comunicarte al correo <em>ecommerceunal@gmail.com</em>, donde uno de nuestros agentes de servicio al cliente atenderá tu solicitud.</p>\n' +
        '       <p>Te deseamos una feliz compra!</p>\n' +
        '       <br>\n' +
        '       <p>Att: Equipo de Facturación de EcommerceUN 😉</p>\n' +
        '    </div>\n' +
        '    <div class="bodyMsgOrder">\n' +
        '      <div class="containerMsgOrder">\n' +
        '        <h1 class="colorGreen">Pedido #' + idPedido +'</h1>\n' +
        '        <div class="cardMsgOrder">\n' +
        '          <h2 class="colorDark">Datos del Cliente</h2>\n' +
        '          <p>\n' +
        '            <strong>Nombre:</strong> Juan Pérez ...\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>No. Identificación:</strong> ...\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Email:</strong> juan@example.com ...\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Teléfono:</strong> 555-123456 ...\n' +
        '          </p>\n' +
        '        </div>\n' +
        '        <div class="cardMsgOrder">\n' +
        '          <h2 class="colorDark">Dirección de Envío</h2>\n' +
        '          <p>\n' +
        '            <strong>Dirección:</strong> ' + dataAddress["DIRECCION"] + ' \n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Ciudad:</strong> ' + dataAddress["CIUDAD"] + ', ' + dataAddress["PAIS"] + ' \n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Código Postal:</strong> ' + dataAddress["CODIGOPOSTAL"] + ' \n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Etiqueta:</strong> ' + dataAddress["DESCRIPCION"] + ' \n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Teléfono:</strong> ' + dataAddress["TELEFONO"] + ' \n' +
        '          </p>\n' +
        '        </div>\n' +
        '        <div class="cardMsgOrder">\n' +
        '          <h2 class="colorDark">Método de Pago</h2>\n' +
        '          <p>\n' +
        '            <strong>Tipo de Tarjeta: </strong>' + dataPaymentMethod["TIPOMETODO"] + '\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Titular: </strong>' + dataPaymentMethod["NOMBRETITULAR"] + '\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Número de Tarjeta: </strong> **** **** **** ' + dataPaymentMethod["NUMEROTARJETA"].slice(-4) + '\n' +
        '          </p>\n' +
        '        </div>\n' +
        '        <div class="cardMsgOrder">\n' +
        '          <h2 class="colorDark">Detalles:</h2>\n' +
        '          <p>\n' +
        '            <strong>Fecha: </strong>' + getDateFromResultSQL(fechaPedido) + ' \n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Hora: </strong>' + getTimeFromResultSQL(fechaPedido) + ' \n' +
        '          </p>\n' +
        '          <p>\n' +
        '            <strong>Cantidad de Productos: </strong>' + cantidadTotal + ' \n' +
        '          </p>\n' +
        '\n' +
        '          \n' +
        '          <table class="tableMsgOrder">\n' +
        '            <tr>\n' +
        '              <th></th>\n' +
        '              <th>Producto</th>\n' +
        '              <th>Cantidad</th>\n' +
        '              <th>Precio Unitario</th>\n' +
        '              <th>Precio Total</th>\n' +
        '            </tr>\n' +
                getProductsHTML(products) +
        '            <tr>\n' +
        '              <td colspan="4" style="text-align: right;">Subtotal:</td>\n' +
        '              <td>' + formatToCurrency(totalSinIva) + '</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '              <td colspan="4" style="text-align: right;">Iva:</td>\n' +
        '              <td>' + formatToCurrency(valorIva) + '</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '              <td colspan="4" style="text-align: right;">Descuentos:</td>\n' +
        '              <td>' + formatToCurrency(descuento) + '</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '              <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>\n' +
        '              <td>' + formatToCurrency(total)+ '</td>\n' +
        '            </tr>\n' +
        '          </table>\n' +
        '        </div>\n' +
        '        <div>\n' +
        '          <h4 class="textCenter"><em>Gracias por contar con nosotros </em>😉</h4>\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </body>';
    //console.log(messageHTML)
    return messageHTML
}