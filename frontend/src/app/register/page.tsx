'use client';

import React from 'react';
import Link from 'next/link';
import Lottie from 'lottie-react';
import { Button } from '@/components/ui/button';

//Icons and Animations
import { FaArrowLeft } from 'react-icons/fa';
import animationData from '../../../public/animation/Animation - Register.json';

function handleSubmit(event: any) {

    event.preventDefault();
    const formData = new FormData(event.target);

    const body = {
        username: formData.get('username'),
        password: formData.get('password'),
        email: formData.get('email'),
        lenguage: formData.get('lenguage')
    };

    console.log('body', body);
}


const register = () => {
    return (
        <main className="bg-background min-h-screen overflow-hidden text-foreground">
            <article className="flex justify-around align-middle text-left mt-16 h-[80vh]">
                <header className="flex flex-col items-center">
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
                            loop={true}
                            style={{ width: '50vw', height: '50vh' }}
                        />
                    </div>
                </header>
                <section className="flex flex-col items-center w-1/2 justify-center">
                    <h1 className="text-[var(--foreground)] text-[2vw]">Create your Accont</h1>
                    <p className="text-[var(--secondary-foreground)] text-[1vw]">
                        It's just few minutes and free!
                    </p>
                    <form className="bg-[var(--primary)] w-1/2 flex flex-col items-center px-4 rounded-3xl justify-around"
                        onSubmit={handleSubmit}>
                        <div className="w-[98%] flex flex-col">
                            <label className="mt-4" htmlFor='username'>Username</label>
                            <input
                                id='username'
                                name='username'
                                className="bg-[var(--secondary)] rounded-lg p-2 mt-2"
                                placeholder="Set your username"
                                required aria-required={true}
                            ></input>
                        </div>

                        <div className="w-[98%] flex flex-col">
                            <label className="mt-4" htmlFor='email'>Email</label>
                            <input
                            id='email'
                                name='email'
                                className="bg-[var(--secondary)] rounded-lg p-2 mt-2"
                                placeholder="Set your main email"
                                required aria-required={true}
                            ></input>
                        </div>

                        <div className="w-[98%] flex flex-col">
                            <label className="mt-4" htmlFor='password'>Password</label>
                            <input
                                id='password'
                                name='password'
                                className="bg-[var(--secondary)] rounded-lg p-2 mt-2"
                                placeholder="Password"
                                required aria-required={true}
                            ></input>
                        </div>

                        <div className="w-[98%] flex flex-col">
                            <label className="mt-4" htmlFor='lenguage'>Language (Temporary Disabled)</label>
                            <input
                                id='lenguage'
                                name='lenguage'
                                className="bg-[var(--secondary)] rounded-lg p-2 mt-2"
<<<<<<< HEAD
                                placeholder="Set your native lenguage"
                                required aria-required={true}
                                disabled={true}
=======
                                placeholder="Set your native language"
>>>>>>> f080251de4e85029a657f1e8ed2076197079137b
                            ></input>
                        </div>

                        <Button
                            type="submit"
                            className="bg-[var(--foreground)] text-[var(--background)] hover:scale-110 mt-4 mb-4 text-xl w-1/2"
                            variant="custom"
                        >
                            Register
                        </Button>
                    </form>
                    <p className="text-white mt-4">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-200 underline">
                            Login here.
                        </Link>
                    </p>
                </section>
            </article>
        </main>
    );
};

export default register;
