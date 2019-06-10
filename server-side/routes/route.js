'use strict';

module.exports = function(app){
    var pVocab = require('../controllers/controller');
    app.route('/signUp').post(pVocab.create_user);
    app.route('/push').post(pVocab.push_words);
    app.route('/words').get(pVocab.show_user_words);
    app.route('/update').put(pVocab.update_word_list);
    app.route('/translate').post(pVocab.word_translate);
    app.route('/word/:user/:id/remove').get(pVocab.remove_word);
    app.route('/admin').get(pVocab.admin_panel);
    app.route('/admin/:id/remove').get(pVocab.admin_panel_remove);
};