"use client"
import CreateCardForm from "@/app/(pages)/karteneditor/_components/editor/CreateCardForm";
import { Fade } from "react-awesome-reveal";
import { useSession } from "next-auth/react";
import { Spinner } from "@material-tailwind/react";
import { CardsList } from "./_components/verwalten/CardsList";

const KarteneditorPage = () => {

    const { data: session, status } = useSession();

    return (
        <Fade triggerOnce>
            <section className="my-12 flex flex-col justify-center items-center">
                <h1>Karteneditor</h1>
                {status === "loading" ? (<Spinner className="mt-[calc(35vh)] h-10 w-10" />) : (
                    session.user.config.cardsSet === "app" ?
                        (
                            <CardsList />
                        ) : (<>
                            <CreateCardForm />
                            <CardsList />
                        </>
                        )
                )}

            </section>
        </Fade>
    );
};

export default KarteneditorPage;