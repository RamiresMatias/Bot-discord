require('dotenv').config()
import { Intents } from 'discord.js'
import {Cliente} from './src/structures/Client'

const client = new Cliente({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

client.login(process.env.BOT_TOKEN)