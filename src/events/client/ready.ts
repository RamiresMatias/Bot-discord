import { ClientEvents } from "discord.js"

const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client: ClientEvents) {
        super(client, {
            name: 'ready'
        })
    }

    run = () => {
        console.log(`Bot ${this.getNameBot()} logado! - Servidores: ${this.countServersBotInstalled()}`)
        this.client.registerCommands()
    }

    getNameBot(){
        return this.client.user.username
    }

    countServersBotInstalled() {
        return this.client.guilds.cache.size
    }
}