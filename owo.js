const image2base64 = require('image-to-base64');
const Anticaptcha = require('anticaptcha2');
const anticaptcha = new Anticaptcha('api-key');
const ImageToTextTask = Anticaptcha.ImageToTextTask;
const discord = require('discord.js');
const client = new discord.Client();
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


client.on("ready", async () => {
	var saldo = await anticaptcha.getBalance();
	console.log(`${client.user.tag}, Bring it on!`);
	console.log(saldo);
});

client.on("message", async (msg) => {
	if (msg.author.id === "658605529157074954") {
		if (msg.content.includes("Are you a real human?")) {
			var link;
			var mAuthor = msg.author.lastMessageID;
			var message_id = msg.channel.messages.get(`${mAuthor}`);
			var gAttachment = message_id.attachments.map(file => file.id);
			var attachment_id = message_id.attachments.get(`${gAttachment}`);
			var attached = `${attachment_id.url}`;
			link = attached;
			var base64 = await image2base64(attached);
			var captha = new ImageToTextTask({
				body: base64,
				phrase: false,
				case: true,
				numeric: 0,
				math: false,
				length: [5,5]
			});
			var selesai = await anticaptcha.solve(captha);
			msg.channel.send(selesai.text)
				.then(() => {
  						msg.channel.awaitMessages(response => response.content.includes("I have verified that you are human"), {
    						max: 1,
    						time: 30000,
    						errors: ['time'],
  						})
  					.then((collected) => {
      					console.log("Mantap");
    						})
    					.catch(() => {
     						console.log("Gk mantap");
    					});
					});
		};
	};
});



client.login("dicsordasdawdawdawd");
