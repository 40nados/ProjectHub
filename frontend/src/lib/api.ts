'use server';
import { cookies } from "next/headers";

interface IConfig {
    method: string;
    headers: any;
    body?: any;
    cache?: 'no-store' | 'force-cache';
}

const BASE_URL = "http://localhost:8081";


export async function api(method: string, url: string, body?: any) {
    console.log('[API LOG]: ', {
        method: method,
        url: url,
        body: body
    });
    
    const link = `${BASE_URL}${url}`;
    const token = cookies().get('accessToken') || { name: '', value: '' };

    try {
        const config: IConfig = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
                'Cache-Control': 'no-cache',
            },
            cache: 'no-store', // Evita cache de todas as requisições
        };

        if (method !== 'GET') {
            config.body = body ? JSON.stringify(body) : JSON.stringify({});
        }

        const resposta = await fetch(link, config);

        if (resposta.ok) {
            return await resposta.json();
        } else {
            const errorMessage = `Erro: ${resposta.status} - ${resposta.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        throw erro;
    }
}

export async function authPostRequest(url: string, body: any) {
    const link = `${BASE_URL}${url}`;
    const token = cookies().get('accessToken') || { name: '', value: '' };

    try {
        const config: IConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`,
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(body),
            cache: 'no-store', // Evita cache de todas as requisições
        };

        const resposta = await fetch(link, config);

        if (resposta.ok) {
            return await resposta.json();
        } else {
            const errorMessage = `Erro: ${resposta.status} - ${resposta.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
        throw erro;
    }
}
