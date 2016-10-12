var mongoose = require('mongoose');

var ThoughtSchema = new mongoose.Schema({
    thought: {
        type: String,
        required: true
    },
    //this is the user who wrote the thought
    from: {
        type:String,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Thought', ThoughtSchema);