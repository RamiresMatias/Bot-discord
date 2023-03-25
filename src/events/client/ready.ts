import { Cliente } from "src/structures/Client"

import {Event} from '../../structures/Event'

export default class extends Event {
    constructor(client: Cliente) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        console.log(`Bot ${this.getNameBot()} logado! - Servidores: ${this.countServersBotInstalled()}`)
        await this.client.registerCommands()
    }

    getNameBot(){
        return this.client?.user?.username
    }

    countServersBotInstalled() {
        return this.client.guilds.cache.size
    }
}