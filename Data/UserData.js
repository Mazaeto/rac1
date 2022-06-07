const mongoose = require('mongoose');

const WhiteListSchema = new mongoose.Schema({
	
	userId: {
		type: mongoose.SchemaTypes.Number,
		required: true,
	},
	key: {
		type: mongoose.SchemaTypes.String,
		required: false,
	},
	isUsing: {
		type: mongoose.SchemaTypes.Boolean,
		required: true,
	},
	isBlacklist: {
		type: mongoose.SchemaTypes.Boolean,
		required: true,
	},
	reason: {
		type: mongoose.SchemaTypes.String,
		required: false,
	},
	hwid: {
		type: mongoose.SchemaTypes.String,
		required: false,
	},
	time: {
		type: mongoose.SchemaTypes.Number,
		required: true,
	}
})

module.exports = mongoose.model("WhiteListData", WhiteListSchema)