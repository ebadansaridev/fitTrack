const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: 'g'
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fat: {
        type: Number,
        default: 0
    }
});

const nutritionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mealType: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snacks'],
        required: true
    },
    foods: [foodItemSchema],
    totalCalories: {
        type: Number,
        default: 0
    },
    totalProtein: {
        type: Number,
        default: 0
    },
    totalCarbs: {
        type: Number,
        default: 0
    },
    totalFat: {
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

// Calculate totals before saving
nutritionSchema.pre('save', function(next) {
    this.totalCalories = this.foods.reduce((sum, food) => sum + food.calories, 0);
    this.totalProtein = this.foods.reduce((sum, food) => sum + food.protein, 0);
    this.totalCarbs = this.foods.reduce((sum, food) => sum + food.carbs, 0);
    this.totalFat = this.foods.reduce((sum, food) => sum + food.fat, 0);
    next();
});

module.exports = mongoose.model('Nutrition', nutritionSchema);