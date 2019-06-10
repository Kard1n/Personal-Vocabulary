'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storageSchema = new Schema({
    unuqieUserId: String,
    telegramUserId: String,
    userWords: [{
        //_id: false,
        engUserWord: String,
        ukUserWord: String
    }]
});

module.exports = mongoose.model('name', storageSchema);

