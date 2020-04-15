var createError = require('http-errors');
const express = require('express')
const app = express()
const port = 3005
// Cross-Origin Resource Sharing: make API accessible from webapp
var cors = require('cors');
app.use(cors());

// Database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to db.")
});



app.get('/stuff', (req, res) => res.send("Good evening, Erling."))

//setup routes
var controllers = require('./controllers');
app.use(controllers);

app.listen(port,'0.0.0.0', () => console.log(`Example app listening at http://localhost:${port}`))