'use client'
import { useSession } from 'next-auth/react'
import Kontoeinstellungen from '@/components/Kontoeinstellungen';
import { useState, useEffect } from 'react';
import { Spinner } from "@material-tailwind/react";
import { ThemeProvider } from "@material-tailwind/react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Karteneditor from '@/components/Karteneditor';

function KontoPage() {

    const tabPanelTheme = {
        tabPanel: {
            defaultProps: {
                className: "",
            },
            styles: {
                base: {
                    width: "w-full",
                    height: "h-max",
                    color: "",
                    p: "",
                    fontSmoothing: "",
                    fontFamily: "",
                    fontSize: "",
                    fontWeight: "",
                    lineHeight: "",
                },
            },
        },
    };

    const tabTheme = {
        tab: {
            defaultProps: {
                className: "",
                activeClassName: "",
                disabled: false,
            },
            styles: {
                base: {
                    tab: {
                        initial: {
                            display: "flex",
                            alignItems: "items-center",
                            justifyContent: "justify-center",
                            textAlign: "text-center",
                            width: "w-full",
                            height: "h-full",
                            position: "relative",
                            bg: "bg-transparent",
                            py: "py-1",
                            px: "px-2",
                            color: "",
                            fontSmoothing: "",
                            fontFamily: "",
                            fontSize: "",
                            fontWeight: "",
                            lineHeight: "",
                            userSelect: "select-none",
                            cursor: "cursor-pointer",
                        },
                        disabled: {
                            opacity: "",
                            cursor: "cursor-not-allowed",
                            pointerEvents: "pointer-events-none",
                            userSelect: "select-none",
                        },
                    },
                    indicator: {
                        position: "absolute",
                        inset: "inset-0",
                        zIndex: "z-10",
                        height: "h-full",
                        bg: "bg-black-card",
                        borderRadius: "rounded-md",
                        boxShadow: "",
                    },
                },
            },
        },
    };

    const data = [
        {
            label: "Kontoeinstellungen",
            value: "Kontoeinstellungen",
            desc: <Kontoeinstellungen />
        },
        {
            label: "Karteneditor",
            value: "Karteneditor",
            desc: <Karteneditor />
        }
    ];

    const { data: session, status } = useSession();

    const [userMessages, setUserMessages] = useState(<Spinner className="mt-2.5 h-10 w-10" />);

    console.log(session, status);

    useEffect(() => {
        if (status === "loading") {
            setUserMessages(<Spinner className="mt-2.5 h-10 w-10" />)
        } else if (status === "authenticated") {
            setUserMessages(<>
                <h1 className='text-2xl mb-10'>{session.user.config.nick ? "Willkommen " + session.user.config.nick + "!" : "Willkommen, richten Sie bitte Ihr Konto ein!"}</h1>
                {/* <div className='mx-auto'>{JSON.stringify(session)}</div>
                <div className='mx-auto'>{JSON.stringify(status)}</div>  */}
                <ThemeProvider value={tabTheme}>
                    <Tabs value="Kontoeinstellungen" className="max-w-[40rem]">
                        <TabsHeader className='bg-yellow-card bg-opacity-100'>
                            {data.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            <ThemeProvider value={tabPanelTheme}>
                                {data.map(({ value, desc }) => (
                                    
                                        <TabPanel key={value} value={value}>
                                            {desc}
                                        </TabPanel>
                                ))}
                            </ThemeProvider>
                        </TabsBody>
                    </Tabs>
                </ThemeProvider>
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