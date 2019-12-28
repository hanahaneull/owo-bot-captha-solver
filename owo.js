var Antigate = require('antigate');
var ag = new Antigate('ya yeet');
const discord = require('discord.js');
const client = new discord.Client();
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

client.on("ready", () => {
	console.log(`${client.user.tag}`);
});

client.on("message", async msg => {

	if (msg.author.id === "658605529157074954") {
		if (msg.content.includes("Are you a real human?")){
		let mAuthor = msg.author.lastMessageID;
		let message_id = msg.channel.messages.get(`${mAuthor}`);
		let gAttachment = message_id.attachments.map(file => file.id);
		let attachment_id = message_id.attachments.get(`${gAttachment}`);
		let attached = `${attachment_id.url}`;
		console.log(attached);
		ag.processFromURL(attached, function(error, text, id) {
			  if (error) {
    			throw error;
  				} else {
  					console.log(text);
  					msg.channel.send(text);}});
		};

	};
});

client.login("djiancox");
