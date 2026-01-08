import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contentHtml: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    default: null,
  },
  order: {
    type: Number,
    required: true,
  },
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative'],
    default: 0,
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Course difficulty is required'],
  },
  thumbnailUrl: {
    type: String,
    default: null,
  },
  lessons: [lessonSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate slug from title before saving
courseSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.model('Course', courseSchema);
