module.exports = {
  // Flips a coin, mainly for help
  name: 'flip',
	aliases: false,
	description: 'Flips a coin.',
  execute(message) {
    let coin = '';
    if(Math.random() < 0.5) {
      coin = "**heads**";
    }
    else {
      coin = "**tails**";
    }
    message.channel.send(`The coin flip has decided on ${coin}.`);
  },
};
