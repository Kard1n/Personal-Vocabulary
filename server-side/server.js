var express      = require('express'),
    app          = express(),
    port         = process.env.PORT || 3000;
var path         = require('path')    
var mongoose     = require('mongoose');
    pVocab       = require('./api/models/model');
    bodyParser   = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ip/dbname');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

app.listen(port);