import { ClientEvents, CommandInteraction } from "discord.js"

const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client: ClientEvents) {
        super(client, {
            name: 'say',
            description: 'Faz com que o bot envie uma mensagem',
            options: [
                {
                    name: 'canal',
                    type: 'CHANNEL',
                    description: 'Canal onde a mensagem será enviada!',
                    required: true
                },
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'A mensagem que será enviada no canal!',
                    required: true
                }
            ]
        })
    }

    run = (interaction: CommandInteraction) => {
        if(!interaction.isCommand()) return
        this.getResponseMessaging(interaction)
    }

    getResponseMessaging(interaction: CommandInteraction) {
        const texto = interaction.options.getString('mensagem')
        const canal = interaction.options.getChannel('canal') as any
        canal.send({content: texto}).then(() => this.getResponseInteractionReply(interaction, 'Mensagem enviada!', true))
    }

    getResponseInteractionReply(interaction: CommandInteraction, message: string, ephemeral: boolean) {
        return interaction.reply({content: message, ephemeral})
    } 
}
