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
	const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	
	if (!target) {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`${Formatters.codeBlock("markdown", "!rs [user]")}`)
		.setTimestamp()
		return message.reply({embeds: [E]})
	}
	let memberTar = message.guild.members.cache.get(target.id);

	if (PermRole1) {
		const checkdata = await UserData.find({userId: memberTar.id})
		if (checkdata.length <= 0) {
			const E = new MessageEmbed()
			.setColor("RED")
			.setTitle("Dum Hub | Whitelist Manager")
			.setDescription(`User data not found. Did you redeem key before ?`)
			.setTimestamp()
			return message.reply({embeds: [E]})
		}
		UserData.findOne({userId: memberTar.id}, async function(err, data){
			if (err) {
				console.log(err)
			}
			data.hwid = ""
			await data.save()
			if (err) console.log(err)
			const E = new MessageEmbed()
			.setColor("GREEN")
			.setTitle("Dum Hub | Whitelist Manager")
			.setDescription(`Reset hwid for <@!${memberTar.id}> success!`)
			.setTimestamp()
			await message.reply({embeds: [E]})
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
	name: "rs",
	aliases: [""],
}