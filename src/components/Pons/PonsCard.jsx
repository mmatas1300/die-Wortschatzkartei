import parse from 'html-react-parser';

const PonsCard = ({ wordData }) => {
    return (

            <div className="pons">
                <div className="">
                    {parse(wordData.word)}
                    {wordData.entries.map((element, index) => {
                        return (
                            <div key={index} className="flex flex-col mt-4">
                                <div>
                                    {parse(element.header)}
                                </div>

                                {element.translations.map((traslation, index) => {
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
    );
}

export default PonsCard;