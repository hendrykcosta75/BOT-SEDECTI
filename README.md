# Bot SEDECTI 🤖

Bot de atendimento WhatsApp da **SEDECTI** (Secretaria de Desenvolvimento, Ciência, Tecnologia e Inovação) de São Miguel dos Campos/AL.

O bot responde mensagens dos cidadãos com informações de **cursos** e **serviços** da secretaria, usando IA generativa sobre os dados da API [smcmais](https://api.smcmais.com.br).

## Como funciona

1. Alguém envia uma mensagem no WhatsApp conectado.
2. O bot busca cursos e serviços atualizados na API do smcmais.
3. Monta um prompt com esses dados + a pergunta do usuário.
4. Envia ao endpoint de IA (`/ai/generate`) e responde com o resultado.

## Requisitos

- Node.js **20.6+** (usa `fetch` nativo e `--env-file`)
- Uma chave de API do smcmais (`SMCMAIS_API_KEY`)
- Um celular com WhatsApp para parear via QR Code

## Instalação

```bash
npm install
cp .env.example .env
# edite o .env e cole sua chave
```

## Execução

```bash
npm start
```

Na primeira execução, escaneie o QR Code exibido no terminal com o WhatsApp
(**Aparelhos conectados → Conectar aparelho**). A sessão fica salva em
`.wwebjs_auth/` para as próximas execuções.

> Node mais antigo que 20.6? Exporte a variável manualmente:
> `SMCMAIS_API_KEY=sua_chave node index.js`

## Estrutura

```
├── index.js            # bot: eventos do WhatsApp e montagem do prompt
├── config.js           # configuração e validação da SMCMAIS_API_KEY
├── services/
│   └── api.js          # fetch central da API smcmais (injeta X-Api-Key)
├── models/
│   ├── cursos.js       # lista de cursos
│   └── servicos.js     # lista de serviços
├── .env.example        # variáveis necessárias (sem valores reais)
└── package.json
```

## Segurança

- A chave da API **nunca** fica no código — apenas na variável de ambiente
  `SMCMAIS_API_KEY` (arquivo `.env`, ignorado pelo git).
- Se uma chave vazar, revogue/rotacione no servidor da API.
