import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from '../models/user';
// import jsonParser from 'bodyParser';
var jsonParser = bodyParser.json();
import Thought from '../models/thought';
import bcrypt from 'bcryptjs';

mongoose.Promise = global.Promise;


const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(express.static(process.env.CLIENT_PATH));
app.use(jsonParser);


app.get('/users', function(req,res){
    User.find({}, function(err, users) {
        if(err) return errorHandler(res);
        return res.json(users);
    });
});

app.post('/users',jsonParser,function(req,res){
    let username= req.body.username;
    let password= req.body.password;
    
    if(!req.body){
        return res.status(404).json({
            message:"No request body "
        })
    }
    if (!req.body.username) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }
    
    if(typeof username !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: Username"
        })
    }
    
     username= username.trim();
    if(username === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
    }
    if(!req.body.password){
        return res.status(404).json({
            message:"Missing field: Password "
        })
    }
      
    
    if(typeof password !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: Password"
        })
    }
    password= password.trim();
    if(password === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
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

            user.save(function(err,user) {
                if(err) return errorHandler(res);

                return res.status(201).json({});
            });
});
});
});

//extra credit --- to delete the user

app.put('/users/:userId', jsonParser, function(req, res){
    let username= req.body.username;
    let password= req.body.password;
    
    if(!req.body){
        return res.status(404).json({
            message:"No request body "
        })
    }
    
    if (!req.body.username) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }
    
    if(typeof username !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: Username"
        })
    }
    
     username= username.trim();
    if(username === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
    }
    
    if(!req.body.password){
        return res.status(404).json({
            message:"Missing field: Password "
        })
    }
    
    if(typeof password !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: Password"
        })
    }
    
    password= password.trim();
    if(password === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
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
    
    User.findByIdAndUpdate(req.params.userId,{
        username: username,
        password: hash
        },
        function(err, user){
        if(err){errorHandler(res)}
        
        return res.json({});
    });
   
});
});
});

app.get('/thoughts', function(req, res){
    Thought.find({}, function(err, thoughts) {
       if(err) return errorHandler(res);
        return res.json(thoughts);
    });
})

app.get('/thoughts/:thoughtId', function(req, res){
    Thought.findOne(req.params.thoughtId, function(err, thoughts) {
       if(err) return errorHandler(res);
        return res.json(thoughts);
    });
})

app.post('/thoughts', function(req, res){
    let thought = req.body.thought;
    let from =req.body.from;
    
     if(!req.body){
        return res.status(404).json({
            message:"No request body "
        })
    }
    
    if (!req.body.thought) {
        return res.status(422).json({
            message: 'Missing field: thought'
        });
    }
    
    if(typeof thought !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: thought"
        })
    }
    
     thought= thought.trim();
    if(thought === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
    }
    
    if(!req.body.from){
        return res.status(404).json({
            message:"Missing field: from "
        })
    }
    
    if(typeof from !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: from"
        })
    }
    
    from= from.trim();
    if(from === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
    }
    
    var newThought = new Thought({
                thought: thought,
                from: from
    });
            
    newThought.save(function(err, thought) {
       if(err) return errorHandler(res);
        return res.status(201).json({});
    });
});

app.put('/thoughts/:thoughtId', function(req, res){
    
    let thought= req.body.thought;
    let from = req.body.from;
    
     if(!req.body){
        return res.status(404).json({
            message:"No request body "
        })
    }
    
    if (!thought) {
        return res.status(422).json({
            message: 'Missing field: thought'
        });
    }
    
    if(typeof thought !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: thought"
        })
    }
    
     thought= thought.trim();
    if(thought === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
    }
    
    if(!from){
        return res.status(404).json({
            message:"Missing field: from "
        })
    }
    
    if(typeof from !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: from"
        })
    }
    
    from= from.trim();
    if(from === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        })
    }
    
    Thought.findByIdAndUpdate(req.params.thoughtId,{ 
        thought: thought,
        from: from
        }, function(err, thoughts) {
        if(err) return errorHandler(res);
        return res.json({});
    });
});

app.delete('/thoughts/:thoughtId', function(req, res){
    Thought.findByIdAndRemove(req.params.thoughtId, function(err, thoughts) {
      if(err) return errorHandler(res);
        return res.json({});
    });
});

var runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/FeelsGood';
    mongoose
        .connect(databaseUri)
        .then(function() {
            console.log('db connected...');
            var port = process.env.PORT || 8080;
            var server = app.listen(port, function() {
                console.log('Listening on localhost:' + port);
                if (callback) {
                    callback(server);
                    console.log('server running');
                }
            })
        .catch(function(err){
            console.log(err); 
        });
    });
};



if (require.main === module) {
    runServer();
}

function  errorHandler(res){
   return res.status(500).json({
                message: 'Internal Server Error'
            });
    
}