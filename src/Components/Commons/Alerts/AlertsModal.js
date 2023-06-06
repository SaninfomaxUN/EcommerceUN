import Swal from "sweetalert2";

export const showAlertSuccess = (Title, callback) => {
    Swal.fire(
        Title,
        '',
        'success'
    ).then((result) => {
        if (result.isConfirmed && typeof callback === 'function') {
            callback();
        }
    });
}
export const showAlertError = (Title) => {
    Swal.fire(
        Title,
        '',
        'error')
}

export const showAlertInfo = (Title) => {
    Swal.fire(
        Title,
        '',
        'info')
}

