//const discord = require('discord.js')
const {MessageEmbed} = require('discord.js');
const ms = require('ms')
const humanizeDuration = require('humanize-duration');
const fs = require('fs')
const axios = require('axios')
const mongoose = require('mongoose');
const UserData = require('../../Data/UserData.js')

module.exports.run = async(client, message, args, prefix) => {
	const user = message.author
	const guildD = client.guilds.cache.get('958023716539871233') //951051576389304320
	const mem = guildD.members.cache.get(user.id)
	const key = args[0]
	let BuyerRole = mem.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	let role = guildD.roles.cache.find(r => r.name === '𝗣𝗥𝗘𝗠𝗜𝗨𝗠')
	
	if (!key) {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub")
		.setDescription("!redeem [key]")
		return message.channel.send({embeds: [E]});
	}

	if (!role) {
		const E = new MessageEmbed()
		.setColor("RED")
		.setTitle("Dum Hub | Whitelist Manager")
		.setDescription("Can't find role Whitelisted in this server!")
		return message.channel.send({embeds: [E]});
	}

	if (!BuyerRole) {
		const check = await UserData.find({key: key})
		const PlrCheck = await UserData.find({userId: mem.id})

		UserData.findOneAndDelete({userId: mem.id}, async function(err, data){
            if (err) {
                console.log(err)
            }
        })

		if (check.length <= 0) {
			const E = new MessageEmbed()
			.setTitle("Dum Hub | Whitelist Manager")
            .setDescription("This key doesn't exist!")
            .setColor('RED')
            .setTimestamp()
	        return message.channel.send({
	            embeds: [E]
	        });
		} else {
			UserData.findOne({key: key}, async function(err, data){
				if (err) {
					console.log(err)
				}
				if (data.isUsing == false) {
					data.userId = mem.id
					data.isUsing = true
					data.save(function(err) {
						if (err) console.log(err)
						const E = new MessageEmbed()
			            .setTitle("Dum Hub | Whitelist Manager")
			            .setDescription("Redeem Success!")
			            .setColor('GREEN')
			            .setTimestamp()
			            mem.roles.add(role.id)
				        return message.channel.send({
				            embeds: [E]
				        });
					})
				} else {
					const E = new MessageEmbed()
					.setTitle("Dum Hub | Whitelist Manager")
		            .setDescription("This key is already in use!")
		            .setColor('RED')
		            .setTimestamp()
			        return message.channel.send({
			            embeds: [E]
			        });
				}
			})
		}
	}

	if (BuyerRole) {
		const E = new MessageEmbed()
			.setTitle("Dum Hub | Whitelist Manager")
            .setDescription("You have been whitelisted!")
            .setColor('RED')
            .setTimestamp()
            //.setFooter(client.user.tag, client.user.displayAvatarURL())

        return message.channel.send({
            embeds: [E]
        });
	}
}

module.exports.help = {
	name: "redeem",
	aliases: [""],
}