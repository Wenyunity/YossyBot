const fs = require('fs');
const check = require('../constants.js').checkTeam;
const create = require('../constants.js').createTeam;


module.exports = {
	name: 'createteam',
	description: 'Creates a new team',
  args: true,
	usage: '[teamID, teamName]',
  modOnly: true,
	execute(message, args) {
    const teamID = args.shift().toUpperCase();
    const teamName = args.join(" ");
    const teamJSON = JSON.parse(fs.readFileSync('./GameJSON/teamdata.json', 'utf8'));
		// Error checks
    if (check(teamID)) {
      return message.channel.send("TeamID already exists!");
    }
    if (!teamName) {
      return message.channel.send("Not enough arguments given!");
    }

    // Create a team
    teamJSON.teamName = teamName;
		create(teamID, teamJSON, teamName);
  },
};
