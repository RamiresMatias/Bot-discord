import { joinVoiceChannel, VoiceConnection, AudioPlayer } from "@discordjs/voice"
import { ClientEvents, DMChannel, Message, NewsChannel, PartialDMChannel, TextChannel, ThreadChannel, VoiceBasedChannel } from "discord.js"
import { Queue } from "../../classes/queue"

const ytdl = require('ytdl-core')
const Event = require('../../structures/Event')

type ItemMusicType = {
    title: string
    url: string
}

type QueueContructType = {
    textChannel: DMChannel | PartialDMChannel | NewsChannel | TextChannel | ThreadChannel
    voiceChannel: VoiceBasedChannel
    connection: null | VoiceConnection
    songs: Queue<ItemMusicType>
    volume: number
    playing: boolean
}


module.exports = class extends Event {
    private queueSongs = new Queue<ItemMusicType>
    private otherQueue = new Map<string, QueueContructType>()
    private queueContruct?: QueueContructType

    constructor(client: ClientEvents) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (message: Message) => {
        // const prefix = process.env.PREFIX as string

        // if(message.author.bot || !message.content.startsWith(prefix)) return

        // if(message.content.startsWith(`${prefix}play`)) return await this.execute(message)
        // if(message.content.startsWith(`${prefix}skip`)) return this.skip(message)
        // if(message.content.startsWith(`${prefix}stop`)) return this.stop(message)
            
        // return message.reply('Não achei esse comando não mano!')
    }

    async play(guildId: string, song: ItemMusicType) {
        const serverQueue = this.otherQueue.get(guildId)
        if(!song) {
            serverQueue?.connection?.disconnect()
            this.otherQueue.delete(guildId)
            return
        }

        // serverQueue?.connection?.playOpusPacket(ytdl(song.url))
    }

    skip(message: Message) {
        console.log('skip');
    }

    stop(message: Message) {
        console.log('stop');
    }

    async execute(message: Message) {
        const args = message.content.split(' ')
        const voiceChannel = message.member?.voice.channel
        
        if(!voiceChannel) return message.reply('Você precisa estar em um canal de voz para dar play na música!')
        
        const permissions = voiceChannel.permissionsFor(message.client.user as any)
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.reply('Você não possui permissão para pedir música HAHAHA!')
        }

        const {videoDetails} = await ytdl.getInfo(args[1])
        const song = {title: videoDetails.title, url: videoDetails.video_url}

        if(this.queueSongs.isEmpty()) {

            this.queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: this.queueSongs,
                volume: 5,
                playing: true,
            }
        
            this.otherQueue.set(message.guild?.id as string, this.queueContruct)
            this.queueContruct.songs.enqueue(song)

            try {
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: message.guild?.id as string,
                    adapterCreator: message.guild?.voiceAdapterCreator as any
                })
                
                this.queueContruct.connection = connection
            } catch (error) {
                this.otherQueue.delete(message.guild?.id as string)
                return false
            }
        } else {
            this.queueSongs.enqueue(song)
            return message.channel.send('Música adicionado na fila!')
        }
    }
}