"use client"
import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { HiDotsVertical } from "react-icons/hi";
import { LuSend, LuMic } from "react-icons/lu";
import { IoImageOutline } from "react-icons/io5";
import { io } from "socket.io-client";

type messagesProps = {
    chat: any,
    me: string,
    friend: any
}

// const socket = io("http://localhost:8081", {
//     auth: {
//         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiUGFibG8iLCJpYXQiOjE3MzYzNDM2OTksImV4cCI6MTczNjM0NzI5OX0.swRhTJVC9Nh2iLwyOzjXwSL5cRxBhVeY37OPwnP7N7U'
//     }
// });

export default function Messages({ chat, me, friend }: messagesProps) {
    const [messages, setMessages] = useState<any>(null);

    useEffect(() => {
        // const socket = io('http://localhost:8081');

        // socket.on('connect', () => {
        //     console.log('Conectado ao servidor WebSocket:', socket.id);
        // });

        // return () => {
        //     setTimeout(() => {
        //         socket.disconnect();
        //         console.log("Desconectado do servidor WebSocket:", socket.id);
        //     }, 1000); // Desconecta após 1 segundo, se necessário
        // };

    }, []);

    useEffect(() => {
        api('GET', `/message/${chat?._id}?limit=10&page=1`).then((result) => {
            console.log('result', result)
            setMessages(result.reverse());
        })
    }, [chat, me]);

    const showMessages = messages?.map((message: any, index: number) => {
        let bg, align, margin;
        if (message.sender._id == me) {
            bg = 'bg-[--chart-1]';
            align = 'justify-end';
            margin = '';

        } else {
            bg = 'bg-[--secondary]';
            align = 'justify-start';
            margin = 'ml-2';
        }
        const dateContent = new Date(message.createdAt);
        return (
            <div key={index} className={`mt-2 w-full flex ${align}`}>
                <div className='flex'>
                    {message.sender._id != me &&
                        <div className='ml-3 h-10 w-10 rounded-full bg-[var(--foreground)] flex flex-col justify-center items-center overflow-hidden'>
                            {friend?.user_photo
                                ? <img src={friend?.user_photo} alt='user photo' />
                                : <p className='text-[var(--background)] text-sm'>PHOTO</p>
                            }
                        </div>
                    }

                    <div className={`flex flex-col ${margin}`} title={message.sender.email}>
                        {message.sender._id != me && <p className='text-xs'>{message.sender.username}</p>}
                        <div className={`${bg} rounded-md p-1`}>
                            <p className='text-xs'>{message.content}</p>
                            <p className='text-[8px] text-[var(--secondary-foreground)]'>{`${dateContent.toUTCString()}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <section className='mt-3 min-w-[200px] w-full h-[100vh] overflow-hidden flex flex-col'>
            <header id='chat_header' className='flex justify-around items-center border-b-[var(--foreground)] border-b-2 p-1'>
                <div className='flex'>
                    <div id='circlePhoto' className='ml-3 h-12 w-12 rounded-full bg-[var(--foreground)] flex flex-col justify-center items-center overflow-hidden'>
                        {friend?.user_photo
                            ? <img src={friend?.user_photo} alt='user photo' />
                            : <p className='text-[var(--background)] text-sm'>PHOTO</p>
                        }
                    </div>
                    <div className='ml-2 flex flex-col'>
                        <p className='text-[var(--foreground)]'>{friend?.username}</p>
                        <p className='text-[var(--primary-foreground)] text-[12px]'>{friend?.email}</p>
                    </div>
                </div>
                <div>
                    <HiDotsVertical/>
                </div>
            </header>
            <div className='w-full mt-3 p-3 overflow-y-auto flex-1'>
                {showMessages}
            </div>
            <footer className='w-full flex justify-center text-[16px] p-3'>
                <div id='input-message' className='h-8 w-full border-white border-[1px] rounded-sm flex justify-around items-center'>
                    <LuSend size={20} />
                    <input placeholder='Escreva sua mensagem' className='w-3/4 focus:outline-none' />
                    <LuMic size={20} />
                    <IoImageOutline size={20} />
                </div>
            </footer>
        </section>
    );
}