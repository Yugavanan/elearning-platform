const EnrollmentButton = ({ onEnroll, isAuthenticated }) => {
  return (
    <button
      onClick={onEnroll}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
    >
      {isAuthenticated ? 'Enroll Now' : 'Login to Enroll'}
    </button>
  );
};

export default EnrollmentButton;
