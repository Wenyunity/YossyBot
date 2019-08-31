const items = require('../constants.js').items;
const load = require('../constants.js').loadCheck;
const save = require('../constants.js').saveData;

module.exports = {
	name: 'itembuy',
	description: 'Buys items on sale',
  args: true,
  usage: '<teamID> <itemID> <number(optional)>',
	execute(message, args) {
    const lookupValue = ("00" + args[1]).slice(-3);
    let numberBought = 1;
    // Check if they give a number
    if (args[2] && !isNaN(parseInt(args[2]))) {
      // If they do, set the number (integer-ified)
      numberBought = Math.floor(args[2]);
      // Sanity check
      if (numberBought < 1) {
        numberBought = 1;
      }
    }
    // Check if item is there
		if (items[lookupValue]) {
      // Check if item is on sale
      if (items[lookupValue].sale) {
        // Get user data
        try {
          const data = load(args[0], message.author.id);

					console.log(data);

          // Price check
          if (data.coins < (items[lookupValue].cost * numberBought)) {
            message.channel.send("You don't have enough coins to make this purchase!");
            return;
          }
          else {
            // Subtract Coins
            data.coins -= items[lookupValue].cost * numberBought;
            // Add items, if already there
            if (data.items[lookupValue]) {
              data.items[lookupValue] += numberBought;
            }
            // Add items, if not there
            else {
              data.items[lookupValue] = numberBought;
            }

            // Save data and send message
						console.log("We get to save");
            save(args[0], data);
						console.log("Save complete");
            message.channel.send(`${data.teamName} bought **${numberBought}x ${items[lookupValue].name}** for ${(items[lookupValue].cost * numberBought)} coins.`);
          }
        }
        catch (err) {
					console.log("we have error");
          message.channel.send(err);
        }
      }
      else {
        message.channel.send("This item is not on sale!");
      }
    }
    else {
      message.channel.send("Could not find the item requested!");
    }
  },
};
