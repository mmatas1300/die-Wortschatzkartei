'use client'
import '@/app/ui/login.css'
import { Spinner } from "@material-tailwind/react";
import { useState } from "react"
import axios from 'axios';


function LoginPage() {

    const [formState, setFormState] = useState("container");
    const [buttonState, setButtonState] = useState("Weiter");
    const [formError, setFormError] = useState();

    const dataValidation = (data) => {
        let validation = true;
        if (data.get("email").length === 0) {
            setFormError("Gib deine E-Mail-Adresse ein")
            validation = false;
        } else if (data.get("password") !== data.get("confirmPassword")) {
            setFormError("Die Passwörter stimmen nicht überein")
            validation = false;
        }
        return validation;
    };

    const handleRegistrierenSubmit = async (e) => {
        e.preventDefault();
        setButtonState(<Spinner />);
        const formData = new FormData(e.currentTarget)//extraer datos del form

        if (dataValidation(formData)) {
            try {
                const res = await axios.post('/api/auth/signup', {
                    email: formData.get("email"),
                    password: formData.get("password")
                })
                console.log(res)
                setFormError()
            } catch (error) {
                setFormError(error.response.data.message)
            }
        }
        setButtonState("Weiter");
    };

    return (
        <section>
            <div className={formState}>
                <div className="form-container sign-up">
                    <form onSubmit={handleRegistrierenSubmit}>
                        <h1>Registrieren</h1>
                        <p>Es geht ganz schnell und einfach.</p>
                        <label htmlFor="email">Deine E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" />
                        <label htmlFor="password">Neues Passwort:</label>
                        <input type="password" placeholder="Neues Passwort" name="password" />
                        <label htmlFor="confirmPassword">Passwort nochmals eingeben:</label>
                        <input type="password" placeholder="Passwort nochmals eingeben" name="confirmPassword" />
                        {formError && <div className='error'>{formError}</div>}
                        <button>{buttonState}</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Anmelden</h1>
                        <p>Willkommen zurück!</p>
                        <label htmlFor="email">Deine E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" />
                        <label htmlFor="password">Dein Passwort:</label>
                        <input type="password" placeholder="Passwort" />
                        {formError && <div className='error'>{formError}</div>}
                        <button>{buttonState}</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Willkommen zurück!</h1>
                            <p>Du hast bereits ein Konto?</p>
                            <button id="login" onClick={() => { setFormError(); setFormState("container") }}>
                                Anmelden
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Willkommen!</h1>
                            <p>Du hast kein Konto?</p>
                            <button onClick={() => { setFormError(); setFormState("container active") }}>
                                Registrieren
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default LoginPage