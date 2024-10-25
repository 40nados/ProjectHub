'use server'
import { cookies } from "next/headers";

interface IConfig{
    method: string,
    headers: any,
    body?: any
}


export async function api(method: string, url: string, body?: any) {
    const base_url = "http://localhost:8081";
    const link = base_url + url;
    let resposta = null;

    const token = cookies().get('accessToken') || {name: '', value: ''}
    try {
        let config: IConfig = {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token.value}`},
        }

        if(method != 'GET'){
            config.body = body ? JSON.stringify(body) : JSON.stringify({})
        }

        console.log(link);
        console.log(config);
        resposta = await fetch(link, config)

        if (resposta.ok) {
            return await resposta.json();
        } else {
            if(resposta.status == 404){
                throw new Error("Não Autorizado");
            }
            throw new Error("Erro na chamada da API");
        }

    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}

export async function authPostRequest(url: string, body: any){
    const base_url = "http://localhost:8081";
    const link = base_url + url;

    try {
        let config: IConfig = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
        }

        const resposta = await fetch(link, config)

        if (resposta.ok) {
            return await resposta.json();
        } else {
            if(resposta.status == 404){
                throw new Error("Não Autorizado");
            }
            throw new Error("Erro na chamada da API");
        }

    } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
    }
}