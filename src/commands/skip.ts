import { CommandInteraction, GuildMember, GuildResolvable, Message } from "discord.js";
import { Cliente } from "src/structures/Client";
import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "skip",
      description: "Faz o bot sair do canal",
      options: []
    });
  }

  async execute(interaction: CommandInteraction) {
    const voiceChannel = (interaction.member as GuildMember).voice.channel;

    if (!voiceChannel) interaction.reply("Você não está em um canal de voz!");

    const queue = this.client.player.getQueue(interaction.guild as GuildResolvable)

    if(!queue || !queue?.connection) return interaction.reply({content: 'Não estou conectado em nenhum canal', ephemeral: true})
    
    queue.destroy()
    return interaction.reply({content: 'Saindo...', ephemeral: true})
  }
}