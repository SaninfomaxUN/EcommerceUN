import Swal from "sweetalert2";

export const showAlertSuccess = (Title, callback, message) => {
    Swal.fire({
        title: Title,
        text: message,
        icon: 'success',
        confirmButtonText: 'Continuar',
    }).then((result) => {
        if (result.isConfirmed && typeof callback === 'function') {
            callback();
        }
    });
}

export const showAlertSuccessImage = (Title, callback, message, imageUrl,imageWidth,imageHeight,imageAlt) => {
    Swal.fire({
        title: Title,
        text: message,
        icon: 'success',
        confirmButtonText: 'Continuar',
        imageUrl: imageUrl,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
        imageAlt: imageAlt
    }).then((result) => {
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

export const showAlertInfo = (Title, callback) => {
    Swal.fire(
        Title,
        '',
        'info').then((result) => {
        if (result.isConfirmed && typeof callback === 'function') {
            callback();
        }
    });
}

export const showConfirmationAlert = (title, text, question, textYes, titleSuccess, textSuccess) => {
    Swal.fire({
        title: title,
        text: "You won't be able to revert this!",
        icon: question,
        showCancelButton: true,
        confirmButtonColor: '#4eb421',
        cancelButtonColor: '#d33',
        confirmButtonText: textYes
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                titleSuccess,
                textSuccess,
                'success'
            ).then(r => {})
        }
    })
}

