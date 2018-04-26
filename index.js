const Bottr = require('bottr')
const BottrApp = require('bottr-app')
const bot = new Bottr.Bot()
const https = require("https")

//bot.use(new BottrApp())
bot.use(new Bottr.FacebookMessengerClient())

function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

bot.on('message_received', function(message, session) {
  const intent = firstEntity(message.nlp, 'intent');
  if (intent) {
    confidence = intent['confidence'];
    if (confidence > 80.0) {
    	switch (intent['value']) {
    		case 'lookup':
          const name = firstEntity(message.nlp, 'name');
          https.get('https://moses.giang.xyz/members', res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
              body += data;
            });
            res.on("end", () => {
              body = JSON.parse(body);
              console.log(body);
              );
            });
          });
    			break;
    		case 'greetings':
          session.send('Tôi có thể giúp gì được cho bạn?')
          break;
        default:
          session.send('Chưa hiểu ý bạn lắm, tôi chỉ hỗ trợ việc tra cứu tên thôi nhé!')
    	}
      return;
    }
  }

  session.send('Chưa hiểu ý bạn lắm, tôi chỉ hỗ trợ việc tra cứu tên thôi nhé!')

  //session.send('Tôi có thể giúp gì được cho bạn?')
})

bot.listen()
