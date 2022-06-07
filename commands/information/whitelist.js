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
	let blacklistROle = guildD.roles.cache.find(r => r.name === 'Blacklisted')
	const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	

	if (!target) {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`${Formatters.codeBlock("markdown", "!whitelist [user]")}`)
		.setTimestamp()
		return message.reply({embeds: [E]})
	}
	let memberTar = message.guild.members.cache.get(target.id);
	const checkUser = await UserData.find({userId: memberTar.id})
	if (checkUser.length > 0) {
		UserData.findOne({userId: memberTar.id}, async function(err, data) {
			if (data.isBlacklist == true) {
				data.isBlacklist = false
				memberTar.roles.add(buyerRole.id)
				memberTar.roles.remove(blacklistROle.id)
				await data.save()
				const E = new MessageEmbed()
				.setColor("GREEN")
				.setTitle("Dum Hub | Whitelist Manager")
				.setDescription(`Whitelisted <@!${memberTar.id}>!`)
				.setTimestamp()
				return message.reply({embeds: [E]})
			}
		})
	}
	if (PermRole) {
		const newUser = await UserData.create({
			userId: memberTar.id,
			key: genkey.generateKey(),
			isUsing: true,
			isBlacklist: false,
			reason: "",
			hwid: "",
			time: 0,

		})
		memberTar.roles.add(buyerRole.id)
		const E = new MessageEmbed()
		.setColor("GREEN")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription(`Whitelisted <@!${memberTar.id}>!`)
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
	name: "whitelist",
	aliases: [""],
}