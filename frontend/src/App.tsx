import React, { useEffect, useState } from 'react';
import { Student, Teacher, Course, Enrollment } from './types';
import * as api from './api';

// Import your components from the component folder
import StudentList from './component/StudentList';
import TeacherList from './component/TeacherList';
import CourseList from './component/CourseList';
import EnrollmentList from './component/EnrollmentList';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  
  // State to manage which section is visible
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'courses' | 'enrollments'>('students');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const [s, t, c, e] = await Promise.all([
        api.getStudents(),
        api.getTeachers(),
        api.getCourses(),
        api.getEnrollments()
      ]);
      setStudents(s);
      setTeachers(t);
      setCourses(c);
      setEnrollments(e);
    } catch (err) {
      console.error("Error loading data. Check Django server or CORS.", err);
    }
  };

  // Handlers (Stay the same)
  const handleAddStudent = async (data: Omit<Student, 'student_id'>) => { await api.createStudent(data); refreshData(); };
  const handleUpdateStudent = async (id: number, data: Partial<Student>) => { await api.updateStudent(id, data); refreshData(); };
  const handleDeleteStudent = async (id: number) => { await api.deleteStudent(id); refreshData(); };

  const handleAddTeacher = async (data: Omit<Teacher, 'teacher_id'>) => { await api.createTeacher(data); refreshData(); };
  const handleUpdateTeacher = async (id: number, data: Partial<Teacher>) => { await api.updateTeacher(id, data); refreshData(); };
  const handleDeleteTeacher = async (id: number) => { await api.deleteTeacher(id); refreshData(); };

  const handleAddCourse = async (data: Omit<Course, 'course_id'>) => { await api.createCourse(data); refreshData(); };
  const handleUpdateCourse = async (id: number, data: Partial<Course>) => { await api.updateCourse(id, data); refreshData(); };
  const handleDeleteCourse = async (id: number) => { await api.deleteCourse(id); refreshData(); };

  const handleAddEnrollment = async (data: { student: number, course: number }) => { await api.createEnrollment(data); refreshData(); };
  const handleDeleteEnrollment = async (id: number) => { await api.deleteEnrollment(id); refreshData(); };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* 1. Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full shadow-xl">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-black tracking-tight text-blue-400 uppercase">
            JEFF University
          </h1>
          <p className="text-[10px] text-slate-400 font-bold mt-1">Enrollment System</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {[
            { id: 'students', label: 'Students', icon: '👤' },
            { id: 'teachers', label: 'Teachers', icon: '👨‍🏫' },
            { id: 'courses', label: 'Courses', icon: '📚' },
            { id: 'enrollments', label: 'Enrollments', icon: '📝' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 italic">Connected to Django API</p>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Dashboard Top Bar */}
          <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800 capitalize">
                {activeTab} 
              </h2>
              <p className="text-slate-500 text-sm">Organize and modify university {activeTab} data.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-100 px-4 py-2 rounded-lg text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400">Total Entries</p>
                <p className="text-lg font-black text-blue-600">
                  {activeTab === 'students' && students.length}
                  {activeTab === 'teachers' && teachers.length}
                  {activeTab === 'courses' && courses.length}
                  {activeTab === 'enrollments' && enrollments.length}
                </p>
              </div>
            </div>
          </header>

          {/* 3. Dynamic Section Rendering */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'students' && (
              <StudentList students={students} onAddStudent={handleAddStudent} onUpdateStudent={handleUpdateStudent} onDeleteStudent={handleDeleteStudent} />
            )}
            {activeTab === 'teachers' && (
              <TeacherList teachers={teachers} onAddTeacher={handleAddTeacher} onUpdateTeacher={handleUpdateTeacher} onDeleteTeacher={handleDeleteTeacher} />
            )}
            {activeTab === 'courses' && (
              <CourseList courses={courses} teachers={teachers} onAddCourse={handleAddCourse} onUpdateCourse={handleUpdateCourse} onDeleteCourse={handleDeleteCourse} />
            )}
            {activeTab === 'enrollments' && (
              <EnrollmentList enrollments={enrollments} students={students} courses={courses} onAddEnrollment={handleAddEnrollment} onDeleteEnrollment={handleDeleteEnrollment} />
            )}
          </div>

          <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
           
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;