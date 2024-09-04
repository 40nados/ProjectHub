'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/animation/Apresentation.json'; // Ajuste o caminho conforme necessário

export default function Home() {
    const [text, setText] = useState('');

    const fullText =
        'This website is a project co-work feito com next estilo rede social que pretende trabalho estudso react tecnologia wesley e pablo. E é por isso que. Crie agora mesmo sua conta e explore, divulgue projetos, entre cm ontato conosco e etc';

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index + 1));
            index += 1;
            if (index >= fullText.length) {
                clearInterval(interval);
            }
        }, 50); // Velocidade
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <main
            className="flex min-h-screen flex-col p-10 bg-[#121212]"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(31,11,205,0.2) 50%, rgba(36,91,233,0.35) 100%)',
            }}
        >
            <div className="flex justify-middle align-middle text-left mt-16">
                <div className="flex flex-col">
                    <h1 className="text-white text-9xl font-inter font-semibold">
                        &lt;Project <span className="text-customBlue">Hub/&gt;</span>
                    </h1>
                    <p className="text-white text-3xl">A project for projects</p>
                    <div className="font-courier-prime text-white typing-container flex justify-between mt-40">
                        <p className="typing-text italic leading-7">{text}</p>
                        <span className="caret"></span>
                    </div>
                </div>
                <div className="flex flex-col justify-center align-middle items-center ml-40">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        style={{ width: 400, height: 400 }}
                    />
                    <Button>TESTE</Button>
                    <button className="bg-[#10ff07] hover:bg-[#ff5a5a] text-white p-8 w-100">
                        Teste
                    </button>
                    <p className="text-white mt-4">Don't have any account yet? Register here.</p>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 flex align-middle justify-center items-center">
                <a
                    href="#todo"
                    className="text-white hover:text-customBlue hover:scale-110 transition-all duration-700"
                >
                    <FaGithub size={40} />
                </a>
                <p className=" text-white text-base ml-2 credits">
                    Made by:{' '}
                    <a
                        className="text-customBlue hover:text-blue-800 transition-colors duration-300 p-2"
                        href="#todo"
                    >
                        Wesley Santos
                    </a>{' '}
                    &{' '}
                    <a
                        className="text-customBlue hover:text-blue-800 transition-colors duration-300 p-2"
                        href="#todo"
                    >
                        Pablo Delgado
                    </a>
                </p>
            </div>
        </main>
    );
}
