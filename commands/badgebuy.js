const badges = require('./constants.js').badges;
const load = require('./constants.js').loadCheck;
const save = require('./constants.js').saveData;

module.exports = {
	name: 'badgebuy',
	description: 'Buys badges on sale',
  args: true,
  usage: '<teamID> <badgeID>',
	execute(message, args) {
    const lookupValue = ("00" + args[1]).slice(-3);

    // Check if item is there
		if (badges[lookupValue]) {
      // Check if item is on sale
      if (badges[lookupValue].sale) {
        // Get user data
        try {
          const data = load(args[0], message.author.id);

          // Price check
          if (data.coins < badges[lookupValue].cost) {
            message.channel.send("You don't have enough coins to make this purchase!");
            return;
          }
          else {
            // Subtract Coins
            data.coins -= badges[lookupValue].cost;
            // Add badges, if already there
            if (data.badges[lookupValue]) {
              data.badges[lookupValue] += 1;
            }
            // Add badges, if not there
            else {
              data.badges[lookupValue] = 1;
            }

            // Save data and send message
            save(args[0], data);
            message.channel.send(`${data.teamName} bought **1x ${badges[lookupValue].name}** for ${badges[lookupValue].cost} coins.`);
          }
        }
        catch (err) {
          message.channel.send(err);
        }
      }
      else {
        message.channel.send("This badge is not on sale!");
      }
    }
    else {
      message.channel.send("Could not find the badge requested!");
    }
  },
};
