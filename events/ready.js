const client = require('../index.js').client
//const {createCmd} = require('../dataHandler')
const mongoose = require('mongoose');
const {DataBase} = require('../Data/config.json')
const UserData = require('../Data/UserData.js')
client.on("ready", async () => {
	//client.user.setActivity("NHU CON CAK", {type: "STREAMING", url: "discord.gg/Fb3uzcqDeF"});
	console.log("Ready to use")
	//createCmd(client, '951051576389304320');
	try {
		mongoose.connect(DataBase, {
			//useFindAndModify: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
		}).then(() => console.log("connected to db"))
	} catch(e) {
		console.log(e);
	}
})