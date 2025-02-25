'use client'
import FAQ from "@/app/ui/hilfe/FAQ";
import Kontakt from "@/app/ui/hilfe/Kontakt";
import { Fade } from "react-awesome-reveal";

const HilfePage = () => {
    return (
        <section className="my-12">
            <Fade triggerOnce>
                <div className="flex flex-col justify-center items-center">
                    <h1>Hilfe</h1>
                    <FAQ />
                    <Kontakt />
                </div>
            </Fade>
        </section>
    );
};

export default HilfePage; 