'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import '@/components/Navbar.css';

function Navbar() {
    const [navbarToggle, setNabvarToggle] = useState(false);

    const toggleNavbar = () => {
        setNabvarToggle(!navbarToggle);
    }
    const { status } = useSession();

    const varLinks = (status)=>{
        if(status === "authenticated") {
            return(<>
                <Link className='navLink block' href="/">Home</Link>
                <Link className='navLink block' href="/dashboard">Perfil</Link>
                <Link className='navLink block' href="/contact">Kontakt</Link>
                <button className='navLink block' onClick={()=>{signOut()}}>Abmelden</button>
            </>)
        } else{
            return(<>
            <Link className='navLink block' href="/">Home</Link>
            <Link className='navLink block' href="/contact">Kontakt</Link>
            <Link className='navLink block' href="/login">Anmelden</Link>
            </>)
        }
    }


    return (
        <nav>
            <div className='mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <div className='flex-shrink-0 text-2xl'>
                            <Link href="/">die Wortschatzkartei</Link>
                            
                        </div>
                    </div>
                    <div className='hidden md:block'>
                        <div className='ml-4 flex items-center space-x-6'>
                            {varLinks(status)}
                        </div>
                    </div>
                    <div className='md:hidden flex items-center'>
                        <button className='inline-flex items-center justify-center p-2 rounded-md' onClick={toggleNavbar}>
                            {navbarToggle ? (<svg className="h-6 w-6"
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
                </div>
            </div>
            {navbarToggle && (
                <div className='flex flex-col justify-center items-center pb-4 md:hidden'>
                        {varLinks(status)}
                </div>
            )}
        </nav>
    )
}

export default Navbar

