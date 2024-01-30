'use client'
import '@/app/ui/login.css'
import { useState } from "react"
function LoginPage() {

    const [formState, setFormState] = useState("container");

    return (
        <section>
            <div className={formState}>
                <div className="form-container sign-up">
                    <form>
                        <h1>Registrieren</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Password" />
                        <button>Registrieren</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Melden Sie sich bei Ihrem Konto an</h1>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Anmelden</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Willkommen zurück!</h1>
                            <p>Du hast bereits ein Konto?</p>
                            <button id="login" onClick={(e) => { e.preventDefault(); setFormState("container") }}>
                                Anmelden
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Willkommen!</h1>
                            <p>Du hast kein Konto?</p>
                            <button onClick={(e) => { e.preventDefault(); setFormState("container active") }}>
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