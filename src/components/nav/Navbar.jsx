'use client'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { Menu as MenuIcon, NotebookText as LibraryIcon, Mailbox as MailboxIcon, LogIn as LogInIcon, X as XIcon, CircleUser as CircleUserIcon, SquarePlay as SquarePlayIcon, LogOut as LogOutIcon, FilePenLine as FilePenLineIcon } from 'lucide-react';
import Logo from "@/components/nav/Logo"
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import { Spinner } from "@material-tailwind/react";

const Navbar = () => {

    const [toggle, setToggle] = useState(false);
    const [windowSize, setWindowSize] = useState(0);
    const { status } = useSession();

    const toggleNavbar = (width) => {
        if (width > 960) {
            setToggle(true);
        }
        else {
            setToggle(false);
        }
    };

    useEffect(() => {

        if (windowSize === 0) {
            setWindowSize(window.innerWidth);
            toggleNavbar(window.innerWidth);

        }

        const menuResize = () => {
            setWindowSize(window.innerWidth);
            toggleNavbar(window.innerWidth);
        };

        window.addEventListener('resize', menuResize);
        return () => {
            window.removeEventListener('resize', menuResize);
        };
    }, []);

    const varLinks = (status) => {
        if (status === "authenticated") {
            return (<>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<CircleUserIcon />} component={<Link href="/konto" />}> Mein Konto</MenuItem>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<FilePenLineIcon />} component={<Link href="/karteneditor" />}> Karteneditor</MenuItem>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<SquarePlayIcon />} component={<Link href="/uben" />}> Üben</MenuItem>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<LibraryIcon />} component={<Link href="/worterbuch" />}> Wörterbuch</MenuItem>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<MailboxIcon />} component={<Link href="/kontakt" />}> Kontakt</MenuItem>
                <MenuItem className='abmelden' onClick={() => { signOut(); toggleNavbar(windowSize); }} icon={<LogOutIcon />}>Abmelden</MenuItem>
            </>)
        } else if (status === "unauthenticated") {
            return (<>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<LibraryIcon />} component={<Link href="/worterbuch" />}> Wörterbuch</MenuItem>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<MailboxIcon />} component={<Link href="/kontakt" />}> Kontakt</MenuItem>
                <MenuItem onClick={() => { toggleNavbar(windowSize) }} icon={<LogInIcon />} component={<Link href="/login" />}> Anmelden</MenuItem>
            </>)
        } else {
            () => { setToggle(false) };
            return (<div className='flex justify-center items-center'><Spinner className="h-10 w-10" /></div>);
        }
    }

    return (
        <nav>
            <div className="lg:hidden h-14 bg-blue-card flex flex-row justify-between  items-center">
                <button className='mt-0 ml-4' onClick={() => { setToggle(true) }}><MenuIcon /></button>
                <div className={toggle ? "hidden" : "flex"}>
                    <Logo />
                </div>
                <div className='w-[74px]' />
            </div>

            <Sidebar rootStyles={{ height: "100vh", position: "fixed", top: 0, border: 0 }} backgroundColor={"rgb(0,120,163)"} width={"250px"} toggled={toggle} customBreakPoint={"960px"} onBackdropClick={() => { setToggle(false) }} collapsed={!toggle} collapsedWidth={!toggle ? "0px" : "250px"} >

                <div className='flex flex-row justify-between'>
                    <Logo />
                    <button className='lg:hidden block p-3 my-auto mx-2' onClick={() => { setToggle(false) }}><XIcon size={16} /></button>
                </div>

                <Menu menuItemStyles={{
                    button: {
                        ":hover": { backgroundColor: "#4CAB2A", borderRadius: "16px", margin: "0px 10px", transitionProperty: "all", transitionDuration: "150ms"},
                    }
                }}>
                    {varLinks(status)}
                </Menu>
            </Sidebar>
        </nav>
    );
};

export default Navbar;