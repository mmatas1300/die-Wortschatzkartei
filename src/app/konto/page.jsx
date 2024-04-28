'use client'
import { useSession } from 'next-auth/react'
import Kontoeinstellungen from '@/components/Kontoeinstellungen';
import { useState } from 'react';
import { Spinner } from "@material-tailwind/react";
import { ThemeProvider } from "@material-tailwind/react";
import {Tabs,TabsHeader,TabsBody,Tab,TabPanel,} from "@material-tailwind/react";
import Karteneditor from '@/components/Karteneditor';

function KontoPage() {

    const { data: session, status } = useSession();

    console.log(session, status);

    return (
        <div className='mx-auto'>
            <div className='flex flex-col justify-center items-center mt-12'>
                {status === "loading"? (<Spinner className="mt-2.5 h-10 w-10" />):
                (<>
                    <h1 className='text-2xl mb-10'>{session.user.config.nick ? "Willkommen " + session.user.config.nick + "!" : "Willkommen, richten Sie bitte Ihr Konto ein!"}</h1>
                    <Kontoeinstellungen />
                    <Karteneditor/>
                </>)}
            </div>
        </div>
    )
}

export default KontoPage