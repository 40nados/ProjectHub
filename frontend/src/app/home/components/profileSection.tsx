"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type profileSectionProps = {
    user: any
}

export default function ProfileSection({ user }: profileSectionProps) {

    return (
        <section className='mt-3 min-w-[200px] w-full'>
            <div className='flex w-full items-center'>
                <div id='circlePhoto' className='ml-3 h-20 w-20 rounded-full bg-[var(--foreground)] flex flex-col justify-center items-center overflow-hidden'>
                    {user?.user_photo 
                        ? <Image src={user.user_photo} alt='user photo'/>
                        : <p className='text-[var(--background)] text-sm'>PHOTO</p>
                    }
                </div>
                <div className='flex flex-col ml-10'>
                    <p className='text-[var(--foreground)]'>{user?.username || ''}</p>
                    <p className='text-[var(--secondary-foreground)]'>{user?.description || ''}</p>
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <button className='bg-customBlue text-black w-1/3 h-8 hover:bg-[var(--foreground)] hover:text-[var(--background)]'>New Post</button>
            </div>
        </section>
    );
}