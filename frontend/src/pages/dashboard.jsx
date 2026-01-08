import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import LessonPlayer from '../components/courses/LessonPlayer';

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(`${API_URL}/enrollments/me`);
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (enrollmentId, lessonId, completed) => {
    try {
      await axios.put(`${API_URL}/enrollments/${enrollmentId}/progress`, {
        lessonId,
        completed,
      });
      fetchEnrollments();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const calculateProgress = (enrollment) => {
    if (!enrollment.courseId?.lessons || enrollment.courseId.lessons.length === 0) {
      return 0;
    }
    const totalLessons = enrollment.courseId.lessons.length;
    const progressObj = enrollment.progress || {};
    const completedLessons = Object.values(progressObj).filter((v) => v === true).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (selectedCourse && selectedLesson) {
    return (
      <LessonPlayer
        course={selectedCourse}
        lesson={selectedLesson}
        enrollment={enrollments.find(
          (e) => e.courseId._id === selectedCourse._id
        )}
        onBack={() => {
          setSelectedLesson(null);
          setSelectedCourse(null);
        }}
        onProgressUpdate={updateProgress}
      />
    );
  }

  if (selectedCourse) {
    const enrollment = enrollments.find(
      (e) => e.courseId._id === selectedCourse._id
    );
    const sortedLessons = [...(selectedCourse.lessons || [])].sort(
      (a, b) => a.order - b.order
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => setSelectedCourse(null)}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold mb-6">{selectedCourse.title}</h1>
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${calculateProgress(enrollment)}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {calculateProgress(enrollment)}% Complete
          </p>
        </div>
        <div className="space-y-3">
          {sortedLessons.map((lesson, index) => {
            const progressObj = enrollment?.progress || {};
            const isCompleted = progressObj[lesson._id?.toString() || index.toString()] || false;
            return (
              <div
                key={lesson._id || index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500">Lesson {index + 1}</span>
                    <h3 className="font-semibold">{lesson.title}</h3>
                    {isCompleted && (
                      <span className="text-green-600 text-sm">✓ Completed</span>
                    )}
                  </div>
                  <span className="text-blue-600">View →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name}!
      </h1>
      {enrollments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            You haven't enrolled in any courses yet.
          </p>
          <Link
            to="/courses"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => {
            const course = enrollment.courseId;
            const progress = calculateProgress(enrollment);
            return (
              <div
                key={enrollment._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                {course.thumbnailUrl && (
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900 font-semibold">
                        {progress}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Continue Learning
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
