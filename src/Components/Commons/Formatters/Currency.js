export const formatToCurrency = (strNum) => {
    if(strNum===undefined){
        return
    }
    return strNum.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

}