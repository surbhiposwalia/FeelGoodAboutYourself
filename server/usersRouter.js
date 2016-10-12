var express = require('express');
var bcrypt = require('bcryptjs');
var jsonParser = require('body-parser').json();
var User = require('./models/user');
var errorHandler = require('./index').errorHandler;

var usersRouter = express.Router();

usersRouter.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err) return errorHandler(res);
        return res.json(users);
    });
});

usersRouter.post('/login', (req, res) => {
    var username= req.body.username;
    var password= req.body.password;
    User.findOne({ username: username })
        .then(user => {
            if (!user) return res.sendStatus(401);
            
            user.validatePassword(req.body.password, (err, isValid) => {
                if (err) return res.sendStatus(500);
                
                if (!isValid) return res.sendStatus(401);
                
                return res.status(200).json({ username: username });
            })
        })
    
})

usersRouter.post('/', jsonParser, function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (!req.body) {
        return res.status(404).json({
            message: "No request body "
        });
    }
    if (!req.body.username) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: Username"
        });
    }

    username = username.trim();
    
    if (username === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }
    
    if (!req.body.password) {
        return res.status(404).json({
            message: "Missing field: Password "
        });
    }

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: Password"
        });
    }
    
    password = password.trim();
    
    if (password === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                username: username,
                password: hash
            });

            user.save(function(err, user) {
                if (err) return errorHandler(res);

                return res.status(201).json({});
            });
        });
    });
});

//extra credit --- to delete the user

usersRouter.put('/:userId', jsonParser, function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (!req.body) {
        return res.status(404).json({
            message: "No request body "
        });
    }

    if (!req.body.username) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: Username"
        });
    }

    username = username.trim();
    
    if (username === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }

    if (!req.body.password) {
        return res.status(404).json({
            message: "Missing field: Password "
        });
    }

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: Password"
        });
    }

    password = password.trim();
    
    if (password === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.findByIdAndUpdate(req.params.userId, {
                    username: username,
                    password: hash
                },
                function(err, user) {
                    if (err) {
                        errorHandler(res);
                    }

                    return res.json({});
            });
        });
    });
});

module.exports = usersRouter;
