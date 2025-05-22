'use client'
import { Fade } from "react-awesome-reveal";
import Form from "@/app/(pages)/login/_components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginPage() {

    const {status} = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(status === "authenticated")
            router.push("/konto");
    },[status])

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