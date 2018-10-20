class Chat {
    static Application() {};
    static Configurations() {};

    /**
     * Class constructor
     * @param chatId
     */
    constructor(chatId) {
        if (typeof this.constructor.Configurations === 'function')
            throw new Error("please setup your configurations first.");

        this.app = this.constructor.Application(this.constructor.Configurations);
        this.config = this.app.getConfigurations();
        this.ref = `${this.config.namespace}/${chatId}`;
        this.timestamper = require('time-stamp');
    }

    /**
     * Push a new message to chat
     * @param text
     * @param senderId
     * @returns {Chat}
     */
    sendMessage({text, senderId}) {
        this.app.db.ref(this.ref).child('messages').push({text, senderId, timestamp: this.timestamper(this.config.timestampFormat)});
        return this;
    }

    /**
     * Get chat messages
     * @returns {Promise<firebase.database.DataSnapshot>}
     */
    getMessages() {
        return this.app.db.ref(this.ref).child('messages').once('value');
    }

    /**
     * Get messages for specific user by id
     * @param id
     * @returns {Promise<firebase.database.DataSnapshot>}
     */
    getUserMessages(id) {
        return this.app.db.ref(this.ref).child('messages').orderByChild('senderId').equalTo(id).once('value');
    }

    /**
     * Clear chat messages
     * @returns {Promise<any>}
     */
    clearMessages() {
        return this.app.db.ref(this.ref).child('messages').remove();
    }

    /**
     * Search for chat by id or create a new instance for that id
     * @param chatId
     * @param senderId
     * @param receiverId
     * @returns {Chat}
     */
    static findOrCreate({chatId, senderId, receiverId}) {

        let config = this.Application().getConfigurations();

        const ref = `${config.namespace}/${chatId}`;

        Chat.Application().db.ref(config.namespace).orderByKey().equalTo(chatId.toString()).once('value', snap => {

            if (! snap.exists()) {

                Chat.Application().db.ref(ref).set({
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