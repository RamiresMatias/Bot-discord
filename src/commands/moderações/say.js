const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
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

    run = (interaction) => {
        if(!interaction.isCommand()) return
        this.getResponseMessaging(interaction)
    }

    getResponseMessaging(interaction) {
        const texto = interaction.options.getString('mensagem')
        const canal = interaction.options.getChannel('canal')
        canal.send({content: texto}).then(() => this.getResponseInteractionReply(interaction, 'Mensagem enviada!', true))
    }

    getResponseInteractionReply(interaction, message, ephemeral) {
        return interaction.reply({content: message, ephemeral})
    } 
}
