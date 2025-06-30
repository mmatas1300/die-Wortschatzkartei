import { useContext, useState } from "react"
import style from '@/app/(pages)/login/_style/login.module.css'
import { useRouter } from "next/navigation";
import { signin, signup } from "@/libs/FetchAPI";
import { hexColor } from "@/utils/hexColors";
import LoadingButton from "@/components/LoadingButton";
import signUpValidation from "@/utils/signUpValidaton";
import { AlertMessageContext } from "@/contexts/AlertMessageContext";

const Form = () => {

    const [formState, setFormState] = useState(style["container"]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const router = useRouter();
    const { showNotification } = useContext(AlertMessageContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        const formData = new FormData(e.currentTarget);
        try {
            signUpValidation(formData.get("email"), formData.get("password"), formData.get("confirmPassword"));
            await signup(formData.get("email"), formData.get("password"));
            showNotification("Erfolgreiche Registrierung!", hexColor.greenCard);
            setTimeout(function () {
                setFormState(style["container"])
            }, 500);
        } catch (error) {
            showNotification(error.message, hexColor.redCard);
        }
        setButtonLoading(false);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        const formData = new FormData(e.currentTarget)
        try {
            await signin(formData.get("email"), formData.get("password"));
            return router.push("/konto");
        } catch (error) {
            showNotification(error.message,hexColor.redCard)   
        }
        setButtonLoading(false);
    };

    return (
        <div className={style["section"]}>
            <div className={formState}>
                <div className={`${style["form-container"]} ${style["sign-up"]}`}>
                    <form onSubmit={handleSignUp}>
                        <h1 className="mb-1">Registrieren</h1>
                        <p className="mb-1 text-center">Es geht ganz schnell und einfach.</p>
                        <label htmlFor="email">Deine E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" />
                        <label htmlFor="password">Neues Passwort:</label>
                        <input type="password" placeholder="Neues Passwort" name="password" />
                        <label htmlFor="confirmPassword">Passwort nochmals eingeben:</label>
                        <input type="password" placeholder="Passwort nochmals eingeben" name="confirmPassword" />
                        <LoadingButton isLoading={buttonLoading}>Weiter</LoadingButton>
                    </form>
                </div>
                <div className={`${style["form-container"]} ${style["sign-in"]}`}>
                    <form onSubmit={handleSignIn}>
                        <h1 className="mb-2">Anmelden</h1>
                        <p className="mb-2">Willkommen zurück!</p>
                        <label htmlFor="email">Deine E-Mail-Adresse:</label>
                        <input type="email" placeholder="E-Mail-Adresse" name="email" required />
                        <label htmlFor="password">Dein Passwort:</label>
                        <input type="password" placeholder="Passwort" name="password" required />
                        <LoadingButton isLoading={buttonLoading}>Weiter</LoadingButton>
                    </form>
                </div>
                <div className={style["toggle-container"]}>
                    <div className={style["toggle"]}>
                        <div className={`${style["toggle-panel"]} ${style["toggle-left"]}`}>
                            <h1 className="mb-2">Willkommen zurück!</h1>
                            <p className="mb-2">Du hast bereits ein Konto?</p>
                            <button onClick={() => { setFormState(style["container"]) }}>
                                Anmelden
                            </button>
                        </div>
                        <div className={`${style["toggle-panel"]} ${style["toggle-right"]}`}>
                            <h1 className="mb-2">Willkommen!</h1>
                            <p className="mb-2">Du hast kein Konto?</p>
                            <button onClick={() => { setFormState(`${style["container"]} ${style["active"]}`) }}>
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