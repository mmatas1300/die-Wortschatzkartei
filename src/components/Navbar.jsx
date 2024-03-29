'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { useState, useEffect} from 'react';
import { Spinner } from "@material-tailwind/react";

function Navbar() {
    const { status } = useSession();
    
    const varLinks = (status) => {
        if (status === "authenticated") {
            
            return (<>
                <Link onClick={menuToggle} className="block px-3 py-1" href="/konto">Mein Konto</Link>
                <Link onClick={menuToggle} className="block px-3 py-1" href="/">Üben</Link>
                <Link onClick={menuToggle} className="block px-3 py-1" href="/worterbuch">Wörterbuch</Link>
                <Link onClick={menuToggle} className="block px-3 py-1" href="/kontakt">Kontakt</Link>
                <button className="bg-transparent text-base m-0 block text-start px-3 py-1" onClick={() => { signOut(); }}>Abmelden</button>
            </>)
        } else if( status==="unauthenticated" ) {
            return (<>
                <Link onClick={menuToggle} className="block px-3 py-1" href="/worterbuch">Wörterbuch</Link>
                <Link onClick={menuToggle} className="block px-3 py-1" href="/kontakt">Kontakt</Link>
                <Link onClick={menuToggle} className="block px-3 py-1" href="/login">Anmelden</Link>
            </>)
        } else {
            return(<Spinner className="h-5 w-5" />);
        }
    }

    const [toggle, setToggle] = useState('h-0');
    const [burgerLinks, setBurgerLinks] = useState("hidden")
    const [windowSize, setWindowSize] = useState([0,0]);
    const [blockButton, setBlockButton] = useState(false);

    
    function menuToggle() {
        if ((toggle === "h-0")&&(windowSize[0]<720)) {
            setBlockButton(true)
            setToggle(status === "authenticated" ? "h-48" : "h-32")
            setTimeout(() => {
                setBurgerLinks('opacity-0');
            }, 200)
            setTimeout(() => {
                setBurgerLinks('opacity-25');
            }, 250)
            setTimeout(() => {
                setBurgerLinks('opacity-50');
            }, 300)
            setTimeout(() => {
                setBurgerLinks('opacity-75');
            }, 350)
            setTimeout(() => {
                setBurgerLinks('opacity-100');
                setBlockButton(false)
            }, 400)
        }
        else {
            setToggle("h-0")
            setBurgerLinks("hidden");
        };
    }

    const menuToggleLogo = () => {
        setToggle("h-0")
        setBurgerLinks("hidden");
    };

    useEffect(() => {
        if(windowSize[0] === 0){
            setWindowSize([window.innerWidth, window.innerHeight]);
        }
        const menuResize = () => {
            const window_size = window.innerWidth 
            if (window_size > 719) {
                setToggle("h-0");
                setBurgerLinks("hidden");
            }
            setWindowSize([window.innerWidth, window.innerHeight]);  
        };
        window.addEventListener('resize', menuResize);
        return () => {
            window.removeEventListener('resize', menuResize);
        };
    }, []);

    return (
        <nav className="bg-blue-card rounded-bl-2xl" role="navigation">
            <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">
                <div className="mr-4">
                    <Link onClick={menuToggleLogo} className='text-2xl' href="/">die Wortschatzkartei</Link>
                </div>
                <div className="ml-auto md:hidden">
                    <button
                        onClick={menuToggle}
                        className="bg-red-card m-0 flex items-center px-3 py-2 rounded "
                        type="button"
                        disabled = {blockButton}
                    >
                        {toggle !== 'h-0' ? (<svg className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor" >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>) : (<svg className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>)}
                    </button>
                </div>
                <div

                    className={`w-full ${toggle} transition-all ease-out duration-300 md:transition-none md:w-auto md:flex-grow md:flex md:items-center`}
                >
                    <div
                        id="ulMenu"
                        className={`flex flex-col ${burgerLinks} mt-5 mx-4 md:inline-flex md:flex-row md:items-center md:mx-0 md:ml-auto md:mt-0 md:pt-0 md:border-0`}
                    >
                        {varLinks(status)}
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar

