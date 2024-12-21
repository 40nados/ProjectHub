import React from 'react';
import Navbar from '@/components/project/navbar';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export default async function Chat() {
    // const userData = await api('GET', `/user/`);
    // console.log('userData', userData);
    const dataCookies = cookies().get('userId') || { name: '', value: '' };
    console.log('dataCookies', dataCookies);

    return (
        <>
            <Navbar />
            <main role='main' className="pt-10 min-h-screen text-foreground flex justify-around">
                <article id='home_profile' className='min-w-[250px] w-1/4 flex flex-col items-center'>
                    <p>1</p>
                </article>
                <article id='home_projects' className='w-1/2 flex flex-col overflow-auto h-[90vh]'>
                    <p>2</p>
                </article>
                <article id='home_messegen' className=' w-1/4 flex flex-col items-center'>
                    <p>3</p>
                </article>
            </main>
        </>
    );
}
