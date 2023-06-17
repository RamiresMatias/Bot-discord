import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { QueryType } from "discord-player";
import {
  CommandInteraction,
  GuildMember,
  GuildResolvable,
} from "discord.js";
import { Cliente } from "src/structures/Client";
import ytdl from "ytdl-core";

import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "play",
      description: "Tocar música!",
      options: [
        {
          name: "url",
          type: ApplicationCommandOptionType.String,
          description: "URL da música",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    try {

      const voiceChannel = (interaction.member as GuildMember).voice.channel;

      if (!voiceChannel) return await interaction.reply("Você não está em um canal de voz!");

      
      const queue = this.client.player.createQueue(interaction.guild as GuildResolvable,
        {
          metadata: { channel: interaction.channel },
          ytdlOptions: {
            filter: "audioonly",
            highWaterMark: 1 << 30,
            dlChunkSize: 0,
          },
          initialVolume: 100,
        }
      );

      try {
        if (!queue.connection) await queue.connect((interaction.member as GuildMember).voice.channel as any);
      } catch (error) {
        queue.destroy();
        return await interaction.reply({content: `Não consigo entrar no canal, tente novamente!`, ephemeral: true});
      }

      const query = interaction.options.get("url");
      
      await interaction.deferReply({ephemeral: true})

      const { videoDetails } = await ytdl.getInfo(query?.value as string);

      const searchResult = await this.client.player
        .search(videoDetails.video_url, {
          requestedBy: interaction.user,
          searchEngine: QueryType.AUTO,
        })
        .catch(() => {});

      if (!searchResult || !searchResult.tracks.length)
        return await interaction.reply({
          content: "Música não encontrada!",
        });

      searchResult.playlist
        ? queue.addTracks(searchResult.tracks)
        : queue.addTrack(searchResult.tracks[0]);

      let message = `Música adicionada a fila!`
        
      if (!queue.playing && queue.previousTracks.length === 0) {
        message = `Tocando: ${queue.current.title} \n Link: ${videoDetails.video_url}`
        await queue.play()
      }

      await interaction.editReply({content: message})
    } catch (error) {
      return await interaction.reply({
        content:
          "Ocorreu um erro ao tentar executar o comando de /play: " + error,
      });
    }
  }
}
