const express = require("express");
const router = express.Router();
const Progress = require("../models/progress");
const auth = require("../middleware/auth");

/**
 * POST /api/progress/complete
 * body: { courseId, lessonId }
 */
router.post("/complete", auth, async (req, res) => {
  const { courseId, lessonId } = req.body;

  try {
    let progress = await Progress.findOne({
      userId: req.user.id,
      courseId,
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        courseId,
        completedLessons: [],
      });
    }

    // already completed?
    const alreadyDone = progress.completedLessons.some(
      (l) => l.lessonId === lessonId
    );

    if (!alreadyDone) {
      progress.completedLessons.push({
        lessonId,
        completedAt: new Date(),
      });
      await progress.save();
    }

    res.json({
      message: "Lesson marked as completed",
      progress,
    });
  } catch (err) {
    res.status(500).json({ message: "Progress update failed" });
  }
});

/**
 * GET /api/progress/:courseId
 */
router.get("/:courseId", auth, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId,
    });

    res.json(progress || { completedLessons: [] });
  } catch (err) {
    res.status(500).json({ message: "Fetch progress failed" });
  }
});

module.exports = router;
