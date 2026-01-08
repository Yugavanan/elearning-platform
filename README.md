# E-Learning Platform

A full-stack e-learning platform built with React, Node.js, Express, and MongoDB. This project demonstrates modern web development practices including user authentication, course management, enrollment tracking, and admin controls.

## 🚀 Features

### Public Features
- **Landing Page**: Marketing-focused homepage with course highlights
- **Course Browsing**: Browse all available courses with filtering options
- **Course Details**: View course information, syllabus, and instructor details
- **Search & Filters**: Filter courses by category, difficulty, and search terms

### User Features
- **Authentication**: Secure signup and login with JWT
- **User Dashboard**: View enrolled courses and track progress
- **Course Enrollment**: Enroll in courses with one click
- **Progress Tracking**: Mark lessons as complete and track learning progress
- **Lesson Viewer**: View course lessons with content and optional video

### Admin Features
- **Course Management**: Create, edit, and delete courses
- **User Management**: View all registered users
- **Analytics Dashboard**: View platform metrics and enrollment statistics
- **Content Management**: Add lessons with HTML content and video URLs

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Database
- **MongoDB Atlas** (cloud database)

## 📁 Project Structure

```
elearning-platform/
├── backend/
│   ├── models/          # MongoDB models (User, Course, Enrollment)
│   ├── routes/          # API routes (auth, courses, enrollments, admin)
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context (Auth)
│   │   └── App.jsx      # Main app component
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The backend API will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:5000):
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Courses
- `GET /api/courses` - Get all courses (with optional filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Enrollments
- `POST /api/enrollments` - Enroll in a course (protected)
- `GET /api/enrollments/me` - Get user's enrollments (protected)
- `PUT /api/enrollments/:id/progress` - Update lesson progress (protected)
- `GET /api/enrollments/:id` - Get single enrollment (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/reports` - Get platform metrics (admin only)

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variable: `VITE_API_URL` to your backend URL
4. Deploy

### Backend (Render/Heroku)
1. Push your code to GitHub
2. Create a new web service on Render/Heroku
3. Connect your repository
4. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT` (usually auto-set)
5. Deploy

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Whitelist your deployment server IPs
3. Get connection string and add to backend `.env`

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Role-based access control (admin/user)
- Input validation on both client and server
- Environment variables for sensitive data

## 📊 Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: 'user' | 'admin',
  createdAt: Date
}
```

### Course
```javascript
{
  title: String,
  slug: String (unique),
  description: String,
  price: Number,
  category: String,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  thumbnailUrl: String,
  lessons: [{
    title: String,
    contentHtml: String,
    videoUrl: String (optional),
    order: Number
  }],
  createdAt: Date
}
```

### Enrollment
```javascript
{
  userId: ObjectId (ref: User),
  courseId: ObjectId (ref: Course),
  progress: Map<lessonId, Boolean>,
  enrolledAt: Date
}
```

## 🎯 Usage Guide

### Creating an Admin User
To create an admin user, you can either:
1. Manually update the user in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

2. Or modify the signup route temporarily to set the first user as admin.

### Adding Courses
1. Log in as an admin user
2. Navigate to the Admin Panel
3. Click "Add New Course"
4. Fill in course details and add lessons
5. Save the course

### Enrolling in Courses
1. Browse courses on the Courses page
2. Click on a course to view details
3. Click "Enroll Now" (login required if not authenticated)
4. Access enrolled courses from your Dashboard

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify all environment variables are set

### Frontend can't connect to backend
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running on the correct port
- Check CORS settings in backend

### Authentication issues
- Verify JWT_SECRET is set in backend `.env`
- Check token expiration settings
- Clear localStorage and try logging in again

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built as a portfolio project demonstrating full-stack development skills.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Tailwind CSS for the utility-first CSS framework
