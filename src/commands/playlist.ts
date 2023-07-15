import { CommandInteraction, GuildMember, GuildResolvable } from "discord.js";
import { Cliente } from "src/structures/Client";
import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "playlist",
      description: "Mostra as músicas na playlist!",
    })

  }

  async execute(interaction: CommandInteraction) {
    try {
      const voiceChannel = (interaction.member as GuildMember).voice.channel;
      if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

      const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

      if((!queue?.tracks || !queue?.tracks.length) && !queue?.current) 
        return interaction.reply({content: 'A fila está vazia!', ephemeral: true})

      const previousTrack = `\n Tocando agora: ${queue.current.title} \n`
      const content = queue?.tracks.reduce((acc, music, index) => {
        acc += `\n ${(index + 1)}: ${music.title}\n`
        return acc
      }, '')

      const result = previousTrack + content

      return await interaction.reply({content: result, ephemeral: true})
    } catch (error) {
      return await interaction.reply({content: 'Erro ao executar comando /playlist', ephemeral: true})
    }
  }
}