"use client"
import { MeineCardList } from "@/app/ui/karteneditor/meineKarte/MeineCardsList";
import CreateCardForm from "@/app/ui/karteneditor/create/CreateCardForm";
import { Fade } from "react-awesome-reveal";
import { AppCardList } from "@/app/ui/karteneditor/appKarte/AppCardsList";
import { useSession } from "next-auth/react";
import { Spinner } from "@material-tailwind/react";
import PonsCard from "@/components/Pons/PonsContainerKarte";

const KarteneditorPage = () => {

    const { data: session, status } = useSession();

    return (
        <Fade triggerOnce>
            <section className="my-12 flex flex-col justify-center items-center">
                <h1>Karteneditor</h1>
                {status === "loading" ? (<Spinner className="mt-[calc(35vh)] h-10 w-10" />) : (
                    session.user.config.cardsSet === "app" ?
                        (
                            <AppCardList />
                        ) : (<>
                            <CreateCardForm />
                            <MeineCardList />
                        </>
                        )
                )}

            </section>
        </Fade>
    );
};

export default KarteneditorPage;