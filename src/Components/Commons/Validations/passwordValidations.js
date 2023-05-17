

export const passwordValidation = (password, confirmPassword, email) => {
    if (password !== confirmPassword) {
        console.log("FFFFFF")
        return [false, "Las contraseñas no coinciden."];
    }

    if (password.length < 8) {
        return [false, "La contraseña debe tener mínimo 8 caracteres."];
    }

    if (password.length > 20) {
        return [false, "La contraseña debe tener máximo 20 caracteres."];
    }

    if (!/[A-Z]/.test(password)) {
        return [false, "La contraseña debe contener mínimo una letra Mayúscula."];
    }

    if (!/[a-z]/.test(password)) {
        return [false, "La contraseña debe contener mínimo una letra Minúscula."] ;
    }

    if (!/\d/.test(password)) {
        return [false, "La contraseña debe contener mínimo un número."];
    }

    if (password === email) {
        return [false, "La contraseña NO puede ser igual al correo electrónico."];
    }
    return [true,""];
}