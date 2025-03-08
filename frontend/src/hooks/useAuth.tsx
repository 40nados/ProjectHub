'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import authContext from '../contexts/authContext';

export function useAuth() {
    const { userInfos } = useContext(authContext); // Pega as informações do usuário do contexto
    const router = useRouter();

    // Se não houver um usuário, redireciona para a página de login
    if (!userInfos) {
        console.log('não autenticado');
        router.push('/login');
        return false;
    }

    return true; // Retorna verdadeiro se o usuário estiver autenticado
}
