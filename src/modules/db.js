const {config} = require('./../config');
const Firebase = require('firebase');
const firebase = Firebase.initializeApp(config);
const db = firebase.database();

module.exports = {
    db, firebase
}