import API from "./api";

export const markLessonComplete = (courseId, lessonId) =>
  API.post("/progress/complete", { courseId, lessonId });

export const getCourseProgress = (courseId) =>
  API.get(`/progress/${courseId}`);
