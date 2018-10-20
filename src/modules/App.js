const {DB} = require("./db");
const Firebase = require('firebase');

const App = (function() {

    let _instance = null, _app = null, db = null, configs;

    let application = () => {
        return {
            getConfigurations: () => {
                return configs;
            },
            db,
            connection: _app,
        }
    };

    return {
        init: function(configurations)  {
            if (_app === null) {
                configs = configurations;
                _app = Firebase.initializeApp(configurations);
                db = DB.connect(_app);
            }

            return application();
        }
    }
})();

module.exports =  {
    App
};