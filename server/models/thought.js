import mongoose from 'mongoose';

const ThoughtSchema = new mongoose.Schema({
    thought: {
        type: String,
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stars:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Thought', ThoughtSchema);