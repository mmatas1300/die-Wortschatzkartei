'use client'
import Link from 'next/link'

function WorterbuchPage() {

    const alphaNum = Array.from(Array(26)).map((e, i) => i + 65);
    alphaNum.splice(23, 2)


    return (
        <div className="flex flex-row justify-center items-center flex-wrap mt-12">
            {alphaNum.map((x) => {
                return(
                    <Link key={x} href={`/worterbuch/${String.fromCharCode(x)}`} className='bg-orange-card hover:bg-yellow-card w-32 h-32 m-3 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110'>
                        {String.fromCharCode(x)}
                    </Link>
                )
            })}
        </div>
    );
    
}

export default WorterbuchPage
