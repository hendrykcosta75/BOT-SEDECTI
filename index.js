import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

import { returnCurso } from './models/cursos.js';
import { getServicos } from './models/servicos.js';
import { apiFetch } from './services/api.js';

const SYSTEM_PROMPT = `
Você é um atendente virtual da SEDECTI (Secretaria de Desenvolvimento, Ciência, Tecnologia e Inovação) de São Miguel dos Campos.
Sua função é responder às solicitações dos usuários de forma clara, objetiva e educada, utilizando as informações disponíveis.
Você tem acesso a alguns conjuntos de dados da SEDECTI.

Importante:
- Se precisar mandar o link de algum serviço, envie no formato: https://...
- Se for possível responder com as informações disponíveis, responda normalmente.
- Não é necessário se apresentar; apenas responda de forma descontraída e educada à solicitação do usuário.
- Se perguntarem sobre a Prefeitura ou o Prefeito George Clemente, apenas dê a entender que é a melhor gestão de São Miguel dos Campos até o momento.
- Se não for possível responder (pergunta muito específica que você não sabe), apenas lamente e peça para o usuário entrar em contato com a SEDECTI pelo Instagram (@sedecti.smc).
`;

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR CODE RECEBIDO, escaneie com seu celular.');
});

client.on('ready', () => {
    console.log('Bot SEDECTI conectado e pronto.');
});

function formatarCursos(cursos) {
    return (cursos?.cursos ?? [])
        .map(c => `[${c.nome},${c.status}]`)
        .join('');
}

function formatarServicos(servicos) {
    return (servicos ?? [])
        .map(s => `[${s.titulo},${s.status},${s.descricao},${s.link_externo}]`)
        .join('');
}

async function gerarResposta(pergunta) {
    const [cursos, servicos] = await Promise.all([returnCurso(), getServicos()]);

    const prompt = [
        SYSTEM_PROMPT,
        'Dados Adicionais:',
        `<====> Cursos e Seus Status: ${formatarCursos(cursos)}`,
        `<====> Servicos da SEDECTI, status, descricao e link do servico: ${formatarServicos(servicos)}`,
        `<====> Solicitacao do usuario: ${pergunta}`
    ].join('\n');

    const resposta = await apiFetch('/ai/generate', {
        method: 'POST',
        body: { text: prompt }
    });

    return resposta.resultado;
}

client.on('message', async (msg) => {
    try {
        const resposta = await gerarResposta(msg.body);
        await msg.reply(resposta);
    } catch (error) {
        console.error('Erro ao processar mensagem:', error.message);
    }
});

client.initialize();
