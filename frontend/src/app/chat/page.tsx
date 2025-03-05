import React from 'react';
import Navbar from '@/components/project/navbar';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import ClientChat from './components/clientChat';

export default async function Chat() {
    const userInfos = cookies().get('userId') || { name: '', value: '' };
    const userId = userInfos.value;
    console.log('userInfos', userInfos);

    const user = await api("GET", `/user/${userId}`);

    return (
        <>
            <Navbar />
            <ClientChat user={user}/>
        </>
    );
}
