"use client"
import React, { useEffect, useState } from 'react';
import { LuMessagesSquare } from 'react-icons/lu';

type listChatsProps = {
    chats: any[],
    me: string
}

export default function ListChats({ chats, me }: listChatsProps) {

    const listOfChats = chats?.map((chat: any, index: number) => {
        let user = chat.users.filter((user: any) => user._id != me);
        console.log('user', user);

        return (
            <div key={index} className='mt-2 border-[var(-primary)] border-b-[1px] w-10/12 hover:bg-[var(--secondary)] rounded cursor-pointer'>
                <div className='flex'>
                    <div className='ml-3 h-10 w-10 rounded-full bg-[var(--foreground)] flex flex-col justify-center items-center overflow-hidden'>
                        {user[0]?.user_photo
                            ? <img src={user[0]?.user_photo} alt='user photo' />
                            : <p className='text-[var(--background)] text-sm'>PHOTO</p>
                        }
                    </div>
                    <div className='ml-2'>
                     <p>{chat.name == 'Private' ? user[0].username : chat.name}</p>
                     <p className='text-[var(--chart-1)] text-[8px]'>author: last message</p>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <section className='ml-3 mt-3 min-w-[200px] w-full text-[15px] text-white h-full'>
            <div className='mt-2 inline-block transition rounded-lg bg-[var(--secondary)] cursor-pointer hover:delay-100 hover:scale-105'>
                <div className='flex p-1'>
                    <LuMessagesSquare size={25} />
                    <p>Começar Novo Chat</p>
                </div>
            </div>
            <p className='mt-2 text-[var(--primary-foreground)]'>Últimas Conversas</p>
            {listOfChats}
        </section>
    );
}