require('dotenv').config()
const Cliente = require('./src/structures/Client')

const client = new Cliente({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES',
        'DIRECT_MESSAGE_REACTIONS'
    ]
})


client.login(process.env.BOT_TOKEN)