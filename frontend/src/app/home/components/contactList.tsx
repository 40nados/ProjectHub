"use client"
import React, { useEffect, useState } from 'react';

type profileSectionProps = {
    user: any
}

export default function ContactList({ user }: profileSectionProps) {

    return (
        <section className='mt-3 min-w-[200px] w-full'>
            <div className='flex w-full items-center text-[var(--foreground)]'>
                Quantidade: {user?.chats?.length}
            </div>
        </section>
    );
}