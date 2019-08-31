// -- REQUIRED --
const items = require('../constants.js').items;
const store = require('../constants.js').store;
const Discord = require('discord.js');
const moduleColor = "#FF9900";

module.exports = {
	name: 'shop',
	aliases: ['store'],
	description: 'Views items on sale',
	execute(message) {
    const shopEmbed = new Discord.RichEmbed()
      .setColor(moduleColor)
      .setTimestamp(message.createdAt)
      .setTitle("The Store")
      .setDescription("Here are all of the items for sale");

    // For each group
    Object.keys(store).forEach(function(group) {
      let groupText = "";
      // We get each ID in the group
      store[group].forEach(function(itemID) {
        // And if it is an item
        if (items[itemID] && items[itemID].sale) {
          // We add the text
          groupText += `\`[${itemID}]\` - **${items[itemID].name}** (${items[itemID].cost} coins): ${items[itemID].description}\r\n`;
        }
      });
      shopEmbed.addField(group, groupText);
    });
    message.channel.send(shopEmbed);
  },
};
