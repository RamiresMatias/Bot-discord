import { ClientEvents, CommandInteraction, InteractionType } from "discord.js"

const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client: ClientEvents) {
        super(client, {
            name: 'ping',
            description: 'Mostra o ping do bot'
        })
    }

    run = (interaction: CommandInteraction) => {
        interaction.reply({
            content: `O ping do bot é: ${this.client.ws.ping} ms`,
            ephemeral: true //Mensagem do comando irá aparecer somente para quem digitou
        })
    }
}