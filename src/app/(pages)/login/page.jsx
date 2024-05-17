'use client'
import { Fade } from "react-awesome-reveal";
import Form from "@/app/ui/login/Form";

function LoginPage() {

    return (
        <section className="my-12">
            <Fade triggerOnce>
                <h1 className="text-center">Anmelden/Registrieren</h1>
                <Form/>
            </Fade>
        </section>
    )
}

export default LoginPage;