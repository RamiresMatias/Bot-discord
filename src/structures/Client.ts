import { ClientOptions, Client } from "discord.js"

const {readdirSync} = require('fs')
const {join} = require('path')

export class Cliente extends Client {
    private commands: any[]

    constructor(options: ClientOptions) {
        super(options)

        this.commands = []
        this.loadCommands('src/commands')
        this.loadEvents('src/events')
    }

    // Método que registra os comandos criados em todos os servidores
    // em que o bot foi criado
    registerCommands() {
        this.guilds.cache.get('598345090188050442')?.commands.set(this.commands)
    }

    // Método para carregar todos comandos
    loadCommands(path: string) {
        const categories = readdirSync(path)

        for (const category of categories) {
            const pathRoot = `${path}/${category}`
            const commands = readdirSync(pathRoot)

            for(const command of commands) {
                const commandClass = require(join(process.cwd(), `${pathRoot}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        }
    }

    // Método para carregar todos eventos
    loadEvents(path: string) {
        const filesEvents = readdirSync(path)

        for (const fileEvent of filesEvents) {
            const pathFile = `${path}/${fileEvent}`
            const events = readdirSync(pathFile)

            for(const event of events) {
                const eventClass = require(join(process.cwd(), `${pathFile}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }
}