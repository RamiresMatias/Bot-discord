require('dotenv').config()
import { VoiceConnectionStatus } from '@discordjs/voice';
import {Cliente} from './src/structures/Client'
import { Queue } from 'discord-player';

const client = new Cliente({
    intents: [
        'Guilds',
        'GuildMessages',
        'GuildVoiceStates',
        'GuildVoiceStates',
        'GuildMessageTyping',
        'GuildMessageReactions',
        'GuildIntegrations'
    ]
})


// Gambiarra para driblar bug no @discord/voice, onde a música parava em 60 segundos
// https://github.com/discordjs/discord.js/issues/9185#issuecomment-1452510633
client.player.on('connectionCreate', (queue: Queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState: any, newState: any) => {
        if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
            queue.connection.voiceConnection.configureNetworking();
        }
    })
});

client.login(process.env.BOT_TOKEN)