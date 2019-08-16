// -- REQUIRED --
const items = require('./constants.js').items;
const Discord = require('discord.js');
const moduleColor = "#FF9900";

module.exports = {
	name: 'item',
	aliases: false,
	description: 'Views an item\'s description.',
  args: true,
	usage: '<id>',
	execute(message, args) {
		const lookupValue = ("00" + args[0]).slice(-3);
		if (items[lookupValue]) {
			const itemEmbed = new Discord.RichEmbed()
				.setColor(moduleColor)
				.setTimestamp(message.createdAt)
				.setTitle(items[lookupValue].name)
				.setDescription(items[lookupValue].description)
				.addField('Price', items[lookupValue].cost, true)
				.addField('Shop Item?', items[lookupValue].sale, true);

			message.channel.send(itemEmbed);
		}
		else {
			message.channel.send("This item couldn't be found!");
		}
	},
};
