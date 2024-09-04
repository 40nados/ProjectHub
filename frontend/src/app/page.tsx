'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
    const [text, setText] = useState('');
    const textRef = useRef(null);

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
            <div className="flex flex-col justify-middle align-middle text-left mt-20">
                <h1 className="text-white text-9xl font-inter font-semibold">
                    Project <span className="text-customBlue">Hub</span>
                </h1>
                <p className="text-white text-3xl">A project for projects</p>
            </div>
            <div className="font-courier-prime text-white mt-32 typing-container">
                <p
                    className="typing-text italic leading-7"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></p>
                <span className="caret"></span>
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
