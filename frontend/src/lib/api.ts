interface IConfig{
    method: string,
    headers: any,
    body?: any
}


export async function api(method: string, url: string, body?: any) {
    const base_url = "http://localhost:8081";
    const link = base_url + url;
    let resposta = null;

    const user = localStorage.getItem('user');
    const objUser = user ? JSON.parse(user) : null;
    const token = objUser ? objUser.access_token : null;
    const userId = objUser ? objUser.userId : null;

    try {
        let config: IConfig = {
            method: method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'x-user-id':  userId},
        }

        if(method != 'GET'){
            config.body = body ? JSON.stringify(body) : JSON.stringify({})
        }

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