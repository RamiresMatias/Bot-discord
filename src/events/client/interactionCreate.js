const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    // Função que retorna callback que irá verificar a interação no servidor
    // e responder de acordo com a lista de comandos
    run = (interaction) => {
        if(interaction.isCommand()){
            const cmd = this.client.commands.find(cc => cc.name === interaction.commandName)
            if(!cmd) return
            cmd.run(interaction)
        }
    }
}