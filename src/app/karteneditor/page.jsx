"use client"
import { CardList } from "@/components/kartenenditor/CardsList";
import CreateCardForm from "@/components/kartenenditor/CreateCardForm";



const KarteneditorPage = () => {

    return (
        <section className="my-12 flex flex-col justify-center items-center">
            <h1>Karteneditor</h1>
            <CreateCardForm/>
            <CardList/>
            
        </section>
    );
};

export default KarteneditorPage;