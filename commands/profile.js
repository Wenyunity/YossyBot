// -- REQUIRES --
const load = require('../constants.js').loadData;
const Discord = require('Discord.js');
const moduleColor = "#FF9900";

module.exports = {
	name: 'profile',
	aliases: ['teamData'],
	description: 'Views a team\'s data',
  args: true,
  usage: '<teamID>',
	execute(message, args) {
    try {
      const data = load(args[0]);

      const theOtherEmbed = new Discord.RichEmbed()
        .setColor(moduleColor)
        .setTimestamp(message.createdAt)
        .setTitle(`Profile for ${data.teamName}`)
        .setDescription("For items, use the inventory command. For badges, use inventory badge.")
        .addField("Coins", `${data.coins}`, true)
        .addField("Level", `${data.level}`, true)
        .addField("SP", `${data.SP}`, true)
        .addField("Next League Battle", `${data.nextBattle}`, true)
        .addField("Next Quest Battle", `${data.nextQuest}`, true)
        .addField("Last Battle Time", new Date(data.lastBattle).toLocaleString("default", { timeZone: "UTC", timeZoneName: "short" }));

        message.channel.send({ embed: theOtherEmbed });
    }
    catch {
      message.channel.send("We couldn't find a team with this ID!");
      return;
    }
    return;
	},
};
