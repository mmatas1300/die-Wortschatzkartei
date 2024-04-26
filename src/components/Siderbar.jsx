"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from 'next/link'
import { useState } from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { Library as LibraryIcon } from 'lucide-react';
import { Mailbox as MailboxIcon } from 'lucide-react';
import { LogIn as LogInIcon } from 'lucide-react';
import { X as XIcon } from 'lucide-react';
import Logo from "@/components/Logo"

const Siderbar = () => {

    const [toggle,setToggle] = useState(false);


    return (
        <nav>
            <div className="lg:hidden h-14 bg-blue-card flex flex-row justify-start items-center">
                <button className='mt-0 ml-4' onClick={ ()=>{setToggle(true)} }><MenuIcon /></button>
            </div>

            <Sidebar rootStyles={{ height: "100vh", position: "fixed", top: 0, border: 0 }} backgroundColor={"rgb(0,120,163)"} width={"250px"} toggled={toggle} customBreakPoint={"960px"} onBackdropClick={()=>{setToggle(false)}} >

            <Logo />

                <button className='lg:hidden flex'  onClick={()=>{setToggle(false)}}><XIcon size={10}/></button>

                <Menu closeOnClick={true}>
                    <MenuItem icon={<LibraryIcon/>} component={<Link href="/worterbuch" />}> Wörterbuch</MenuItem>
                    <MenuItem icon={<MailboxIcon/>} component={<Link href="/kontakt" />}> Kontakt</MenuItem>
                    <MenuItem icon={<LogInIcon/>} component={<Link href="/login" />}> Anmelden</MenuItem>
                </Menu>

            </Sidebar>


        </nav>

    );
};

export default Siderbar;