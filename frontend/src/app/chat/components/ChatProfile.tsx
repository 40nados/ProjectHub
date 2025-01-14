"use client"
import React, { useEffect, useState } from 'react';

type ChatProfileProps = {
    chat: any,
    friend: any
}

export default function ChatProfile({ chat, friend }: ChatProfileProps) {

    const photos = [
        friend?.user_photo,
    ];

    return (
        <section className='mt-3 min-w-[200px] w-full flex flex-col items-center text-[var(--primary-foreground)] text-[12px]'>
            <div id='circlePhoto' className='ml-3 h-20 w-20 rounded-full bg-[var(--foreground)] flex flex-col justify-center items-center overflow-hidden'>
                {friend?.user_photo
                    ? <img src={friend?.user_photo} alt='user photo' />
                    : <p className='text-[var(--background)] text-sm'>PHOTO</p>
                }
            </div>
            <div id='name' className='mt-1'>
                <p>{friend?.email}</p>
            </div>
            <div id='description' className='w-11/12 mt-2'>
                <p className='text-left'>{friend?.description}</p>
            </div>
            <div className='mt-2 h-[2px] w-11/12 bg-[var(--primary)] rounded'>
            </div>

            {/* -------------------------------------------------------------- */}
            <div id='description' className='w-11/12 mt-2 flex justify-between'>
                <p>Mídias Compartilhadas</p>
                <p className='underline text-[var(--chart-1)]'>Mostrar tudo {'>'}</p>
            </div>

            <div className='flex flex-wrap overflow-y-scroll w-full h-[60vh]'>

                {
                    photos.map((photo, index) => {
                        return (
                            <div key={index} className='mt-2 ml-2 flex flex-col justify-start overflow-hidden'>
                                {friend?.user_photo
                                    ? <img width="150" height="150" src={photo} alt='user photo' />
                                    : <p className='text-[var(--background)] text-sm'>PHOTO</p>
                                }
                            </div>
                        )
                    })
                }


            </div>
        </section>
    );
}