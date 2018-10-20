const DB = (function () {

    let _instance = null;

    return {
        /**
         * Initiate db connection to firebase
         * @param App
         * @returns {*}
         */
        connect: (App) => {
            if (_instance === null)
                _instance = App.database();
            return _instance;
        }
    }
})();

module.exports = {
    DB
};