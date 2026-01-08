import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  progress: {
    type: Map,
    of: Boolean,
    default: new Map(),
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure one enrollment per user per course
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Convert Map to plain object in JSON
enrollmentSchema.methods.toJSON = function () {
  const obj = this.toObject();
  if (obj.progress instanceof Map) {
    obj.progress = Object.fromEntries(obj.progress);
  }
  return obj;
};

export default mongoose.model('Enrollment', enrollmentSchema);
