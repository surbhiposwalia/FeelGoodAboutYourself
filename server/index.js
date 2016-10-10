import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from '../models/user';
// import jsonParser from 'bodyParser';
var jsonParser = bodyParser.json();
//import Thought from '../models/thought'



const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();

app.use(express.static(process.env.CLIENT_PATH));

mongoose.Promise = global.Promise; //why does this make it work?


app.get('/users', function(req,res){
    User.find({}, function(err, users) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.json(users);
    });
});

app.post('/users',jsonParser,function(req,res){
    var user = new User({
                username: req.body.username,
                password: req.body.password
            });

            user.save(function(err,user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                return res.status(201).json({});
            });
});

//extra credit --- to delete the user

app.put('/users/:userId', jsonParser, function(req, res){
    User.findByIdAndUpdate(req.params.userId,{username:req.body.username,
        password:req.body.password}, function(err, user){
        
        return res.json({});
    });
   
});

app.get('/thoughts', function(req, res){
    Thought.find({}, function(err, thoughts) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.json(thoughts);
    });
})
app.get('/thoughts/:thoughtId', function(req, res){
    Thought.findOne(req.params.thoughtId, function(err, thoughts) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.json(thoughts);
    });
})

app.post('/thoughts', function(req, res){
    
        var thought = new Thought({
                thought: req.body.thought,
                from: req.body.from
            });
    Thought.save(thought, function(err, thoughts) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.json({});
    });
});

app.put('/thoughts/:thoughtId', function(req, res){
    Thought.findByIdAndUpdate(req.params.thoughtId, function(err, thoughts) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.json({});
    });
});

app.delete('/thoughts/:thoughtId', function(req, res){
    Thought.findByIdAndRemove(req.params.thoughtId,{from :req.body.from, thought: req.body.thought}, function(err, thoughts) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
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