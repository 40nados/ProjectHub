import React from 'react';
import Navbar from '@/components/project/navbar';
import ProjectCard from './components/projectCard';
import ProfileSection from './components/profileSection';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export default async function Home() {
    // const userData = await api('GET', `/user/`);
    // console.log('userData', userData);
    const dataCookies = cookies().get('userId') || {name: '', value: ''};
    console.log('dataCookies', dataCookies);

    return (
        <>
            <Navbar />
            <main role='main' className="pt-10 min-h-screen overflow-hidden text-foreground flex justify-around">
                <article id='home_profile' className=' w-1/4 flex flex-col items-center'>
                    <ProfileSection userId={dataCookies?.value}/>
                </article>
                <article id='home_projects' className=' w-1/2 flex flex-col items-center'>
                    <p>Projects</p>
                    <ProjectCard/>
                </article>
                <article id='home_messegen' className=' w-1/4 flex flex-col items-center'>
                    Messenger
                </article>
            </main>
        </>
    );
}
