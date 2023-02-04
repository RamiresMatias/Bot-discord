import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { QueryType } from "discord-player";
import { GuildChannelResolvable, GuildResolvable, Message } from "discord.js";
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

  async run(interaction: Message) {
    const voiceChannel = interaction.member?.voice.channel
    // if (!voiceChannel)
    //   interaction.reply(
    //     "Você precisa estar em um canal de voz para dar play na música!"
    //   );

    const permissions = voiceChannel?.permissionsFor(interaction.client.user as any)

    // if (!permissions?.has("CONNECT") || !permissions.has("SPEAK")) {
    //   return interaction.reply("Você não possui permissão para pedir música HAHAHA!")
    // }

    const queue = await this.client.player.createQueue(interaction.guild as GuildResolvable, {metadata: {channel: interaction.channel}})

    console.log(interaction.member?.voice);
    // if(!queue.connection) await queue.connect(interaction.member?.voice.channel as GuildChannelResolvable)
    // console.log('CCCCCCCCCCC');
    // const query = (interaction as any).options.get("url")

    // const {videoDetails} = await ytdl.getInfo(query)

    // const track = await this.client.player.search(videoDetails.video_url, {
    //   requestedBy: (interaction as any).user,
    //   searchEngine: QueryType.YOUTUBE_VIDEO
    // }).then(x => {
    //   console.log(x);
    //   x.tracks[0]
    // })

    // console.log(track);

    // // if(!track) return interaction.reply({content: 'Música não encontrada!'})

    // // queue?.play(track)

    // interaction.reply({content: 'AAAAAA'})
  }
}
