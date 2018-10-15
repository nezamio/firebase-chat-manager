Firebase Chat Manager
=========

A small library that manages firebase realtime database for API use.

## Installation

  `npm install @abdullaalsayyed/firebase-chat-manager`

## Usage

    var {Chat} = require('@abdullaalsayyed/firebase-chat-manager');

    var chat = Chat.findOrCreate({chatId: 2225, senderId: 2222, receiverId: 3333});
  
  
  If there is no chat created with that id, it will return that chat object or it will create a new instance.


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.