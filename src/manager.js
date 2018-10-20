const {App} = require('./modules/App');
const {Chat} =  require("./modules/Chat");

Chat.Application = App.init;

module.exports = Chat;