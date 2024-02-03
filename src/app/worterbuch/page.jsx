'use client'
import Link from 'next/link'
import style from '@/app/ui/worterbuch.module.css'
function WorterbuchPage() {

    const alphaNum = Array.from(Array(26)).map((e, i) => i + 65);

    return (
        <div className="flex flex-row justify-center items-center flex-wrap mt-12">
            {alphaNum.map((x) => {
                return(
                    <Link href={`/worterbuch/${String.fromCharCode(x)}`} className={`${style.card} w-32 h-32 m-3 cursor-pointer text-base flex justify-center items-center rounded-xl transition duration-200 hover:scale-110`}>
                        {String.fromCharCode(x)}
                    </Link>

                )

            })}
        </div>
    );
    
}

export default WorterbuchPage
