import { Spinner } from "@material-tailwind/react";
import { useState } from "react"
import style from '@/app/ui/login/login.module.css'
import { useRouter } from "next/navigation";
import { anmelden, registrieren } from "@/libs/data";

const Form = () => {

    const weiterButton = (<button>Weiter</button>);
    const spinner = (<Spinner className="mt-2.5 h-[41px] w-[41px]" />);

    const [formState, setFormState] = useState(style["container"]);
    const [buttonState, setButtonState] = useState(weiterButton);
    const [formError, setFormError] = useState();
    const router = useRouter();

    const dataValidation = (data) => {
        let validation = true;
        if (data.get("email").length === 0) {
            setFormError("Gib deine E-Mail-Adresse ein")
            validation = false;
        } else if (data.get("password").length < 3) {
            setFormError("Passwörter müssen mindestens 3 Zeichen lang sein")
            validation = false;
        } else if (data.get("password") !== data.get("confirmPassword")) {
            setFormError("Die Passwörter stimmen nicht überein")
            validation = false;
        }
        return validation;
    };

    const handleRegistrierenSubmit = async (e) => {
        e.preventDefault();
        setFormError();
        setButtonState(spinner);
        const formData = new FormData(e.currentTarget);
        if (!dataValidation(formData)) setButtonState(weiterButton);
        else {
            const res = await registrieren(formData.get("email"), formData.get("password"));
            if (res) {
                setFormError(res.message);
                setButtonState(weiterButton);
            } else {
                setButtonState(<div className={style['success']}>Erfolgreiche Registrierung!</div>);
                setTimeout(function () {
                    setFormState(style["container"])
                    setButtonState(weiterButton)
                }, 1500);
            }
        }
    };

    const handleAnmeldenSubmit = async (e) => {
        e.preventDefault();
        setButtonState(spinner);
        const formData = new FormData(e.currentTarget)
        const res = await anmelden(formData.get("email"), formData.get("password"));
        if (res.ok) return router.push("/konto");
        setFormError(res.error);
        setButtonState(weiterButton);
    };

    return (
        <div className={style["section"]}>
            <div className={formState}>
                <div className={`${style["form-container"]} ${style["sign-up"]}`}>
                    <form onSubmit={handleRegistrierenSubmit}>
                        <h1 className="mb-1">Registrieren</h1>
                        <p className="mb-1 text-center">Es geht ganz schnell und einfach.</p>
                        <label htmlFor="email">Deine E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" />
                        <label htmlFor="password">Neues Passwort:</label>
                        <input type="password" placeholder="Neues Passwort" name="password" />
                        <label htmlFor="confirmPassword">Passwort nochmals eingeben:</label>
                        <input type="password" placeholder="Passwort nochmals eingeben" name="confirmPassword" />
                        {formError && <div className={style['error']}>{formError}</div>}
                        {buttonState}
                    </form>
                </div>
                <div className={`${style["form-container"]} ${style["sign-in"]}`}>
                    <form onSubmit={handleAnmeldenSubmit}>
                        <h1 className="mb-2">Anmelden</h1>
                        <p className="mb-2">Willkommen zurück!</p>
                        <label htmlFor="email">Deine E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" required />
                        <label htmlFor="password">Dein Passwort:</label>
                        <input type="password" placeholder="Passwort" name="password" required />
                        {formError && <div className={style['error']}>{formError}</div>}
                        {buttonState}
                    </form>
                </div>
                <div className={style["toggle-container"]}>
                    <div className={style["toggle"]}>
                        <div className={`${style["toggle-panel"]} ${style["toggle-left"]}`}>
                            <h1 className="mb-2">Willkommen zurück!</h1>
                            <p className="mb-2">Du hast bereits ein Konto?</p>
                            <button onClick={() => { setFormError(); setFormState(style["container"]) }}>
                                Anmelden
                            </button>
                        </div>
                        <div className={`${style["toggle-panel"]} ${style["toggle-right"]}`}>
                            <h1 className="mb-2">Willkommen!</h1>
                            <p className="mb-2">Du hast kein Konto?</p>
                            <button onClick={() => { setFormError(); setFormState(`${style["container"]} ${style["active"]}`) }}>
                                Registrieren
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;