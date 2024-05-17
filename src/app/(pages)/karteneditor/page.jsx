"use client"
import { CardList } from "@/app/ui/kartenenditor/CardsList";
import CreateCardForm from "@/app/ui/kartenenditor/create/CreateCardForm";
import { Fade } from "react-awesome-reveal";

const KarteneditorPage = () => {

    return (
        <Fade triggerOnce>
            <section className="my-12 flex flex-col justify-center items-center">
                <h1>Karteneditor</h1>
                <CreateCardForm />
                <CardList />
            </section>
        </Fade>
    );
};

export default KarteneditorPage;