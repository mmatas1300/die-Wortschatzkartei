'use client'
import { useSession } from 'next-auth/react'
import Kontoeinstellungen from '@/components/Kontoeinstellungen';
import { useState, useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";
import Karteneditor from '@/components/Karteneditor';

function KontoPage() {

    const { data: session, status } = useSession();

    const [userMessages, setUserMessages] = useState(<Spinner className="mt-2.5 h-10 w-10" />);

    console.log(session, status);

    useEffect(() => {
        if (status === "loading") {
            setUserMessages(<Spinner className="mt-2.5 h-10 w-10" />)
        } else if (status === "authenticated") {
            setUserMessages(<>
                <h1 className='text-2xl mb-10'>{session.user.config.nick ? "Willkommen "+session.user.config.nick+"!":"Willkommen, richten Sie bitte Ihr Konto ein!"}</h1>
                <Kontoeinstellungen />
                <Karteneditor />
                {/* <div className='mx-auto'>{JSON.stringify(session)}</div>
                <div className='mx-auto'>{JSON.stringify(status)}</div> */}
            </>)
        }
    }, [status])

    return (
        <section className='mx-auto mt-12'>
            <div className='flex flex-col justify-center items-center'>
                {userMessages}
            </div>

        </section>
    )
}

export default KontoPage