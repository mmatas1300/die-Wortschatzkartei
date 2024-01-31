'use client'
import Link from 'next/link'
import {useSession} from 'next-auth/react'
import { signOut } from 'next-auth/react';

function Navbar(){


        const {status} = useSession();

    return(
        <nav>
            <div>
                <Link href="/">Home</Link>
                <ul>
                    {status ==="authenticated" ? (<><li><Link href="/dashboard">Perfil</Link></li>
                    <li><button onClick={()=>{signOut()}}>SALIR</button></li></>)
                    :(<li><Link href="/login">Login</Link></li>)}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar