import { CommandInteraction, GuildMember, GuildResolvable } from "discord.js";
import { Cliente } from "src/structures/Client";
import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "resume",
      description: "Volta a tocar a música pausada!",
    })

  }

  execute(interaction: CommandInteraction) {
    const voiceChannel = (interaction.member as GuildMember).voice.channel;

    if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

    const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

    queue?.setPaused(false)
    return interaction.reply({content: 'Música despausada!', ephemeral: true})
  }
}