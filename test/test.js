'use strict';

var expect = require('chai').expect;
var Chat = require('../src/manager');

Chat.Configurations = {
    apiKey: "AIzaSyDM9FlZBxIC-2GxlgVaUC1rgg77FjXJfhs",
    authDomain: "petsapp-69613.firebaseapp.com",
    databaseURL: "https://petsapp-69613.firebaseio.com",
    projectId: "petsapp-69613",
    storageBucket: "petsapp-69613.appspot.com",
    messagingSenderId: "177914518376",
    namespace: 'chats',
    timestampFormat: 'YYYY/MM/DD HH:mm:ss'
};

describe('#Chat', function() {
    it('Should initiate successfully', function() {
        var chat = new Chat(222);
        expect(chat).to.be.an('object');
    });

    it('Should get empty messages', function() {
        var chat = (new Chat(13333)).getMessages().then(function (snap) {
            expect(snap.val()).to.be.null;
        });
    });

    it('Should add message successfully and lists it', function() {
        var chat = (new Chat(13444)).sendMessage({text: 'new message', senderId: 22551});

        (new Chat(13)).getMessages().then(function (snap) {
            expect(snap.val()).to.be.an('object');
        });
    });

    it('Should not reset chat if exists', function() {
        (new Chat(14555)).sendMessage({text: 'new message', senderId: 22551}).sendMessage({text: 'another message', senderId: 15451});

        let chat = Chat.findOrCreate({chatId: 14});

        chat.getMessages().then(function (snap) {
            expect(snap.val()).to.be.an('object');
        });
    });
});