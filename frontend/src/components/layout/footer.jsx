const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">E-Learn</h3>
            <p className="text-gray-400">
              Your gateway to quality online education.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/courses" className="hover:text-white">
                  Browse Courses
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-white">
                  My Dashboard
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">support@elearn.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2024 E-Learn Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
