"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from 'next/link'
import { useState } from 'react';

const Siderbar = () => {

    const [toggle,setToggle] = useState(false);


    return (
        <nav>
            <div className="lg:hidden h-14 bg-red-card flex flex-row justify-start items-center">
                <button className='mt-0 ml-4' onClick={ ()=>{setToggle(true)} }>T</button>
            </div>

            <Sidebar rootStyles={{ height: "100vh", position: "fixed", top: 0, border: 0 }} backgroundColor={"rgb(0,120,163)"} width={"250px"} toggled={toggle} customBreakPoint={"960px"} onBackdropClick={()=>{setToggle(false)}} >

                <h1>die Wortschatzkartei</h1>

                <Menu closeOnClick={true}>
                    <MenuItem component={<Link href="/worterbuch" />}> Wörterbuch</MenuItem>
                    <MenuItem component={<Link href="/kontakt" />}> Kontakt</MenuItem>
                    <MenuItem component={<Link href="/login" />}> Anmelden</MenuItem>
                </Menu>
            </Sidebar>

        </nav>

    );
};

export default Siderbar;