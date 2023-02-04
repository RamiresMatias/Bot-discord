import { CommandInteraction, InteractionType } from "discord.js"

import {Event} from '../../structures/Event'

export default class extends Event {
    constructor(client: any) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    // Função que retorna callback que irá verificar a interação no servidor
    // e responder de acordo com a lista de comandos
    run = (interaction: CommandInteraction) => {
        if(interaction.type === InteractionType.ApplicationCommand){
            const commands = this.client.commands as any
            const cmd = commands.find((cc: any) => cc.name === interaction.commandName)
            if(!cmd) return
            cmd.run(interaction)
        }
    }
}