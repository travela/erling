// Module to link all route files to app.js with a single import
var express = require('express');
var app = module.exports = express();
var auth = require('./auth')

    app.use(require('./example'))
    app.get('/signup', (req, res, next) => auth.signup(req, res, next), 
                        (req, res) => auth.what(req, res)
            );
    app.get('/signin', (req, res, next) => auth.signin(req, res, next));

