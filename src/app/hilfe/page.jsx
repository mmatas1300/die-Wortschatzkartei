import FAQ from "@/components/hilfe/FAQ";
import Kontakt from "@/components/hilfe/Kontakt";

const HilfePage = () => {
    return (
        <section className="my-12">
            <div className="flex flex-col justify-center items-center">
                <h1>Hilfe</h1>
                <FAQ/>
                <Kontakt />
            </div>
        </section>
    );
};

export default HilfePage; 