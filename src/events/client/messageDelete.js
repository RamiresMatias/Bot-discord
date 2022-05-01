const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageDelete'
        })
    }

    run = (message) => {
        console.log(message)
        message.reply('Eu vi você excluindo a mensagem 👀')
    }
}