import express from 'express';
import { body, validationResult } from 'express-validator';
import Course from '../models/Course.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search, minPrice, maxPrice } = req.query;
    const query = {};

    if (category) {
      query.category = new RegExp(category, 'i');
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }
    if (minPrice !== undefined) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    if (maxPrice !== undefined) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private/Admin
router.post(
  '/',
  protect,
  admin,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('difficulty')
      .isIn(['beginner', 'intermediate', 'advanced'])
      .withMessage('Difficulty must be beginner, intermediate, or advanced'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, price, category, difficulty, thumbnailUrl, lessons } = req.body;

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const course = new Course({
        title,
        slug,
        description,
        price: Number(price),
        category,
        difficulty,
        thumbnailUrl: thumbnailUrl || null,
        lessons: lessons || [],
      });

      await course.save();
      res.status(201).json(course);
    } catch (error) {
      console.error('Create course error:', error);
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Course with this slug already exists' });
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private/Admin
router.put(
  '/:id',
  protect,
  admin,
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      const { title, description, price, category, difficulty, thumbnailUrl, lessons } = req.body;

      if (title) {
        course.title = title;
        // Regenerate slug if title changed
        course.slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      if (description) course.description = description;
      if (price !== undefined) course.price = Number(price);
      if (category) course.category = category;
      if (difficulty) course.difficulty = difficulty;
      if (thumbnailUrl !== undefined) course.thumbnailUrl = thumbnailUrl;
      if (lessons) course.lessons = lessons;

      await course.save();
      res.json(course);
    } catch (error) {
      console.error('Update course error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
