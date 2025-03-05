'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { LuMessagesSquare, LuMoonStar, LuUser, LuSettings } from "react-icons/lu";
import { ImExit } from "react-icons/im";
import { GoSun } from "react-icons/go";
import { useState, useEffect } from 'react';

import logo from '../../../public/logos/PH Branco.png';
import logo2 from '../../../public/logos/PH Preto.png';

import { Input } from '../ui/input';
import { useTheme } from 'next-themes';

// type NavbarProps = {
//     theme
// }

export default function Navbar() {
    const pathname = usePathname();
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav role='contentInfo' className='fixed w-full flex items-center bg-[var(--background)] border-b-[var(--foreground)] border-b-2 h-12'>
            <div className='w-1/3 flex'>

                {
                    mounted &&

                    <Link href="/" className="ml-10 w-1/3 h-8">
                        {
                            theme == 'dark' ?
                                <Image src={logo} alt='logo' height={30} /> :
                                <Image src={logo2} alt='logo' height={30} />
                        }
                    </Link>
                }
            </div>

            {
                pathname == '/home' ?

                    <div id='search_bar' className='w-1/2 flex justify-center'>
                        <div className='w-1/2'>
                            <Input placeholder='Search Bar' className='h-8' />
                        </div>
                    </div>

                    :

                    <div id='search_bar' className='w-1/2 flex justify-center bg-green-400'>
                    </div>

            }

            {
                mounted &&

                <div className='w-1/3 flex justify-end gap-3 items-center'>
                    {
                        theme == 'dark' ?
                            <GoSun onClick={() => { setTheme('light') }} size={35} style={{ backgroundColor: 'var(--background)' }} /> :
                            <LuMoonStar onClick={() => { setTheme('dark') }} size={35} style={{ backgroundColor: 'var(--background)' }} />
                    }
                    <LuMessagesSquare size={35} style={{ backgroundColor: 'var(--background)' }} />
                    <LuUser size={35} style={{ backgroundColor: 'var(--background)' }} />
                    <LuSettings size={35} style={{ backgroundColor: 'var(--background)' }} />
                    <ImExit size={35} style={{ color: 'red' }} />
                </div>
            }

        </nav>
    );
};
