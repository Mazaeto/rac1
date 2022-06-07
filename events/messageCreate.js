const client = require('../index.js').client
const {PREFIX} = require("../Data/config.json");
client.on("messageCreate", async (message) => {
	if (message.author.bot) return
	let prefix = PREFIX
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    // it will make the cmd work with him orginal name and his aliases
    let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if(commands) {
        if (!message.content.startsWith(prefix)) return
        commands.run(client, message, args, prefix);
    }
})