import Swal from "sweetalert2";

export const showAlertSuccess = (Title) => {
    Swal.fire(
        Title,
        '',
        'success')
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

