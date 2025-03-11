import { useEffect, useState } from "react";
import { getPons } from '@/libs/data';
import parse from 'html-react-parser';
import { Spinner } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';

const PonsCard = ({ wort }) => {

    const { data: session} = useSession();

    const [wordData, setWordData] = useState(null)

    useEffect(() => {
        const findWord = async () => {
            const data = await getPons(session.user._id,wort);
            setWordData(data[0].hits[0].roms[0])
            console.log("Componente:", data[0].hits[0].roms[0])
        }
        findWord()
    }, [])

    return (
        <>
            {
                wordData ?
                    <div className={`bg-black-card p-3 rounded-xl max-w-64 absolute z-10 translate-x-7`}>
                        <div className="pons">
                            <div className="">
                                {parse(wordData.headword_full)}
                                {wordData.arabs.slice(0, 2).map(element => {
                                    return (
                                        <div className="flex flex-col mt-4">
                                            <div>
                                                {parse(element.header)}
                                            </div>

                                            {element.translations.slice(0, 2).map((traslation) => {
                                                return (
                                                    <div className="">
                                                        {parse(traslation.source)}
                                                        {parse(traslation.target)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    : 
                    <div className={`bg-black-card p-3 rounded-xl max-w-64 absolute z-10 translate-x-7`}>
                        <Spinner className="h-6 w-6" />
                    </div>}
        </>

    );
}

export default PonsCard;