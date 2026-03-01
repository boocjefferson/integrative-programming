// src/types.tsx

export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}

export interface Teacher {
  teacher_id: number;
  teacher_name: string;
  email: string;
}

export interface Course {
  course_id: number;
  course_name: string;
  units: number;
  teacher: string;
}

export interface Enrollment {
  enrollment_id: number;
  student: number;
  course: number;
}

// THIS IS THE MOST IMPORTANT LINE:
// It tells TypeScript this is a module even if there is no JSX
export {};