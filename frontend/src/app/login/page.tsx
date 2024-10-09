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
import animationData from '../../../public/animation/Animation - Login.json';
import Lottie from 'lottie-react';

const login = () => {
    return (
        <main className="bg-background min-h-screen overflow-hidden text-foreground">
            <div className="flex justify-around align-middle text-left mt-16 h-[70vh]">
                <div className="flex flex-col items-center">
                    <Link href="/" className="absolute left-4 top-4">
                        {' '}
                        <FaArrowLeft
                            color="white"
                            size={35}
                            className="transition-transform duration-700 hover:-translate-x-2"
                        />
                    </Link>
                    <h1 className="text-foreground text-[5vw] font-inter font-semibold relative z-1 mt-10">
                        &lt;Project <span className="text-customBlue">Hub/&gt;</span>
                    </h1>
                    <div className="flex flex-col justify-center align-middle items-center">
                        <Lottie
                            animationData={animationData}
                            loop={false}
                            initialSegment={[20, 300]}
                            style={{ width: '50vw', height: '50vh' }}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center w-1/2 justify-center">
                    <h1 className="text-[var(--foreground)] text-[2vw]">Log in your account!</h1>
                    <p className="text-[var(--secondary-foreground)] text-[1vw] mb-10">
                        It's just few minutes and free!
                    </p>
                    <form className="bg-[var(--primary)] w-1/2 flex flex-col items-center px-4 rounded-3xl justify-around">
                        <div className="w-[98%] flex flex-col">
                            <label className="mt-4">Email/Username</label>
                            <input
                                className="bg-[var(--secondary)] rounded-lg p-2 mt-2"
                                placeholder="Email or username"
                            ></input>
                        </div>

                        <div className="w-[98%] flex flex-col">
                            <label className="mt-4">Password</label>
                            <input
                                className="bg-[var(--secondary)] rounded-lg p-2 mt-2"
                                placeholder="Password"
                            ></input>
                        </div>

                        <Button
                            className="bg-[var(--foreground)] text-[var(--background)] hover:scale-110 mt-4 mb-4 text-xl w-1/2"
                            variant="custom"
                        >
                            Login
                        </Button>
                    </form>
                    <p className="text-white mt-4">
                        Don't have any account yet?{' '}
                        <Link href="/register" className="text-indigo-200 underline">
                            Register here.
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default login;
