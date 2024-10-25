"use client"
import { api } from '@/lib/api';
import React, { useEffect } from 'react';

type profileSectionProps = {
    userId: string
}

export default function ProfileSection({userId} : profileSectionProps) {

    useEffect(() => {
        const fetchData = async () => {
            console.log('userId', userId);
            const userData = await api('GET', `/user/${userId}`);
            console.log('userData', userData);
        }

        fetchData();
    })

    return (
        <section>
            Profile Section
        </section>
    );
}