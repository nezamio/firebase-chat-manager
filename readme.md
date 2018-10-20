Firebase Chat Manager
=========

A small library that manages firebase realtime database for API use as a Chat Interface.

## Installation

  `npm install @abdullaalsayyed/firebase-chat-manager`

## Usage
Initialization:

    var Chat = require('@abdullaalsayyed/firebase-chat-manager');

    Chat.configurations = const config = {
                              apiKey: "<your-api-key>",
                              authDomain: "<project-id>.firebaseapp.com",
                              databaseURL: "https://<project-id>.firebaseio.com",
                              projectId: "<project-id>",
                              storageBucket: "<project-id>.appspot.com",
                              messagingSenderId: "<sender-id>",
                              namespace: '<your-custom-namepace>',
                              timestampFormat: 'YYYY/MM/DD HH:mm:ss'
                          };

Create new chat: 

    var chat = new Chat(123);
     
    // If there is no chat created with that id, it will return that chat object or it will create a new instance.
    Chat.findOrCreate({chatId: 2225, senderId: 2222, receiverId: 3333});
  
Get Chat Messages: 

    chat.getMessages().then(function (message) {
                console.log(message.val());
            });  
            
Send a new Message: 

    chat.sendMessage({text: 'new message', senderId: 22551});

Delete all chat messages: 

    chat.clearMessages();

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.