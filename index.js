const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const config = require('./config/database')

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

//http://localhost:3000
app.listen(port, () => {
    console.log('Listening on port ' + port);
});