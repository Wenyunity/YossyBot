const items = require('../constants.js').items;
const badges = require('../constants.js').badges;
const itembuy = require('./itembuy.js');
const badgebuy = require('./badgebuy.js');

module.exports = {
	name: 'buy',
	description: 'Buys items or badges on sale',
  args: true,
  usage: '<teamID> <itemID/badgeID> <number(optional, item only)>',
	execute(message, args) {
    const lookupValue = ("00" + args[1]).slice(-3);
    // Check if item is there
		if (items[lookupValue]) {
      itembuy.execute(message, args);
    }
    // Check if badge is there
    else if (badges[lookupValue]) {
      badgebuy.execute(message, args);
    }
    else {
      message.channel.send("Could not find the item requested!");
    }
  },
};
