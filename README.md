## Descrição

- Bot criado com typescript, seguindo a documentação do link abaixo:

> https://discordjs.guide/interactions/replying-to-slash-commands.html#receiving-interactions

> https://discord-player.js.org/

- É um projeto básico para aprendizado de criação de bots com typescript

## Bibliotecas utilizadas

- Discord.js
- Dontenv
- Discord Player
- ffmpeg-static
- ytdl-core

#### Dependências utilizadas pelo Discord Player 

- @discord/voice
- @discord/opus
- @discord/builders
- @discord/rest

## Observações

- O bot só tem os seguintes comandos 
  - /play - Toca uma música
  - /pause - Pausa a música
  - /resume - Despausa a música
  - /playlist - Exibe a fila de músicas
  - /skip - Força o bot a sair do canal de voz
  - /next - Força o bot a tocar a próxima música
  - /ping - Exibe o ping do bot

- O bot está sendo criado em um discord pessoal.

## Start

- Para startar o bot localmente utilize o comando

```bash
npm run dev
```

- Criar um arquivo DOTENV contendo as seguintes propriedades. Suas informações estarão no portal do discord developer

```.env
BOT_TOKEN=<TOKEN>
SERVER_ID=<SERVER_ID>
CLIENT_SECRET=<CLIENT_SECRET>
```