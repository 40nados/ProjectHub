'use client';

import { useRouter } from 'next/navigation';
import { deleteCookies } from '../lib/setCookie';

export function useLogout() {
    const router = useRouter();

    const logout = () => {
        console.log('Deslogando...');

        // Remover cookies do cliente
        deleteCookies();

        // Redirecionar para a página de login
        router.push('/login');
    };

    return logout;
}
