import { Player, Queue } from "discord-player"
import { SlashCommandBuilder, VoiceState } from "discord.js"
import { ClientOptions, Client } from "discord.js"

const {readdirSync} = require('fs')
const {join} = require('path')

export class Cliente extends Client {
    public commands: SlashCommandBuilder[] = []
    public player: Player = new Player(this)

    constructor(guilds: ClientOptions) {
        super(guilds)

        this.commands = []
        this.loadCommands('src/commands')
        this.loadEventsClient('src/events/client')
        this.loadEventsPlayer('src/events/player')
    }

    // Método que registra os comandos criados em todos os servidores
    // em que o bot foi criado
    async registerCommands() {
        try {
            await this.guilds.cache.get(process.env.SERVER_ID as string)?.commands.set([...this.commands])
        } catch (error) {
            console.log(error);
        }
    }

    // Método para carregar todos comandos
    loadCommands(path: string) {
        const commands = readdirSync(path)
        for(const command of commands) {
            const commandClass = require(join(process.cwd(), `${path}/${command}`))
            const cmd = new (commandClass.default)(this)
            this.commands.push(cmd)
        }
    }


    // Método para carregar todos eventos
    loadEventsClient(path: string) {
        const events = readdirSync(path)
        for(const event of events) {
            const eventClass = require(join(process.cwd(), `${path}/${event}`))
            const evt = new (eventClass.default)(this)
            this.on(evt.name, evt.run)
        }
    }

    loadEventsPlayer(path: string) {
        const events = readdirSync(path)
        for(const event of events) {
            const eventClass = require(join(process.cwd(), `${path}/${event}`))
            const evt = new (eventClass.default)(this)
            this.player.on(evt.name, evt.run)
        }
    }
}