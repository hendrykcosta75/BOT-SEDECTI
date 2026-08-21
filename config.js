const API_KEY = process.env.SMCMAIS_API_KEY;

if (!API_KEY) {
    console.error('Erro: variável de ambiente SMCMAIS_API_KEY não definida.');
    console.error('Crie um arquivo .env (veja .env.example) ou exporte a variável antes de iniciar.');
    process.exit(1);
}

export const API_BASE_URL = 'https://api.smcmais.com.br';

export function apiHeaders() {
    return {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
    };
}
