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
	let PermRole = mem.roles.cache.find(r => r.name === 'whitelist-perm')
	let role = guildD.roles.cache.find(r => r.name === 'whitelist-perm')
	let buyerRole = guildD.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	
	if (!target) {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`${Formatters.codeBlock("markdown", "!info [user]")}`)
		.setTimestamp()
		return message.reply({embeds: [E]})
	}
	let memberTar = message.guild.members.cache.get(target.id);
	if (PermRole) {
		const checkUser = await UserData.find({userId: memberTar.id})
		if (checkUser.length > 0) {
			UserData.findOne({userId: memberTar.id}, async function(err, data) {
				const hwid = data.hwid || "Non hwid"
				const E = new MessageEmbed()
				.setColor("GREEN")
				.setTitle("Dum Hub | Whitelist Manager")
				.addFields(
					{
						name: "Username",
						value: `${memberTar.user.username}`,
						inline: true,
					},
					{
						name: "UserId",
						value: `${memberTar.id}`,
						inline: true,
					},
					{
						name: "Key",
						value: data.key,
						inline: true,
					},
					{
						name: "Hwid",
						value: hwid,
						inline: true,
					},
					{
						name: "Blacklist",
						value: `${data.isBlacklist}`,
						inline: true,
					},
				)
				.setThumbnail(memberTar.user.displayAvatarURL())
				.setTimestamp()
				return message.author.send({embeds: [E]})
			})
		} else {
			const E = new MessageEmbed()
			.setColor("RED")
			.setTitle("Dum Hub | Whitelist Manager")
			.setDescription("User data not found.")
			.setTimestamp()
			return message.reply({embeds: [E]})
		}
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
	name: "info",
	aliases: [""],
}