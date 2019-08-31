// -- REQUIRED --
const badges = require('../constants.js').badges;
const Discord = require('discord.js');
const moduleColor = "#FF9900";

module.exports = {
	name: 'badge',
	aliases: false,
	description: 'Views an item\'s description.',
  args: true,
	usage: '<id>',
	execute(message, args) {
		const lookupValue = ("00" + args[0]).slice(-3);
		if (badges[lookupValue]) {
			const itemEmbed = new Discord.RichEmbed()
				.setColor(moduleColor)
				.setTimestamp(message.createdAt)
				.setTitle(badges[lookupValue].name)
				.setDescription(badges[lookupValue].description)
				.addField('Price', badges[lookupValue].cost, true)
				.addField('BP', badges[lookupValue].BP, true)
				.addField('Shop Item?', badges[lookupValue].sale, true);

			message.channel.send(itemEmbed);
		}
		else {
			message.channel.send("This item couldn't be found!");
		}
	},
};
