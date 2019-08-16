// -- REQUIRES --
const load = require('./constants.js').loadData;
const items = require('./constants.js').items;
const badges = require('./constants.js').badges;
const Discord = require('Discord.js');
const moduleColor = "#FF9900";
const ITEMS_PER_FIELD = 40;

module.exports = {
	name: 'inventory',
	aliases: ['inv', 'teamItem'],
	description: 'Views a team\'s items and badges',
  args: true,
  usage: '<teamID>',
	execute(message, args) {
    try {
      const data = load(args[0]);

      const invEmbed = new Discord.RichEmbed()
        .setColor(moduleColor)
        .setTimestamp(message.createdAt)
        .setTitle(`Itemlist for ${data.teamName}`);

				let text = "";
				let count = 0;
				let pass = false;

				// Iterate through items
				Object.keys(data.items).forEach(function(itemIndex) {
					text += `\`[${itemIndex}]\` - ${items[itemIndex].name}: ${data.items[itemIndex]}\r\n`;
					count++;
					// Preventing overflow
					if (count >= ITEMS_PER_FIELD) {
						count = 0;
						invEmbed.addField('Items', text, true);
						text = "";
						pass = true;
					}
				});

				// Extra items
				if (text) {
					invEmbed.addField('Items', text, true);
					text = '';
				}
				// No items at all
				else if (!pass) {
					invEmbed.addField('Items', "No Items!", true);
				}

				// Key Items
				Object.keys(data.keyItems).forEach(function(itemIndex) {
					text += `\`[${itemIndex}]\` - ${items[itemIndex].name}: ${data.items[itemIndex]}\r\n`;
				});

				// Add Key Items Embed
				invEmbed.addField('Key Items', text || 'No Key Items!', true);
				text = '';

				Object.keys(data.badges).forEach(function(badgeIndex) {
					text += `\`[${badgeIndex}]\` - ${badges[badgeIndex].name}: ${data.badges[badgeIndex]}\r\n`;
				});

				// Add Key Items Embed
				invEmbed.addField('Badges', text || 'No Badges!', true);
				text = '';

        message.channel.send({ embed: invEmbed });
    }
    catch {
      message.channel.send("We couldn't find a team with this ID!");
      return;
    }
    return;
	},
};
