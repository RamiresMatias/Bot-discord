import { ClientApplication } from "discord.js"
import { Cliente } from "./Client"

export class Event {
    protected client: Cliente
    private name: string
    private options: any

    constructor(client: Cliente, options: any) {
        this.client = client
        this.name = options.name
        this.options = options.options
    }
}