const TelegramBot = require('node-telegram-bot-api')
const debug = require('./helpers')
const fs = require('fs')

const TOKEN = ''

console.log('Bot has been started ....')

const bot = new TelegramBot(TOKEN, {
    polling: {
      interval: 300,
      autoStart: true,
      params: {
        timeout: 10
      }
    }
  })

  // bot.sendMessage(340635435, "первый")
  // bot.sendMessage(195072917, "второй")
  
  const inline_keyboard = [
    [
      {
        text: '1 кальян',
        callback_data: 'one'
      }
    ],
    [
      {
        text: '2 Кальяна',
        callback_data: 'two'
      }
    ],
    [
      {
        text: '3 Кальяна',
        callback_data: 'three'
      }
    ]
  ]
  
  bot.on('callback_query', query => {
  
    const { chat, message_id, text } = query.message
  
    switch (query.data) {
      case 'one':
        // куда, откуда, что
        bot.sendPhoto(chat.id, fs.readFileSync(__dirname + '/1.jpg'), {
            reply_markup: { inline_keyboard }
          })
        break
      case 'two':
      bot.sendPhoto(chat.id, fs.readFileSync(__dirname + '/2.jpg'), {
        reply_markup: { inline_keyboard }
      })
        break
      case 'three':
      bot.sendPhoto(chat.id, fs.readFileSync(__dirname + '/3.jpg'), {
          reply_markup: { inline_keyboard }
        })
        break
    }
  
    bot.answerCallbackQuery({
      callback_query_id: query.id
    })
  })
  
  // bot.onText(/\/start/, (msg, [source, match]) => {
  
  //   const chatId = msg.chat.id
  
  //   bot.sendMessage(chatId, 'Сколько было выкурено кальянов?', {
  //     reply_markup: {
  //       inline_keyboard
  //     }
  //   })
  
  // })

  // bot.onText(/\/client/, (msg, [source, match]) => {
  
  //   const chatId = msg.chat.id
  
  //   bot.sendMessage(chatId, chatId)
  // })

  bot.onText(/^\/start ([\w-]+)$/, (msg, [, command]) => {
  
  const message = Object.create(msg)
  message.text =  '/' + command.replace(/\-/g, ' ')
  console.log(message)
  bot.processUpdate({ message })
  })

  