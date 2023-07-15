import { CommandInteraction, GuildMember, GuildResolvable } from "discord.js";
import { Cliente } from "src/structures/Client";
import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "queue",
      description: "Mostra as músicas da fila!",
    })

  }

  async execute(interaction: CommandInteraction) {
    try {
      const voiceChannel = (interaction.member as GuildMember).voice.channel;
      if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

      const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

      if((!queue?.tracks || !queue?.tracks.length) && !queue?.current) 
        return interaction.reply({content: 'A fila está vazia!', ephemeral: true})

      const currentTrack = `\n Tocando agora: ${queue.current.title} \n`
      const content = queue?.tracks.reduce((acc, track) => {
        acc += `\n ${(queue.getTrackPosition(track) + 1)}: ${track.title}\n`
        return acc
      }, '')

      const result = currentTrack + content

      return await interaction.reply({content: result, ephemeral: true})
    } catch (error) {
      return await interaction.reply({content: 'Erro ao executar comando /playlist', ephemeral: true})
    }
  }
}