//const discord = require('discord.js')
const {MessageEmbed, Formatters} = require('discord.js');
const ms = require('ms')
const humanizeDuration = require('humanize-duration');
const fs = require('fs')
const axios = require('axios')
const mongoose = require('mongoose');
const genkey = require('generate-key')
const UserData = require('../../Data/UserData.js')

module.exports.run = async(client, message, args, prefix) => {
    const user = message.author
    const guildD = client.guilds.cache.get('958023716539871233') //951051576389304320
    const mem = guildD.members.cache.get(user.id)
    const amount = args[0]
    let PermRole = mem.roles.cache.find(r => r.name === 'genkey-perm')
    let role = guildD.roles.cache.find(r => r.name === 'genkey-perm')
    
    if (!amount) {
        const E = new MessageEmbed()
        .setColor("RED")
        .setTitle("Dum Hub | Whitelist Manager")
        .setDescription(`${Formatters.codeBlock("markdown", "!genkey [amount]")}`)
        .setTimestamp()
        return message.reply({embeds: [E]})
    }
    if (PermRole) {
    	cosnt E = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Dum Hub | Whitelist Manager")
        .setDescription("Check Dms")
        .setTimestamp()
        message.channel.send({embeds: [E]})
    }
    if (PermRole) {
        const E = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Dum Hub")
        .setDescription("Key")
        .setTimestamp()
        for (var i = 1; i <= amount; i++) {
            const key = genkey.generateKey()
            const newUser = await UserData.create({
                userId: 0,
                key: key,
                isUsing: false,
                isBlacklist: false,
                reason: "",
                hwid: "",
                time: 0,

            })
            const SaveUser = newUser.save()
            E.addField(`Key ${i}`, `${key}`, true)
        }
        return user.send({embeds: [E]})
    } else {
        const E = new MessageEmbed()
        .setColor("RED")
        .setTitle("Dum Hub")
        .setDescription("You don't have permission!")
        .setTimestamp()
        return message.reply({embeds: [E]})
    }
}

module.exports.help = {
    name: "genkey",
    aliases: [""],
}