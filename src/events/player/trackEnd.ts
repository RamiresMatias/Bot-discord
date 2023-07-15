import { CommandInteraction, GuildResolvable, InteractionType } from "discord.js";
import { Event } from "../../structures/Event";
import { Queue, Track } from "discord-player";

export default class extends Event {
  constructor(client: any) {
    super(client, {
      name: "trackEnd",
    });
  }

  run = async (queue: Queue, track: Track) => {
    try {
      const nextTrack = queue.tracks[0]
      if(nextTrack) {
        await queue.play(nextTrack)
        queue.remove(nextTrack)
      } else {
        queue.clear()
      }
    } catch (error) {
      console.log(error);
    }
  };
}
