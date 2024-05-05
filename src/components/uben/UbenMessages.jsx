const UbenMessages = ({message}) => {

    return (
        <div className="bg-blue-card rotate-35 rounded-2xl mt-[calc(25vh)]">
            <div className="bg-purple-card -rotate-5 rounded-2xl">
                <div className="bg-green-card -rotate-10 rounded-2xl">
                    <div className="bg-red-card -rotate-10 rounded-2xl">
                        <div className="bg-orange-card px-10 py-16 rounded-2xl -rotate-10">
                            <div className="text-xl">{message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UbenMessages;