'use client'
import CardMessage from "@/components/CardMessage";
import { Fade } from "react-awesome-reveal";

function KontaktSuccessPage() {
    return (
        <section className="flex flex-col justify-center items-center my-12">
            <h1>Hilfe</h1>
            <Fade triggerOnce>
                <CardMessage message={"Nachricht gesendet"} />
            </Fade>
        </section>
    );
}

export default KontaktSuccessPage;