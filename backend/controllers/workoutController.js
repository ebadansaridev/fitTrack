const Workout = require('../models/Workout');

// @desc    Create workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
    try {
        const workout = await Workout.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all workouts for user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;
        let query = { user: req.user._id };
        
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }
        
        if (category) query.category = category;
        
        const workouts = await Workout.find(query).sort({ date: -1 });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
const getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        
        if (workout && workout.user.toString() === req.user._id.toString()) {
            res.json(workout);
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        
        if (workout && workout.user.toString() === req.user._id.toString()) {
            Object.assign(workout, req.body);
            const updatedWorkout = await workout.save();
            res.json(updatedWorkout);
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        
        if (workout && workout.user.toString() === req.user._id.toString()) {
            await workout.deleteOne();
            res.json({ message: 'Workout removed' });
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get workout analytics
// @route   GET /api/workouts/analytics/summary
// @access  Private
const getWorkoutAnalytics = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user._id });
        
        const totalWorkouts = workouts.length;
        const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
        const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
        
        const categoryDistribution = {};
        workouts.forEach(workout => {
            categoryDistribution[workout.category] = (categoryDistribution[workout.category] || 0) + 1;
        });
        
        const recentWorkouts = workouts.slice(0, 5);
        
        res.json({
            totalWorkouts,
            totalCalories,
            totalDuration,
            categoryDistribution,
            recentWorkouts
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getWorkoutAnalytics
};