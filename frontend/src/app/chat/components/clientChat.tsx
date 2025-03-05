"use client"
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import ChatProfile from './ChatProfile';
import ListChats from './ListChat';
import Messages from './Messages';

type clientChatProps = {
    user: any
}

export default function ClientChat({ user }: clientChatProps) {
    const [currentChat, changeChat] = useState(user?.chats[0]);
    const [friend, setFriend] = useState<any>(null);

    const [leftWidth, setLeftWidth] = useState(25); // Largura da seção da esquerda (%)
    const [rightWidth, setRightWidth] = useState(25); // Largura da seção da direita (%)
    const minWidth = 20;
    const middleWidth = 100 - (rightWidth + leftWidth);


    //Redimensionamento dos componentes

    const handleDragLeft = (e: MouseEvent) => {
        const newLeftWidth = (e.clientX / window.innerWidth) * 100;
        if (newLeftWidth > 15 && newLeftWidth < 35) { // Limites de redimensionamento
            setLeftWidth(newLeftWidth);
        }
    };

    const handleDragRight = (e: MouseEvent) => {
        const newRightWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
        if (newRightWidth > 15 && newRightWidth < 55) { // Limites de redimensionamento
            setRightWidth(newRightWidth);
        }
    };

    //Requisição de dados

    useEffect(() => {
        const friendId = currentChat?.users?.filter((_user: any) => _user._id !== user?._id)[0];
        console.log(friendId)

        api('GET', `/user/${friendId._id}`).then((result) => {
            setFriend(result);
        })
    }, [currentChat]);

    return (
        <main role='main' className="pt-10 min-h-screen text-foreground flex">
            <article
                id='home_chats'
                className='flex flex-col items-center rounded-lg'
                style={{ width: `${leftWidth}%`, minWidth: `${minWidth}%` }}
            >
                <ListChats chats={user?.chats} me={user?._id}/>
            </article>
            <div
                className='h-[100vh] bg-[var(--primary)] w-2 cursor-col-resize flex flex-col justify-center'
                onMouseDown={(e) => {
                    e.preventDefault();
                    document.addEventListener('mousemove', handleDragLeft);
                    document.addEventListener('mouseup', () => {
                        document.removeEventListener('mousemove', handleDragLeft);
                    });
                }}
            >
                <p className='text-center'>.</p>
                <p className='text-center'>.</p>
                <p className='text-center'>.</p>
            </div>
            <article
                id='home_messages'
                className='flex flex-col overflow-auto h-[90vh] rounded-lg'
                style={{ width: `${middleWidth}%`, minWidth: `${minWidth + 10}%` }}
            >
                <Messages chat={currentChat} me={user?._id} friend={friend} />
            </article>
            <div
                className='h-[100vh] bg-[var(--primary)] w-2 cursor-col-resize flex flex-col justify-center'
                onMouseDown={(e) => {
                    e.preventDefault();
                    document.addEventListener('mousemove', handleDragRight);
                    document.addEventListener('mouseup', () => {
                        document.removeEventListener('mousemove', handleDragRight);
                    });
                }}
            >
                <p className='text-center'>.</p>
                <p className='text-center'>.</p>
                <p className='text-center'>.</p>
            </div>
            <article
                id='home_profile'
                className='flex flex-col items-center rounded-lg'
                style={{ width: `${rightWidth}%`, minWidth: `${minWidth}%` }}
            >
                <ChatProfile chat={currentChat} friend={friend}/>
            </article>
        </main>
    );
}
