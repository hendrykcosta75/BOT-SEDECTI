import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

const client = new Client();


import { returnCurso } from './models/cursos.js';
import { getServicos } from './models/servicos.js';


const cursos =  await returnCurso();
const servicos = await getServicos();


client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('QR CODE RECEBIDO, escaneie com seu celular.');
});

client.on('ready', () => {

    /*
    console.log('Cliente está pronto!');

    const numeroDestino = '558296760775'; 
    
    const chatId = numeroDestino + "@c.us";
    
    const mensagem = 'Olá! Esta é uma mensagem de teste enviada via wwebjs.';

    client.sendMessage(chatId, mensagem)
        .then(response => {
            console.log('Mensagem enviada com sucesso para:', numeroDestino);
        })
        .catch(error => {
            console.error('Erro ao enviar a mensagem:', error);
        });

        */
});



client.on('message', msg => {



    let cursos_status = "Cursos e Seus Status:  ";
    let servicos_oferecidos = "Servicos da SEDECTI, status, descricao e link do servico: ";

    cursos.cursos.map(element => {
        
        cursos_status += '['+element.nome+','+element.status+']';

    });

    servicos.forEach(element => {
        servicos_oferecidos += '['+element.titulo+','+element.status+','+element.descricao+','+element.link_externo+']'
    })


    const prompt = `

    Você é um atendente virtual da SEDECTI (Secretaria de Desenvolvimento, Ciência, Tecnologia e Inovação) de São Miguel dos Campos.
Sua função é responder às solicitações dos usuários de forma clara, objetiva e educada, utilizando as informações disponíveis
Você tem acesso a alguns conjuntos de dados da SEDECTI.
Importante:

Se for possível responder com as informações disponíveis, responda normalmente.
Não é necessário se apresentar apenas responda de forma descontraída e educada a solitação do usuário

Se não for possível responder, por o usuário peguntar algo muito específico que você não sabe, apenas lamente ao usuario e peça para ele entrar em contato com a Sedecti pelo instagram (sedecti.smc).
Dados Adicionais: `;

    let solicitacao_usuario = "Solicitacao do usuario: "+msg.body;

    let cursos_ofertados = cursos_status;
    let servicos_ofertados = servicos_oferecidos;

    let prompt_final = prompt + " <====> " + cursos_ofertados + " <====> " + servicos_ofertados + " <====> " + solicitacao_usuario;
    
    const texto = {
        "text": prompt_final
    }

    const data = {
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "***REMOVED***"
        },
        method: "POST",
        body: JSON.stringify(texto)
    }

    fetch("https://api.smcmais.com.br/ai/generate", data)
    .then(response => response.json())
    .then(resposta => {

        msg.reply(resposta.resultado);
    })
    .catch(error => {
        console.log("Ocorreu um erro!")
    })

});

client.initialize();