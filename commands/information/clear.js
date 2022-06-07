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
	let PermRole = mem.roles.cache.find(r => r.name === 'hwid-perm')
	let role = guildD.roles.cache.find(r => r.name === 'hwid-perm')
	let buyerRole = guildD.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	
	if (!target) {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`${Formatters.codeBlock("markdown", "!clear [user]")}`)
		.setTimestamp()
		return message.reply({embeds: [E]})
	}
	let memberTar = message.guild.members.cache.get(target.id);
	if (PermRole) {
		await UserData.deleteOne({userId: memberTar.id})
		memberTar.roles.remove(buyerRole.id)
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`Clear <@!${memberTar.id}>'s data success!`)
		.setTimestamp()
		return message.reply({embeds: [E]})
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
	name: "clear",
	aliases: [""],
}