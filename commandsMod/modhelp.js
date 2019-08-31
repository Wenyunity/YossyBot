const { prefix } = require('../config.json');

module.exports = {
	name: 'modhelp',
	description: 'Lists all mod commands.',
	aliases: ['modcommands'],
	usage: '[command name]',
  modOnly: true,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

    // No arguments given, list all commands
		if (!args.length) {
			data.push('Here\'s a list of all my mod commands:');
			data.push(commands.map(function(cmd) {
				if (cmd.modOnly) {return cmd.name;}
				else {return;}
			}).filter(Boolean).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

      return message.channel.send(data, { split: true });
		}

    // Argument given
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		if (command.modOnly) data.push(`**This command is only usable by mods.**`);

		message.channel.send(data, { split: true });
	},
};
