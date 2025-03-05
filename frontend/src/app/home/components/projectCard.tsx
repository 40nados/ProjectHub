'use client';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import Image from 'next/image';

type projectCardProps = {
    publication: any;
};

export default function ProjectCard({ publication }: projectCardProps) {
    return (
        <div className="mt-3 ml-[10%] w-[80%]">
            <div className="flex w-full items-center">
                <div
                    id="circlePhoto"
                    className="ml-5 h-10 w-10 rounded-full bg-[var(--foreground)] flex flex-col
                justify-center items-center overflow-hidden min-w-10"
                >
                    <img src={publication.url} alt="publication photo" />
                </div>
                <div className="flex flex-col ml-2">
                    <p className="text-[var(--foreground)] overflow-hidden h-6">
                        {publication.username || ''}
                    </p>
                    <p className="text-[var(--secondary-foreground)] overflow-hidden h-6">
                        {publication.title || ''}
                    </p>
                </div>
            </div>
            <div className="flex flex-col ml-16 w-[70%] items-center">
                <img src={publication.url} alt="publication photo" />
                <div className="flex justify-between items-center text-[var(--secondary-foreground)] w-full text-sm">
                    <div className="flex justify-around overflow-hidden w-[20%] h-6">
                        <FaHeart size={20} color="red" />
                        <FaComment size={20} color="var(--secondary-foreground)" />
                        <p>{publication.comments.length}</p>
                    </div>
                    <div className="overflow-hidden w-[60%] h-6 text-center">
                        {publication.description}
                    </div>
                    <div className="overflow-hidden w-[20%] h-6 text-end">
                        {publication.likes.length + ' ' + 'Likes'}
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center mt-4">
                <div
                    id="circlePhoto"
                    className="ml-5 h-10 w-10 rounded-full bg-[var(--foreground)] flex flex-col
                justify-center items-center overflow-hidden min-w-10"
                >
                    <img src={publication.url} alt="publication photo" />
                </div>
                <div className="flex flex-col ml-3 w-10/12">
                    <input
                        className="border-b-2 w-[80%] bg-transparent border-b-[var(--secondary)] focus:outline-none"
                        placeholder="Faça um comentário"
                    />
                </div>
            </div>
            <div className="mt-2 border-b-2 border-b-[var(--foreground)] h-2 bg-transparent w-full"></div>
        </div>
    );
}
