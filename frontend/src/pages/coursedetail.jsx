import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EnrollmentButton from '../components/courses/EnrollmentButton';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchCourse();
    if (isAuthenticated) {
      checkEnrollment();
    }
  }, [id, isAuthenticated]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await axios.get(`${API_URL}/enrollments/me`);
      const enrollments = response.data;
      const isEnrolled = enrollments.some(
        (enrollment) => enrollment.courseId._id === id
      );
      setEnrolled(isEnrolled);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${API_URL}/enrollments`, { courseId: id });
      setEnrolled(true);
      alert('Successfully enrolled in course!');
    } catch (error) {
      alert(
        error.response?.data?.message || 'Failed to enroll in course'
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Course not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {course.thumbnailUrl && (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
              <div className="flex space-x-4 text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                  {course.category}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
                  {course.difficulty}
                </span>
                <span className="text-xl font-semibold text-gray-900">
                  ${course.price}
                </span>
              </div>
            </div>
            {!enrolled && (
              <EnrollmentButton
                onEnroll={handleEnroll}
                isAuthenticated={isAuthenticated}
              />
            )}
            {enrolled && (
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Go to Dashboard
              </button>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-3">
              {course.lessons && course.lessons.length > 0 ? (
                course.lessons
                  .sort((a, b) => a.order - b.order)
                  .map((lesson, index) => (
                    <div
                      key={lesson._id || index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            Lesson {index + 1}: {lesson.title}
                          </h3>
                        </div>
                        {enrolled && (
                          <span className="text-sm text-blue-600">
                            View Lesson →
                          </span>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-600">No lessons available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
