import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const CourseProgressCard = ({ course }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    API.get(`/progress/${course._id}`).then((res) => {
      setProgress(res.data.percentage);
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{course.title}</h2>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-green-600 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Progress: {progress}%
      </p>

      <Link
        to={`/courses/${course._id}`}
        className="text-blue-600 font-medium"
      >
        Continue Learning →
      </Link>
    </div>
  );
};

export default CourseProgressCard;
