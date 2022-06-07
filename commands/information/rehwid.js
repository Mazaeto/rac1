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
	let PermRole = mem.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	let PermRole1 = mem.roles.cache.find(r => r.name === 'hwid-perm')
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
			const timeleft = new Date(data.time)

			let checktime = timeleft - Date.now() >= timeleft || timeleft - Date.now() <= 0
			if (!checktime && !PermRole1) {
				const remaining = humanizeDuration(timeleft - Date.now(), {units: ["d", "h", "m", "s"], round: true});
				const E = new MessageEmbed()
				.setColor("RED")
				.setTitle("Dum Hub | Whitelist Manager")
				.addField(`Try again after`, `${Formatters.codeBlock("markdown", `${remaining}`)}`, false)
				.setTimestamp()
				return message.reply({embeds: [E]})
			}
			if (data.hwid != null || data.hwid == "") {
				data.hwid = ""
				data.time = Date.now() + ms("1w")
				data.save(async function(err) {
					if (err) console.log(err)
					const E = new MessageEmbed()
					.setColor("GREEN")
					.setTitle("Dum Hub | Whitelist Manager")
					.setDescription("Rehwid Success!")
					.setTimestamp()
					await message.reply({embeds: [E]})
				})
			}
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
	name: "rehwid",
	aliases: [""],
}