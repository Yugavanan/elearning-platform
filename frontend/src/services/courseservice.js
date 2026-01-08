import API from "./api";

export const getCourses = (params) =>
  API.get("/courses", { params });

export const getCourseById = (id) =>
  API.get(`/courses/${id}`);

export const enrollCourse = (courseId) =>
  API.post("/enrollments", { courseId });
