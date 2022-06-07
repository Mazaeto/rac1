const discord = require('discord.js')
const {Client, Collection} = require('discord.js');
const client = new Client({partials: ["CHANNEL"], intents: 32767});
const fs = require('fs');
const {TOKEN, PREFIX} = require("./Data/config.json");

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.SlashCmds = new Collection();
module.exports.client = client;

fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }

        jsFiles.forEach(file => {

            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`[Command Handler] ${file} was loaded`)
            try {
                client.commands.set(fileGet.help.name, fileGet);
                fileGet.help.aliases.forEach(alias => {
                	client.aliases.set(alias, fileGet.help.name)
                })

            } catch (err) {
              // catch err in console  
                return console.log(err);
            }
        });
    });
});

fs.readdirSync('./events/').forEach(dir => {
        var jsFiles = fs.readdirSync('./events/').filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }
        let check = false
        jsFiles.forEach(file => {

            const fileGet = require(`./events/${file}`);
            try {
                client.events.set(fileGet.name, fileGet)
                if (check == false) {
                	console.log(`Events ${dir} was loaded`)
                	check = true
                }

            } catch (err) {
              // catch err in console  
                return console.log(err);
            }
        });
});

/* fs.readdirSync('./SlashCommands/').forEach(dir => {
    fs.readdir(`./SlashCommands/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }

        jsFiles.forEach(file => {

            var fileGet = require(`./SlashCommands/${dir}/${file}`);
            console.log(`[SlashCommands Handler] ${file} was loaded`)
            try {
                client.SlashCmds.set(fileGet.help.name, fileGet);

            } catch (err) {
              // catch err in console  
                return console.log(err);
            }
        });
    });
}); */


client.login(TOKEN);