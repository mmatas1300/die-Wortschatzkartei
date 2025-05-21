'use client'
import FAQ from "@/app/(pages)/hilfe/_components/FAQ";
import Kontakt from "@/app/(pages)/hilfe/_components/Kontakt";
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