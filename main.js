// -- REQUIRES --
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// -- CONSTANTS --
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Sets require for each file in commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// OnStart
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Wuigi\'s Anger', { type: 'WATCHING' });
});

// Read message
client.on('message', message => {
	// Exit if not a correct message
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Grab arguments split by spaces
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Get the command
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// No command, return
	if (!command) return;

	// DM's aren't allowed for this message
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('This command can\'t be used in DM\'s');
	}

	if (command.args && !args.length) {
		let reply = `This command needs arguments!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('Something went wrong with that command!');
	}
});

client.login(token);
