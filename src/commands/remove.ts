import { ApplicationCommandOptionType, CommandInteraction, GuildMember, GuildResolvable } from "discord.js";
import { Cliente } from "src/structures/Client";

import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "remove",
      description: "Remove a música da fila!",
      options: [
        {
          name: "position",
          type: ApplicationCommandOptionType.Number,
          description: "Posição da música na fila",
          required: true,
        },
      ],
    });
  }

  execute (interaction: CommandInteraction) {
    const voiceChannel = (interaction.member as GuildMember).voice.channel;
    if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

    const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

    if(!queue?.tracks.length) {
      return interaction.reply({content: 'A fila está vazia!', ephemeral: true})
    }

    const {value: position} = interaction.options.get("position", true) as any

    const track = queue.tracks.at((position - 1))

    if(!track) return interaction.reply({content: `Música não encontrada!`, ephemeral: true})

    queue.remove(track)
    
    return interaction.reply({content: 'Música removida da fila!', ephemeral: true})
  };
}
