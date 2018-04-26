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
  console.log(intent);
  if (intent) {
    confidence = intent['confidence'];
    if (confidence > 0.80) {
      switch (intent['value']) {
        case 'greetings':
          session.send('Tôi có thể giúp gì được cho bạn?')
          break;
        case 'lookup':
          const name = firstEntity(message.nlp, 'name');
          console.log(name);
          https.get('https://moses.giang.xyz/members?q=' + name.value, res => {
            if (res.statusCode != 200) {
              session.send("Èo, không tìm thấy ai tên là '" + name.value + "' hết, dạo này trí nhớ có vấn đề rồi")
            }
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
              body += data;
            });
            res.on("end", () => {
              console.log(body);
              var members = JSON.parse(body);
              var count = members.length;
              if (count == 0) {
                session.send("Troll tôi à, làm gì có ai tên là '" + name.value + "'' tham gia sa mạc đâu")
              }
              for (var i = 0, i < count; i++) {
                var member = members[i];
                session.send(member['name'] + ' - Đội ' + member['team'] + ' - ' + member['phone'])
              }
            });
          });
          break;
        default:
          session.send('Chưa hiểu ý bạn lắm, tôi chỉ hỗ trợ việc tra cứu tên thôi nhé! 1')
      }
      return;
    }
  }

  session.send('Chưa hiểu ý bạn lắm, tôi chỉ hỗ trợ việc tra cứu tên thôi nhé!')

  //session.send('Tôi có thể giúp gì được cho bạn?')
})

bot.listen()
