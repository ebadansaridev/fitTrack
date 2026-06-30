const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getWorkoutAnalytics
} = require('../controllers/workoutController');

router.route('/')
    .post(protect, createWorkout)
    .get(protect, getWorkouts);

router.get('/analytics/summary', protect, getWorkoutAnalytics);
router.route('/:id')
    .get(protect, getWorkoutById)
    .put(protect, updateWorkout)
    .delete(protect, deleteWorkout);

module.exports = router;