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
            if(data)
                setWordData(data[0].hits[0].roms[0]);
            else
                setWordData({headword_full: "Error, please verify your PONS secret.",arabs:[]})

        }
        findWord()
    }, [])

    return (
        <>
            {
                wordData ?
                    <div className={`bg-black-card p-3 rounded-xl w-64 absolute top-full z-10 left-0 -translate-y-1`}>
                        <div className="pons">
                            <div className="">
                                {parse(wordData.headword_full)}
                                {wordData.arabs.slice(0, 2).map((element,index) => {
                                    return (
                                        <div key={index} className="flex flex-col mt-4">
                                            <div>
                                                {parse(element.header)}
                                            </div>

                                            {element.translations.slice(0, 2).map((traslation,index) => {
                                                return (
                                                    <div key={index}>
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
                    <div className={`bg-black-card p-3 rounded-xl max-w-64 absolute top-full z-10 left-0 -translate-y-1`}>
                        <Spinner className="h-6 w-6" />
                    </div>}
        </>

    );
}

export default PonsCard;