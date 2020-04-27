const image2base64 = require('image-to-base64'),
Anticaptcha = require('anticaptcha2'),
anticaptcha = new Anticaptcha('api-key'),
ImageToTextTask = Anticaptcha.ImageToTextTask,
discord = require('discord.js'),
client = new discord.Client(),
sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));


client.on("ready", async () => {
  var saldo = await anticaptcha.getBalance();
  console.log(`${client.user.tag}, Bring it on!\n${saldo}`);
});

client.on("message", async (msg) => {
  if (msg.author.id === "408785106942164992") {
    if (msg.content.includes("Are you a real human?")) {
      var link;
      var mAuthor = msg.author.lastMessageID;
      var mid = msg.channel.messages.get(`${mAuthor}`);
      var gAttachment = mid.attachments.map(file => file.id);
      var attachment_id = mid.attachments.get(`${gAttachment}`);
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
