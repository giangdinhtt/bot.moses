const Bottr = require('bottr')
const BottrApp = require('bottr-app')
const bot = new Bottr.Bot()

bot.use(new BottrApp())
//bot.use(new Bottr.FacebookMessengerClient())

bot.on('message_received', function(message, session) {
  session.send('Tôi có thể giúp gì được cho bạn?')
})

bot.listen()
