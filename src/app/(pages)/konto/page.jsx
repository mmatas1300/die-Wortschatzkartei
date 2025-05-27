'use client'
import { useSession } from 'next-auth/react'
import { Spinner } from "@material-tailwind/react";
import { Fade } from 'react-awesome-reveal';
import AccountConfig from '@/app/(pages)/konto/_components/AccountConfig';
import Tracker from '@/app/(pages)/konto/_components/tracker/Tracker';
import CardsProgress from '@/app/(pages)/konto/_components/CardsProgress';


function KontoPage() {

    const { data: session, status} = useSession();

    return (
        <Fade triggerOnce>
            <section className='flex flex-col justify-center items-center mx-auto my-12'>
                {status === "loading" ? (<Spinner className="mt-[calc(35vh)] h-10 w-10" />) :
                    (<>
                        <h1 className='text-xl mb-4'>Mein Konto</h1>
                        <h1 className='text-xl mb-4'>{session.user.config.nick ? "Willkommen " + session.user.config.nick + "!" : "Willkommen, richten Sie bitte Ihr Konto ein!"}</h1>
                        {session.user.config.nick ?
                           <><div className='mb-4'><Tracker /></div> <CardsProgress /> <AccountConfig /></> : <><AccountConfig /><div className='mt-14'><Tracker /></div> <div className='mt-4'><CardsProgress /></div></> 
                        }
                    </>)}

            </section>
        </Fade>
    )
}

export default KontoPage