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

    run = async (interaction) => {
        if(!interaction.isCommand()) return
        const texto = interaction.options.getString('mensagem')
        this.getResponseMessaging(interaction, texto)
    }

    getResponseMessaging(interaction, message) {
        return interaction.reply(message)
    }

    getResponseError(interaction){
        return interaction.reply({content: 'ERROR - Informe um canal de texto', ephemeral: true})
    }

    isValidCommand(canal){
        return ['GUILD_TEXT', 'GUILD_ANNOUCEMENTS'].includes(canal.type)
    }
}
