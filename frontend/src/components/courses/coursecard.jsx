import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link
      to={`/courses/${course._id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
    >
      {course.thumbnailUrl && (
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            {course.category}
          </span>
          <span className="text-xl font-bold text-gray-900">${course.price}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded text-xs ${
              course.difficulty === 'beginner'
                ? 'bg-green-100 text-green-800'
                : course.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {course.difficulty}
          </span>
          <span className="text-blue-600 text-sm">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
