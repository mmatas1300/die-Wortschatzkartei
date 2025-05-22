const registerValidation = (email, password, confirmPassword) => {
    if (email.length === 0) {
        return "Gib deine E-Mail-Adresse ein";
    } else if (password.length < 3) {
        return "Passwörter müssen mindestens 3 Zeichen lang sein";
    } else if (password !== confirmPassword) {
        return "Die Passwörter stimmen nicht überein";
    }
    return null;
};

export default registerValidation