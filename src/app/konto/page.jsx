'use client'
import {useSession} from 'next-auth/react'

function KontoPage(){
    
    const {data: session, status} = useSession();
    
    console.log(session,status);

    return(
        <section className='container mx-auto mt-12'>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='text-2xl'>Willkommen Freund!</h1>
            <div>{JSON.stringify(session)}</div>
            </div>

        </section>
    )
}

export default KontoPage