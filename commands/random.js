module.exports = {
	name: 'random',
	aliases: ['roll', 'rand'],
	description: 'Rolls a number between 1 and 100, or 1 and the argument specified',
	execute(message, args) {
    let rollNumber = 100;
    if (!(!args || isNaN(parseInt(args[0])))) {
      rollNumber = parseInt(args[0]);
    }
    message.channel.send(`From 1-${rollNumber}, the roll is **${Math.floor((Math.random() * rollNumber) + 1)}**. Lower rolls pass.`);
	},
};
