'use client';
//React & Next
import React from 'react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

//Components
import { Button } from '@/components/ui/button';

//Customs - Icons/Animations
import { FaGithub } from 'react-icons/fa';
import { FaArrowCircleRight } from 'react-icons/fa';
import animationData from '../../public/animation/Apresentation.json';
import Lottie from 'lottie-react';

export default function Home() {
  const [text, setText] = useState('');

  const fullText =
    '<Project HUB basically brings together individual and collaborative projects in one place. It offers the possibility to post projects, create your own account, comment, share and even chat with other people via integrated chat for direct contact. The principle of this project was to improve and learn new things, seeking to be a good FullStack developer./>';

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
      className="flex min-h-screen flex-col bg-[#121212] relative z-1 overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(31,11,205,0.2) 50%, rgba(36,91,233,0.35) 100%)',
      }}
    >
      <div className="risco risco-1"> </div>
      <div className="risco risco-2"> </div>
      <div className="risco risco-3"> </div>
      <div className="risco risco-4"> </div>
      <div className="risco risco-5"> </div>
      <div className="risco risco-6"> </div>
      <div className="risco risco-7"> </div>
      <div className="flex text-left mt-5 ml-4">
        <div className="flex flex-col justify-around">
          <h1 className="text-white text-7xl font-inter font-semibold relative z-1">
            &lt;Project <span className="text-customBlue">Hub/&gt;</span>
          </h1>
          <p className="text-white text-3xl">A project for projects</p>
          <div className="font-courier-prime text-white typing-container flex justify-between mt-20">
            <p className="typing-text leading-7 text-lg max-w-[700px]">{text}</p>
            <span className="caret"></span>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/40nados/ProjectHub"
              target="_blanck"
              className="text-white hover:text-customBlue hover:scale-110 transition-all duration-700"
            >
              <FaGithub size={40} />
            </a>
            <p className=" text-white text-base ml-2 credits">
              Made by:{' '}
              <a
                className="text-customBlue hover:text-blue-800 transition-colors duration-300 p-2"
                href="https://github.com/TitanCodeXD"
                target="_blanck"
              >
                Wesley Santos
              </a>{' '}
              &{' '}
              <a
                className="text-customBlue hover:text-blue-800 transition-colors duration-300 p-2"
                href="https://github.com/BourbonJones"
                target="_blanck"
              >
                Pablo Delgado
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ml-20">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: 450, height: 450 }}
          />
          <Link href="/login">
            <Button
              className="bg-white p-10 w-64 hover:scale-110 transition-all duration-700 justify-evenly text-xl group"
              variant="secondary"
            >
              Access{' '}
              <FaArrowCircleRight
                size={35}
                className="transition-transform duration-700 group-hover:translate-x-3"
              />
            </Button>
          </Link>
          <p className="text-white mt-4">
            Don't have any account yet?{' '}
            <Link href="/register" className="text-customBlue underline">
              Register here.
            </Link>
          </p>
        </div>
      </div>


    </main>
  );
}
