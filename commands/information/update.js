//const discord = require('discord.js')
const {MessageEmbed, Formatters} = require('discord.js');
const ms = require('ms')
const fetch = require('node-fetch')
const fs = require('fs')
const axios = require('axios')
const mongoose = require('mongoose');
const UserData = require('../../Data/UserData.js')

module.exports.run = async(client, message, args, prefix) => {
	const user = message.author
	const guildD = client.guilds.cache.get('958023716539871233') //951051576389304320
	const mem = guildD.members.cache.get(user.id)
	let PermRole = mem.roles.cache.find(r => r.name === 'whitelist-perm')
	let role = guildD.roles.cache.find(r => r.name === 'whitelist-perm')
	const file = message.attachments.first()?.url
	let buyerRole = guildD.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	let blacklistROle = guildD.roles.cache.find(r => r.name === 'Blacklisted')

	if (PermRole) {
		if (!file) {
			const E = new MessageEmbed()
			.setColor("RED")
			.setTitle("Dum Hub | Whitelist Manager")
			.setDescription(`${Formatters.codeBlock("markdown", "!update [file]")}`)
			.setTimestamp()
			return message.reply({embeds: [E]})
		}
		fs.readFile(file, "utf8", function(err, data) {
			if (err) {
				console.log(err)
			}
			axios.post("https://dumweb.herokuapp.com/upload", {
				script: data,
			}).then((res) => {
				if (res.statusCode == 200) {
					const E = new MessageEmbed()
					.setColor("RED")
					.setTitle("Dum Hub | Whitelist Manager")
					.setDescription(`${res.data}`)
					.setTimestamp()
					return message.reply({embeds: [E]})
				}
			})
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
	name: "update",
	aliases: [""],
}