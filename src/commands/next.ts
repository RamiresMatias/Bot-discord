import { CommandInteraction, GuildMember, GuildResolvable } from "discord.js";
import { Cliente } from "src/structures/Client";
import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "next",
      description: "Força a próxima música a tocar!",
    })

  }

  async execute(interaction: CommandInteraction) {
    const voiceChannel = (interaction.member as GuildMember).voice.channel;

    if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

    const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

    await interaction.deferReply({ephemeral: true})

    if(queue?.tracks.length) await queue.forceNext()
    return interaction.editReply("Ok")
  }
}