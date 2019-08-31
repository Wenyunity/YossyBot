// -- REQUIRED --
const badges = require('../constants.js').badges;
const store = require('../constants.js').badgeStore;
const Discord = require('discord.js');
const moduleColor = "#FF9900";

module.exports = {
	name: 'badgeshop',
	aliases: ['badgestore', 'secretshop', 'mowzshop'],
	description: 'Views badges on sale',
	execute(message) {
    const shopEmbed = new Discord.RichEmbed()
      .setColor(moduleColor)
      .setTimestamp(message.createdAt)
      .setTitle("Ms. Mowz's Shop")
      .setDescription("Here are all of the badges for sale");

    // For each group
    Object.keys(store).forEach(function(group) {
      let groupText = "";
      // We get each ID in the group
      store[group].forEach(function(itemID) {
        // And if it is an item
        if (badges[itemID] && badges[itemID].sale) {
          // We add the text
          groupText += `\`[${itemID}]\` - **${badges[itemID].name}** (${badges[itemID].BP} BP, ${badges[itemID].cost} coins): ${badges[itemID].description}\r\n`;
        }
      });
      shopEmbed.addField(group, groupText);
    });
    message.channel.send(shopEmbed);
  },
};
