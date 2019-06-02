'use strict';
var mongoose = require('mongoose'),
    myStorage = mongoose.model('modelname');

exports.show_all_words = function(req, res){
    myStorage.find({}, function(err, words){
        if(err) res.send(err);
        res.json(words);
    });
};

exports.create_user = function(req, res){
    var newUser = new myStorage(req.query);
    newUser.save(function(error, result){
        if(error){
            console.log(error);
            res.send(error);
        } else {
            console.log(result);
            res.json(result);
        }
    });
}

exports.push_words = function(req, res){
    var new_words = new myStorage(req.query);
    var wordlist = {ukUserWord: req.query.ukUserWord, engUserWord: req.query.engUserWord};
    new_words.userWords.push(wordlist);
    new_words.save(function(err,words){
        if(err) res.send(err);
        res.json(words);
    });
};

exports.update_word_list = function(req, res){
    myStorage.findOneAndUpdate(
        { unuqieUserId: req.query.userId },
        { $push: { userWords: 
                { ukUserWord: req.query.ukUserWord, engUserWord: req.query.engUserWord}
            }
        },
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.json(result);
            }
        }
    );
}

exports.remove_word = function(req, res){
    myStorage.update(
        { unuqieUserId: req.query.userId },
        { $pull: { userWords:  { ukUserWord: req.query.ukUserWord} } },
        function (error, result) {
            if (error) {
                res.send(err);
                console.log(error);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    );
}

exports.show_user_words = function(req, res){
    myStorage.find(
        { unuqieUserId: req.query.userId }, { _id: 0, userWords: 1 },
        function (error, result) {
            if (error) {
                res.send(err);
                console.log(error);
            } else {
                console.log(result);
                res.json(result);
            }
        }
    );
}

