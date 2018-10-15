const {db} = require('./db');
const {config} = require('./../config');

class Chat {

    /**
     * Class constructor
     * @param chatId
     */
    constructor(chatId) {

        this.id  = chatId;
        this.ref = `${config.namespace}/${chatId}`;
        this.config = config;
        this.timestamper = require('time-stamp');
    }

    /**
     * Push a new message to chat
     * @param text
     * @param senderId
     * @returns {Chat}
     */
    sendMessage({text, senderId}) {
        db.ref(this.ref).child('messages').push({text, senderId, timestamp: this.timestamper(this.config.timestampFormat)});
        return this;
    }

    /**
     * Get chat messages
     * @returns {Promise<firebase.database.DataSnapshot>}
     */
    getMessages() {
        return db.ref(this.ref).child('messages').once('value');
    }

    /**
     * Get messages for specific user by id
     * @param id
     * @returns {Promise<firebase.database.DataSnapshot>}
     */
    getUserMessages(id) {
        return db.ref(this.ref).child('messages').orderByChild('senderId').equalTo(id).once('value');
    }

    clearMessages() {
        return db.ref(this.ref).child('messages').remove();
    }

    /**
     * Search for chat by id or create a new instance for that id
     * @param chatId
     * @param senderId
     * @param receiverId
     * @returns {Chat}
     */
    static findOrCreate({chatId, senderId, receiverId}) {

        const ref = `${config.namespace}/${chatId}`;

        db.ref(config.namespace).orderByKey().equalTo(chatId.toString()).once('value', snap => {

            if (! snap.exists()) {

                db.ref(ref).set({
                    senderId,
                    receiverId,
                });
            }
        });

        return new Chat(chatId);
    }
}

module.exports = {
  Chat
};