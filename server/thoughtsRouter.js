import express from 'express';
import Thought from './models/thought';
import User from './models/user';


const jsonParser = require('body-parser').json();
const thoughtsRouter = express.Router();
thoughtsRouter.use(jsonParser);

thoughtsRouter.get('/', function(req, res) {
    Thought.find({}, function(err, thoughts) {
        if (err) return errorHandler(res);
        return res.json(thoughts);
    });
});

thoughtsRouter.get('/thought/:thoughtId', function(req, res) {
    Thought.findOne({
        _id: req.params.thoughtId
    }, function(err, thought) {
        if (err) return errorHandler(err);
            return res.json(thought);
        });
    
});

thoughtsRouter.get('/:from', function(req, res) {
    User.findOne({
        username: req.params.from
    }, function(err, user) {
        if (err) return errorHandler(err);
        Thought.find({
            from: user._id
        }, function(err, thoughts) {
            if (err) return errorHandler(res);
            return res.json(thoughts);
        });
    });
});

thoughtsRouter.post('/', function(req, res) {
    let thought = req.body.thought;
    let from = req.body.from;
    let stars = req.body.stars;

    if (!req.body) {
        return res.status(404).json({
            message: "No request body "
        });
    }

    if (!req.body.thought) {
        return res.status(422).json({
            message: 'Missing field: thought'
        });
    }

    if (typeof thought !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: thought"
        });
    }

    thought = thought.trim();

    if (thought === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }

    if (!req.body.from) {
        return res.status(404).json({
            message: "Missing field: from "
        });
    }

    if (typeof from !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: from"
        });
    }

    from = from.trim();

    if (from === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }
    User.findOne({
        username: from
    }, function(err, user) {
        if (err) return errorHandler(err);
        var newThought = new Thought({
            thought: thought,
            from: user._id,
            stars: stars
        })
        newThought.save({new:true},function(err, thought) {
            if (err) return errorHandler(res);
            return res.status(201).json(thought);
        });
    });
});

thoughtsRouter.put('/:thoughtId', function(req, res) {
    let thought = req.body.thought;
    let from = req.body.from;
    let thoughtId = req.params.thoughtId;
    let stars = req.body.stars;
    
    
    if (!req.body) {
        return res.status(404).json({
            message: "No request body "
        });
    }

    if (!thought) {
        return res.status(422).json({
            message: 'Missing field: thought'
        });
    }

    if (typeof thought !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: thought"
        });
    }

    thought = thought.trim();

    if (thought === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }

    if (!thoughtId) {
        return res.status(404).json({
            message: "Missing field: from "
        });
    }

    if (typeof from !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: from"
        });
    }

    thoughtId = thoughtId.trim();

    if (thoughtId === '') {
        return res.status(422).json({
            message: "Incorrect field length"
        });
    }
    
        
    Thought.findByIdAndUpdate(thoughtId, {
        thought: thought,
        from: from,
        stars:stars
    }, 
    function(err, thoughts) {
        if (err) return errorHandler(res);
        return res.json({});
    });

});

thoughtsRouter.delete('/:thoughtId', function(req, res) {
    Thought.findByIdAndRemove(req.params.thoughtId, function(err, thoughts) {
        if (err) return errorHandler(res);
        return res.json({});
    });
});


function errorHandler(res) {
    return res.status(500).json({
        message: 'Internal Server Error'
    });
}

export default thoughtsRouter;
