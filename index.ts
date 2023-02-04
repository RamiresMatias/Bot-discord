require('dotenv').config()
import { Player } from 'discord-player'
import { GatewayIntentBits } from 'discord.js'
import {Cliente} from './src/structures/Client'

const client = new Cliente({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
    ]
})

client.login(process.env.BOT_TOKEN)