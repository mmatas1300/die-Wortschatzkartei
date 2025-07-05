import Link from "next/link";

const LettersGrid = () => {
    const alphabet = Array.from(Array(26)).map((e, i) => i + 65);
    alphabet.splice(23, 2);
    return (
        <div className="flex flex-row justify-center items-center flex-wrap mt-4">
            {alphabet.map((letter) => {
                return (
                    <Link id={String.fromCharCode(letter)} key={letter} href={`/worterbuch/${String.fromCharCode(letter)}`} className="bg-orange-card hover:bg-yellow-card w-32 h-32 m-3 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110">
                        {String.fromCharCode(letter)}
                    </Link>
                );
            })}
        </div>
    );
};

export default LettersGrid;