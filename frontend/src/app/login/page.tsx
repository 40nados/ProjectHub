'use client';
//React and Next
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

//Icons
import { FaArrowLeft } from 'react-icons/fa';

//Shadcn
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components/ui/form';

import { Input } from '@components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import teste from '../../../public/animation/Animation - Login.json';
import Lottie from 'lottie-react';

const login = () => {
    return (
        <main className="bg-[#121212] min-h-screen justify-center flex relative">
            <div className="absolute left-4 top-4">
                <Link href="/">
                    {' '}
                    <FaArrowLeft
                        color="white"
                        size={35}
                        className="transition-transform duration-700 hover:-translate-x-2"
                    />
                </Link>
            </div>
            <div className="flex flex-col w-auto h-80 p-10 border-2 border-white justify-center align-middle items-center rounded-lg">
                <h1 className="text-3xl p-7">Login</h1>

                <Label>Email:</Label>
                <Input type="email" placeholder="Email/Username" className="mb-8"></Input>
                <Label>Password:</Label>
                <Input type="password" placeholder="Password"></Input>
                <Button type="submit">Login</Button>
            </div>
        </main>
    );
};

export default login;
