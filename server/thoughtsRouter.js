var express = require('express');
var jsonParser = require('body-parser').json();
var Thought = require('./models/thought');
var User = require('./models/user');


var thoughtsRouter = express.Router();
thoughtsRouter.use(jsonParser);

thoughtsRouter.get('/', function(req, res){
    Thought.find({}, function(err, thoughts) {
       if(err) return errorHandler(res);
        return res.json(thoughts);
    });
});

thoughtsRouter.get('/:from', function(req, res){
    User.findOne({username:req.params.from}, function(err,user){
        if(err) return errorHandler(err);
        console.log(user);
    Thought.find({from: user._id}, function(err, thoughts) {
      if(err) return errorHandler(res);
        return res.json(thoughts);
    });
    });
});

thoughtsRouter.post('/', function(req, res){
    let thought = req.body.thought;
    let from =req.body.from;
    
     if(!req.body){
        return res.status(404).json({
            message:"No request body "
        });
    }
    
    if (!req.body.thought) {
        return res.status(422).json({
            message: 'Missing field: thought'
        });
    }
    
    if(typeof thought !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: thought"
        });
    }
    
    thought = thought.trim();
    
    if(thought === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        });
    }
    
    if(!req.body.from){
        return res.status(404).json({
            message:"Missing field: from "
        });
    }
    
    if(typeof from !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: from"
        });
    }
    
    from = from.trim();
    
    if(from === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        });
    }
    User.findOne({username:from}, function(err,user){
        if(err) return errorHandler(err)
            console.log(user);
            var newThought = new Thought({
                thought: thought,
                from: user._id
            })
        newThought.save(function(err, thought) {
            if(err) return errorHandler(res);
            return res.status(201).json({});
        });
    })
    
   
       
    
});

thoughtsRouter.put('/:from ', function(req, res){
    
    let thought= req.body.thought;
    let from = req.params.from;
    
     if(!req.body){
        return res.status(404).json({
            message:"No request body "
        });
    }
    
    if (!thought) {
        return res.status(422).json({
            message: 'Missing field: thought'
        });
    }
    
    if(typeof thought !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: thought"
        });
    }
    
    thought= thought.trim();
    
    if(thought === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        });
    }
    
    if(!from){
        return res.status(404).json({
            message:"Missing field: from "
        });
    }
    
    if(typeof from !== 'string'){
        return res.status(422).json({
            message:"Incorrect field type: from"
        });
    }
    
    from = from.trim();
    
    if(from === ''){
        return res.status(422).json({
            message:"Incorrect field length"
        });
    }
    
    Thought.findOneAndUpdate(from,{ 
        thought: thought,
        from: from
        }, function(err, thoughts) {
        if(err) return errorHandler(res);
        return res.json({});
    });
});

thoughtsRouter.delete('/:thoughtId', function(req, res){
    Thought.findByIdAndRemove(req.params.thoughtId, function(err, thoughts) {
      if(err) return errorHandler(res);
        return res.json({});
    });
});


function  errorHandler(res){
   return res.status(500).json({
        message: 'Internal Server Error'
    });
}

module.exports = thoughtsRouter;

