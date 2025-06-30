const signUpValidation = (email, password, confirmPassword) => {
    if (email.length === 0) 
        throw new Error("Gib deine E-Mail-Adresse ein");
    else if (password.length < 3)
        throw new Error("Passwörter müssen mindestens 3 Zeichen lang sein");
    else if (password !== confirmPassword)
        throw new Error("Die Passwörter stimmen nicht überein");
};

export default signUpValidation