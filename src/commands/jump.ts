import { ApplicationCommandOptionType, CommandInteraction, GuildMember, GuildResolvable } from "discord.js";
import { Cliente } from "src/structures/Client";
import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "jump",
      description: "Salta para a faixa da posição fornecida, sem remover as anteriores!",
      options: [
        {
          name: "position",
          type: ApplicationCommandOptionType.Number,
          description: "Posição da música na fila",
          required: true,
        },
      ],
    })

  }

  async execute(interaction: CommandInteraction) {
    try {
      const voiceChannel = (interaction.member as GuildMember).voice.channel;

      if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

      const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

      if(!queue) return interaction.reply({content: `Fila não encontrada!`, ephemeral: true})

      const {value: position} = interaction.options.get("position", true) as any

      const track = queue.tracks.at((position - 1))

      if(!track) return interaction.reply({content: `Música não encontrada!`, ephemeral: true})

      queue.remove(track)
      queue.insert(track, 0)
      await queue.forceNext()

      return interaction.reply({content: `Pulando para: ${track.title}`, ephemeral: true})
    } catch (error) {
      return await interaction.reply({
        content:
          "Ocorreu um erro ao tentar executar o comando de /jump: " + error,
      });
    }
  }
}