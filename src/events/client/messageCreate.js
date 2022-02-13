const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = (message) => {
        if(message.content.toLowerCase() === 'gustavo'){
            message.reply('Loud Gugu APELÃO 😭 😭 😭 😭 😭')
        }
    }
}