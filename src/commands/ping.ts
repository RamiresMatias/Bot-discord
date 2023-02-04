import { CommandInteraction } from "discord.js";
import { Cliente } from "src/structures/Client";

import { Command } from "../structures/Command";

export default class extends Command {
  constructor(client: Cliente) {
    super(client, {
      name: "ping",
      description: "Mostra o ping do bot",
    });
  }

  run = (interaction: CommandInteraction) => {
    interaction.reply({
      content: `O ping do bot é: ${this.client.ws.ping} ms`,
      ephemeral: true, //Mensagem do comando irá aparecer somente para quem digitou
    });
  };
}
