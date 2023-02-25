require('dotenv').config()
import {Cliente} from './src/structures/Client'

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

client.login(process.env.BOT_TOKEN)