const {parseISO} = require('date-fns');
const {utcToZonedTime, format } = require('date-fns-tz');

module.exports = {
    getCurrentDateTimeToSend: () => {

        // Obtener la fecha y hora actual en UTC
        const fechaHoraActualUtc = new Date();

        // Obtener la zona horaria local
        const zonaHorariaLocal = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Convertir la fecha y hora UTC a la zona horaria local
        const fechaHoraLocal = utcToZonedTime(fechaHoraActualUtc, zonaHorariaLocal);

        // Formatear la fecha y hora local
        return format(fechaHoraLocal, 'yyyy-MM-dd HH:mm', {timeZone: zonaHorariaLocal});
    },
    getDateFromResultSQL: (fechaPedido) => {
        return format(parseISO(fechaPedido), 'dd-MM-yyyy');
    },
    getTimeFromResultSQL: (fechaPedido) => {
        return format(parseISO(fechaPedido), 'HH:mm');
    },
    getDateTimeFromResultSQL: (fechaPedido) => {
        return format(parseISO(fechaPedido), 'dd-MM-yyyy HH:mm');
    }
}