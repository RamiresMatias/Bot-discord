import { CommandInteraction, GuildMember, GuildResolvable, Message } from "discord.js";
import { Cliente } from "src/structures/Client";
import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "skip first",
      description: "Remove a primeira música da fila",
      options: []
    });
  }

  async run(interaction: CommandInteraction) {

    const voiceChannel = (interaction.member as GuildMember).voice.channel;

    if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

    const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

    if(queue?.tracks.length === 0) interaction.reply({content: 'A fila está vazia!', ephemeral: true})

    const current = queue?.current
    queue?.skip()
    return interaction.reply({content: `Música removida ${current?.title}`, ephemeral: true})
  }
}