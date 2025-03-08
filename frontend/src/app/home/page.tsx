import React from 'react';
import Navbar from '@/components/project/navbar';
import ProjectCard from './components/projectCard';
import ProfileSection from './components/profileSection';
import ContactList from './components/contactList';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    // const userData = await api('GET', `/user/`);
    // console.log('userData', userData);
    const dataCookies = cookies().get('userId') || { name: '', value: '' };
    const userId = dataCookies?.value;

    if (!userId) {
        redirect('/login'); // Redireciona para a página de login
    }

    const user = userId ? await api('GET', `/user/${userId}`) : null;
    const publications = (await api('GET', `/publication/`)) || [];

    return (
        <>
            <Navbar />
            <main role="main" className="pt-10 min-h-screen text-foreground flex justify-around">
                <article
                    id="home_profile"
                    className="min-w-[250px] w-1/4 flex flex-col items-center"
                >
                    <ProfileSection user={user} />
                </article>
                <article id="home_projects" className="w-1/2 flex flex-col overflow-auto h-[90vh]">
                    {publications?.map((publication: any) => (
                        <div key={publication.id}>
                            <ProjectCard publication={publication} />{' '}
                        </div>
                    ))}
                </article>
                <article id="home_messegen" className=" w-1/4 flex flex-col items-center">
                    <ContactList user={user} />
                </article>
            </main>
        </>
    );
}
