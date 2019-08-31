// Views a battle
const Discord = require('discord.js');
const moduleColor = "#999999";

// Display current battle state.
function displayBattle(msg, battle, moveList) {
	// Setup Embed
	const battleEmbed = new Discord.RichEmbed()
		.setColor(moduleColor)
		.setTitle('Battle!')
		.setAuthor('Wenyunibot')
		.setDescription(`${msg.author.tag}'s current battle.`);

	// Add moves
	if (moveList) {
		moveList.forEach(item => addMoveField(item, battleEmbed));
	}

	// Front team
	if (battle.front.type === "player") {
		battleEmbed.addField(`${battle.front.teamName}` || "Front Team", displayTeamStats(battle.front.characterList));
	}
	else {
		battleEmbed.addField(`${battle.front.teamName}` || "Front Team", displayEnemyTeamStats(battle.front.characterList));
	}

	// Back Team
	if (battle.back.type === "player") {
		battleEmbed.addField(`${battle.back.teamName}` || "Back Team", displayTeamStats(battle.back.characterList));
	}
	else {
		battleEmbed.addField(`${battle.back.teamName}` || "Back Team", displayEnemyTeamStats(battle.back.characterList));
	}

	// Who can move
	battleEmbed.addField("Able To Move", battle.moves);

	return battleEmbed;
}

/* Player Display */

// Displays stats for team
function displayTeamStats(characterList) {

	let message = "";
	for (let c = 0; c < characterList.length; c++) {
		message += "`[" + c + "]` - " + displayPlayerStats(characterList[c]) + "\r\n";
	}
	return message;
}

// Displays a player's stats
function displayPlayerStats(player) {
	let cross = "";
	let statusText = "";
	if (!player.alive) {
		cross = "~~";
	}
	if (player.statusList.length > 0) {
		statusText = getStatusText(player.statusList);
	}
	return cross + `**${player.name}** - ${player.HP}/${player.MaxHP} HP, ${player.FP}/${player.MaxFP} FP, ${player.DEF} DEF ${statusText}` + cross;
}

// Display status text
function getStatusText(statusList) {
	let statusText = "*( - ";

	// Add status names
	for (let x = 0; x < statusList.length; x++) {
		statusText += `${(statusList[x].name.charAt(0).toUpperCase() + statusList[x].name.substring(1))}! [${statusList[x].length}] - `;
	}

	// Add status text
	statusText += " )*";
	return statusText;
}

/* Move Display */

// Adding move fields
function addMoveField(move, battleEmbed) {
	const titleText = `**${move.moveUser}** used **${move.moveName}**!`;
	let descriptionText = "";

  const descriptionTextArray = move.effectArray.filter(item => item.name).map(item => getArrayText(item));
	descriptionText = descriptionTextArray.join("\r\n");

	if (descriptionText === "") {
		descriptionText = "It didn't do anything...";
	}
	if (move.statusDamage) {
		descriptionText += `\r\n${move.moveUser}'s HP changed by ${move.statusDamage} due to statuses.`;
	}

	battleEmbed.addField(titleText, descriptionText);
}

// Gets text for a move
function getArrayText(effectItem) {
	// Name
	let effectText = `${effectItem.name} `;
	// Damage
	if (effectItem.damage) {
		// Miss
		if (effectItem.damage === "miss") {
			return `It missed ${effectItem.name}!`;
		}
    // Hit
		else {
			effectText += `took ${effectItem.damage} damage`;
			// Status
      // Will need to edit this for multiple statuses
			if (effectItem.statusText) {
				effectText += ` and now has the ${effectItem.statusText} effect for ${effectItem.statusLength} turn`;
				if (effectItem.statusLength !== 1) {
					effectText += "s";
				}
			}
		}
	}
	// Else (Just Status)
  // Will need to edit this for multiple statuses
	else if (effectItem.statusLength) {
		effectText += `got the ${effectItem.statusText} effect for ${effectItem.statusLength} turn`;
		if (effectItem.statusLength !== 1) {
			effectText += "s";
		}
	}
	else {
		effectText += "wasn't affected by the move?";
	}
	effectText += "!";
	return effectText;
}

/* Enemy Display */

// Displays enemy stats
function displayEnemyTeamStats(characterList) {
	let message = "";
	for (let c = 0; c < characterList.length; c++) {
		message += "`[" + c + "]` - " + displayEnemyStats(characterList[c]) + "\r\n";
	}
	return message;
}

// Helper function
function displayEnemyStats(enemy) {
	let cross = "";
	let statusText = "";
	if (!enemy.alive) {
		cross = "~~";
	}
	if (enemy.statusList.length > 0) {
		statusText = getStatusText(enemy.statusList);
	}
	const message = cross + `**${enemy.name}** - ${enemy.HP}/${enemy.MaxHP} HP, ${enemy.ATK} ATK, ${enemy.DEF} DEF ` + statusText + cross;
	return message;
}

module.exports = {
  execute(message, battle, moveList) {
    displayBattle(message, battle, moveList);
  },
};
