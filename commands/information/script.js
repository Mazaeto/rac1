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
	let PermRole = mem.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	let role = guildD.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')

	if (PermRole) {
		const checkdata = await UserData.find({userId: mem.id})
		if (checkdata.length <= 0) {
			const E = new MessageEmbed()
			.setColor("RED")
			.setTitle("Dum Hub | Whitelist Manager")
			.setDescription(`User data not found. Did you redeem key before ?`)
			.setTimestamp()
			return message.reply({embeds: [E]})
		}
		UserData.findOne({userId: mem.id}, async function(err, data){
			if (err) {
				console.log(err)
			}
			if (data.key == null || data.key == "") {
				const E = new MessageEmbed()
				.setColor("RED")
				.setTitle("Dum Hub | Whitelist Manager")
				.setDescription("User data not found. Did you redeem key before ?")
				.setTimestamp()
				return message.reply({embeds: [E]})
			}
			if (data.isBlacklist == true) {
				const E = new MessageEmbed()
				.setColor("RED")
				.setTitle("Dum Hub | Whitelist Manager")
				.addField("You have been blacklisted!", `${data.reason}`)
				.setTimestamp()
				return message.reply({embeds: [E]})
			}
			const E = new MessageEmbed()
			.setColor("GREEN")
			.setTitle("Dum Hub | Whitelist Manager")
			.setDescription("Please check your dms!")
			.setTimestamp()
			await message.reply({embeds: [E]})

			const E1 = new MessageEmbed()
			.setColor("GREEN")
			.setTitle("Dum Hub | Whitelist Manager")
			.setTimestamp()
			.setDescription(`${Formatters.codeBlock("markdown", `getgenv().key = "${data.key}"\nloadstring(game:HttpGet("https://dumweb.herokuapp.com/script"))()`)}`)
			return message.author.send({embeds: [E1]})
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
	name: "script",
	aliases: [""],
}