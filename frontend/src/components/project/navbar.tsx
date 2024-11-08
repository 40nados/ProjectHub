'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    
    return (
        <nav role='contentInfo' className='fixed w-full flex items-center bg-[var(--background)] border-b-[var(--foreground)] border-b-2 h-10'>
            <div className='w-1/3 flex'>
                <Link href="/" className="bg-white w-1/3 h-8">
                    <p className='flex items-center justify-center text-[var(--primary)]'>PH</p>
                </Link>
            </div>

            {
                pathname == '/home' ?

                    <div id='search_bar' className='w-1/2 flex justify-center'>
                        SEARCH BAR
                    </div>

                    :

                    <div id='search_bar' className='w-1/2 flex justify-center bg-green-400'>
                    </div>

            }

            <div className='w-1/3 flex justify-end'>
                icons
            </div>
        </nav>
    );
};
