'use strict';

var mongoose = require('mongoose'),
    myStorage = mongoose.model('personalVocabulary');
var { translate } = require("google-translate-api-browser");

exports.show_all_words = function(req, res){
    myStorage.find({}, function(err, words){
        if(err) res.send(err);
        res.json(words);
    });
};

exports.create_user = function(req, res){
    var newUser = new myStorage(req.body);
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
        { telegramUserId: req.params.user }, 
        { $pull: { userWords: { _id: req.params.id } } },
        { safe: true, multi: true },
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.json(result);
            }
    });
}

exports.show_user_words = function(req, res){
    myStorage.find(
        { telegramUserId: req.query.userId }, { _id: 0, userWords: 1 },
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

exports.word_translate = function(req, res){
    req.query.word.forEach(element => {
        translate(element, {to: "uk"})
            .then(resultWord => {
            myStorage.findOneAndUpdate(
                { unuqieUserId: req.query.uid },
                { $push: { userWords: { ukUserWord: resultWord.text, engUserWord: element } } }, 
                function (error, result) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result);
                    }
                }
            );        
        });
    });
}

exports.admin_panel = function(req, res){
    myStorage.find({}, function(err, result){
        if(err) res.send(err);
        res.render('index', { dummyArray: result });
    });
}

exports.admin_panel_remove = function(req,res){
    myStorage.remove({
        _id: req.params.id
    }, function(err,user){
        if(err) res.send(err);
        res.redirect('/admin');
    });
}