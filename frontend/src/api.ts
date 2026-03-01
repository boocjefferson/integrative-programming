import axios from "axios";
import { Student, Teacher, Course, Enrollment } from "./types";

const apiStudents = axios.create({ baseURL: "http://localhost:8000/students/" });
const apiTeachers = axios.create({ baseURL: "http://localhost:8000/teachers/" });
const apiCourses = axios.create({ baseURL: "http://localhost:8000/courses/" });
const apiEnrollments = axios.create({ baseURL: "http://localhost:8000/enrollments/" });

// Students
export const getStudents = async (): Promise<Student[]> => (await apiStudents.get('')).data;
export const createStudent = async (data: Omit<Student, 'student_id'>) => (await apiStudents.post('', data)).data;
export const updateStudent = async (id: number, data: Partial<Student>) => (await apiStudents.put(`${id}/`, data)).data;
export const deleteStudent = async (id: number) => await apiStudents.delete(`${id}/`);

// Teachers
export const getTeachers = async (): Promise<Teacher[]> => (await apiTeachers.get('')).data;
export const createTeacher = async (data: Omit<Teacher, 'teacher_id'>) => (await apiTeachers.post('', data)).data;
export const updateTeacher = async (id: number, data: Partial<Teacher>) => (await apiTeachers.put(`${id}/`, data)).data;
export const deleteTeacher = async (id: number) => await apiTeachers.delete(`${id}/`);

// Courses
export const getCourses = async (): Promise<Course[]> => (await apiCourses.get('')).data;
export const createCourse = async (data: Omit<Course, 'course_id'>) => (await apiCourses.post('', data)).data;
export const updateCourse = async (id: number, data: Partial<Course>) => (await apiCourses.put(`${id}/`, data)).data;
export const deleteCourse = async (id: number) => await apiCourses.delete(`${id}/`);

// Enrollments
export const getEnrollments = async (): Promise<Enrollment[]> => (await apiEnrollments.get('')).data;
export const createEnrollment = async (data: { student: number; course: number }) => (await apiEnrollments.post('', data)).data;
export const deleteEnrollment = async (id: number) => await apiEnrollments.delete(`${id}/`);