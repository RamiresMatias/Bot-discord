import { Cliente } from "./Client"

export class Command {
    protected client: Cliente
    private name: string
    private description: string
    private options: any

    constructor(client: Cliente, options: any) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
    }
}