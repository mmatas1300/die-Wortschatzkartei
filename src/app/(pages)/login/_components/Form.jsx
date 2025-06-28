import { Spinner } from "@material-tailwind/react";
import { useState } from "react"
import style from '@/app/(pages)/login/_style/login.module.css'
import { useRouter } from "next/navigation";
import { signin, signup } from "@/services/FetchAPI";
import { useWarningMessage } from "@/hooks/useNotification";
import { hexColor } from "@/utils/colors";
import AutohideSnackbar from "@/components/Snackbar";
import registerValidation from "@/utils/registerValidaton";

const Form = () => {

    const weiterButton = (<button>Weiter</button>);
    const spinner = (<Spinner className="mt-2.5 h-[41px] w-[41px]" />);

    const [formState, setFormState] = useState(style["container"]);
    const [buttonState, setButtonState] = useState(weiterButton);
    const [warningMessage, warningTrigger, warningColor, setWarningMessage] = useWarningMessage();
    const router = useRouter();

    const handleRegistrierenSubmit = async (e) => {
        e.preventDefault();
        setButtonState(spinner);
        const formData = new FormData(e.currentTarget);
        const infoValidated = registerValidation(formData.get("email"),formData.get("password"),formData.get("confirmPassword"));
        if (infoValidated){
            setWarningMessage(infoValidated,hexColor.redCard)
            setButtonState(weiterButton);
        }
        else {
            const body = await signup(formData.get("email"), formData.get("password"));
            if (!body.ok) {
                setWarningMessage(body.message,hexColor.redCard);
                setButtonState(weiterButton);
            } else {
                setWarningMessage("Erfolgreiche Registrierung!",hexColor.greenCard)
                setTimeout(function () {
                    setFormState(style["container"])
                    setButtonState(weiterButton)
                }, 500);
            }
        }
    };

    const handleAnmeldenSubmit = async (e) => {
        e.preventDefault();
        setButtonState(spinner);
        const formData = new FormData(e.currentTarget)
        const res = await signin(formData.get("email"), formData.get("password"));
        if (res.ok) return router.push("/konto");
        setWarningMessage(res.error, hexColor.redCard);
        setButtonState(weiterButton);
    };

    return (
        <div className={style["section"]}>
            <AutohideSnackbar message={warningMessage} color={warningColor} trigger={warningTrigger}/>
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
                        {buttonState}
                    </form>
                </div>
                <div className={style["toggle-container"]}>
                    <div className={style["toggle"]}>
                        <div className={`${style["toggle-panel"]} ${style["toggle-left"]}`}>
                            <h1 className="mb-2">Willkommen zurück!</h1>
                            <p className="mb-2">Du hast bereits ein Konto?</p>
                            <button onClick={() => {setFormState(style["container"]) }}>
                                Anmelden
                            </button>
                        </div>
                        <div className={`${style["toggle-panel"]} ${style["toggle-right"]}`}>
                            <h1 className="mb-2">Willkommen!</h1>
                            <p className="mb-2">Du hast kein Konto?</p>
                            <button onClick={() => {setFormState(`${style["container"]} ${style["active"]}`) }}>
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