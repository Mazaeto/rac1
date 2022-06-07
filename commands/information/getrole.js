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
	const guildD = client.guilds.cache.get('958023716539871233') //951051576389304320, 957659231232852018
	const mem = guildD.members.cache.get(user.id)
	let buyer = mem.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	let PermRole1 = mem.roles.cache.find(r => r.name === 'hwid-perm')
	let role = guildD.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')

	const checkdata = await UserData.find({userId: mem.id})

	if (buyer) {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`You already have 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 role!`)
		.setTimestamp()
		return message.reply({embeds: [E]})
	}

	if (checkdata.length > 0) {
		UserData.findOne({userId: mem.id}, async function(err, data) {
			if (data.isBlacklist == false) {
				mem.roles.add(role.id)
				const E = new MessageEmbed()
				.setColor("GREEN")
				.setTitle("Dum Hub | Whitelist Manager")
				.setDescription(`Get role success!`)
				.setTimestamp()
				return message.reply({embeds: [E]})
			} else {
				const E = new MessageEmbed()
				.setColor("RED")
				.setTitle("Dum Hub | Whitelist Manager")
				.addField("You have been blacklisted!", `${data.reason}`)
				.setTimestamp()
				return message.reply({embeds: [E]})
			}
		})
	} else {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`User data not found. Did you redeem key before ?`)
		.setTimestamp()
		return message.reply({embeds: [E]})
	}
}

module.exports.help = {
	name: "getrole",
	aliases: [""],
}