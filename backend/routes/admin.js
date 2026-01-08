import express from 'express';
import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect);
router.use(admin);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/admin/reports
// @desc    Get basic metrics/reports
// @access  Private/Admin
router.get('/reports', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });

    // Get enrollments by course
    const enrollmentsByCourse = await Enrollment.aggregate([
      {
        $group: {
          _id: '$courseId',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: '_id',
          foreignField: '_id',
          as: 'course',
        },
      },
      {
        $unwind: '$course',
      },
      {
        $project: {
          courseTitle: '$course.title',
          enrollmentCount: '$count',
        },
      },
      {
        $sort: { enrollmentCount: -1 },
      },
    ]);

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      adminUsers,
      enrollmentsByCourse,
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
