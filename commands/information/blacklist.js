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
    let PermRole = mem.roles.cache.find(r => r.name === 'blacklist-perm')
    let role = guildD.roles.cache.find(r => r.name === 'blacklist-perm')
    let buyerRole = guildD.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args[1] || "No reason"
    if (!target) {
        const E = new MessageEmbed()
        .setColor("RED")
        .setTitle("Dum Hub | Whitelist Manager")
        .setDescription(`${Formatters.codeBlock("markdown", "!blacklist [user]")}`)
        .setTimestamp()
        return message.reply({embeds: [E]})
    }
    let memberTar = message.guild.members.cache.get(target.id);
    if (PermRole) {
        const checkdata = await UserData.find({userId: memberTar.id})
        if (checkdata.length <= 0) {
            const E = new MessageEmbed()
            .setColor("RED")
            .setTitle("Dum Hub | Whitelist Manager")
            .setDescription(`User data not found`)
            .setTimestamp()
            return message.reply({embeds: [E]})
        }
        UserData.findOne({userId: mem.id}, async function(err, data){
            if (err) {
                console.log(err)
            }
            data.isBlacklist = true
            data.reason = reason
            await data.save()
            memberTar.roles.remove(buyerRole.id)
            const E = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Dum Hub | Whitelist Manager")
            .setDescription(`Blacklisted <@!${memberTar.id}>!`)
            .setTimestamp()
            const E1 = new MessageEmbed()
            .setColor("RED")
            .setTitle("Dum Hub | Manager")
            .setDescription("You Got Blacklisted \n Thanks For 100k VND")
            target.send({embeds: [E1]})
            return message.reply({embeds: [E]})
        })
    } else {
        const E = new MessageEmbed()
        .setColor("RED")
        .setTitle("Dum Hub | Whitelist Manager")
        .setDescription("You don't have permission!")
        .setTimestamp()
        return message.reply({embeds: [E]})
    }
}

module.exports.help = {
    name: "blacklist",
    aliases: [""],
}