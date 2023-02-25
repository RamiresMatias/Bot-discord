import { Player } from "discord-player"
import { ApplicationCommandDataResolvable, SlashCommandBuilder } from "discord.js"
import { ClientOptions, Client } from "discord.js"

const {readdirSync} = require('fs')
const {join} = require('path')

export class Cliente extends Client {
    public commands: SlashCommandBuilder[]
    public player: Player = new Player(this)

    constructor(options: ClientOptions) {
        super(options)

        this.commands = []
        this.loadCommands('src/commands')
        this.loadEvents('src/events/client')
    }

    // Método que registra os comandos criados em todos os servidores
    // em que o bot foi criado
    registerCommands() {
        this.guilds.cache.get('8')?.commands.set(this.commands)
    }

    // Método para carregar todos comandos
    async loadCommands(path: string) {
        const commands = readdirSync(path)
        for(const command of commands) {
            const commandClass = await import(join(process.cwd(), `${path}/${command}`))
            const cmd = new (commandClass.default)(this)
            this.commands.push(cmd)
        }
    }

    // Método para carregar todos eventos
    async loadEvents(path: string) {
        const events = readdirSync(path)
        for(const event of events) {
            const eventClass = await import(join(process.cwd(), `${path}/${event}`))
            const evt = new (eventClass.default)(this)

            this.on(evt.name, evt.run)
        }
    }
}