'use strict';

var expect = require('chai').expect;
var {Chat} = require('../src/manager');

describe('#Chat', function() {
    it('Should initiate successfully', function() {
        var chat = new Chat(11);
        expect(chat).to.be.an('object');
    });

    it('Should get empty messages', function() {
        var chat = (new Chat(12)).getMessages().then(function (snap) {
            expect(snap.val()).to.be.null;
        });
    });

    it('Should add message successfully and lists it', function() {
        var chat = (new Chat(13)).sendMessage({text: 'new message', senderId: 22551});

        (new Chat(13)).getMessages().then(function (snap) {
            expect(snap.val()).to.be.an('object');
        });
    });

    it('Should not reset chat if exists', function() {
        (new Chat(14)).sendMessage({text: 'new message', senderId: 22551}).sendMessage({text: 'another message', senderId: 15451});

        let chat = Chat.findOrCreate({chatId: 14});

        chat.getMessages().then(function (snap) {
            expect(snap.val()).to.be.an('object');
        });
    });
});