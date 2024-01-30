'use client'
import {useSession} from 'next-auth/react'

function DashboardPage(){
    
    const {data: session, status} = useSession();
    
    console.log(session,status);

    return(
        <div>
            <h1>Buenas tardes</h1>
            <div>{JSON.stringify(session)}</div>
            <div>{JSON.stringify(status)}</div>
        </div>
    )
}

export default DashboardPage