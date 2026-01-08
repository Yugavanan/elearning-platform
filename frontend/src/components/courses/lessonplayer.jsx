import { useState } from 'react';
import axios from 'axios';

const LessonPlayer = ({
  course,
  lesson,
  enrollment,
  onBack,
  onProgressUpdate,
}) => {
  const progressObj = enrollment?.progress || {};
  const [completed, setCompleted] = useState(
    progressObj[lesson._id?.toString() || '0'] || false
  );

  const handleToggleComplete = async () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    if (enrollment) {
      await onProgressUpdate(enrollment._id, lesson._id?.toString() || '0', newCompleted);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Course
      </button>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Course: {course.title}</h2>
        </div>
        {lesson.videoUrl && (
          <div className="mb-6">
            <iframe
              width="100%"
              height="500"
              src={lesson.videoUrl}
              title={lesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}
        <div className="prose max-w-none mb-6">
          <div
            dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
            className="text-gray-700 leading-relaxed"
          />
        </div>
        <div className="border-t pt-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleToggleComplete}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-lg font-medium">
              Mark this lesson as completed
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
