const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const mongoose = require('mongoose');
const config = require('./config/database');
const authentication = require('./routes/authentication')(router);
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Err in connecting to database!')
    } else {
        //console.log('Secret : ' + config.secret);
        console.log('Connected to database : ' + config.db);
    }
});

app.get('/', function (req, res) {
    res.send('Hello World! This is awesome!');
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/authentication', authentication);

//http://localhost:3000
app.listen(port, () => {
    console.log('Listening on port ' + port);
});