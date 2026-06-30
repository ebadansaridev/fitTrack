const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Exercise name is required']
    },
    sets: {
        type: Number,
        required: true,
        min: 1
    },
    reps: {
        type: Number,
        required: true,
        min: 1
    },
    weight: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        default: ''
    }
});

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Workout name is required']
    },
    category: {
        type: String,
        enum: ['strength', 'cardio', 'flexibility', 'hiit', 'yoga'],
        required: true
    },
    tags: [{
        type: String
    }],
    exercises: [exerciseSchema],
    duration: {
        type: Number,
        default: 0,
        help: 'Duration in minutes'
    },
    caloriesBurned: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);