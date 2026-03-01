import React, { useState } from 'react';
import { Enrollment, Student, Course } from '../types';

// Define a strict interface for the props to avoid "any" errors
interface EnrollmentListProps {
  enrollments: Enrollment[];
  students: Student[];
  courses: Course[];
  onAddEnrollment: (data: { student: number; course: number }) => Promise<void>;
  onDeleteEnrollment: (id: number) => Promise<void>;
}

export const EnrollmentList: React.FC<EnrollmentListProps> = ({ 
  enrollments, 
  students, 
  courses, 
  onAddEnrollment, 
  onDeleteEnrollment 
}) => {
  const [s, setS] = useState('');
  const [c, setC] = useState('');

  const handleEnroll = async () => {
    // Validation: Ensure both student and course are selected
    if (!s || !c) {
      alert("Please select both a student and a course.");
      return;
    }
    
    // Convert strings from select values to numbers for the API
    await onAddEnrollment({ student: Number(s), course: Number(c) });
    
    // Reset selection after success
    setS(''); 
    setC('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Enrollment Records</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
          {enrollments.length} Records
        </span>
      </div>

      <div className="p-6 bg-blue-50/30 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase px-1">Student</label>
          <select 
            className="border border-gray-300 p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" 
            value={s} 
            onChange={e => setS(e.target.value)}
          >
            <option value="">Select Student</option>
            {students.map(std => (
              <option key={std.student_id} value={std.student_id}>
                {std.first_name} {std.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-gray-500 uppercase px-1">Course</label>
          <select 
            className="border border-gray-300 p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500" 
            value={c} 
            onChange={e => setC(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map(crs => (
              <option key={crs.course_id} value={crs.course_id}>
                {crs.course_name}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleEnroll} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all h-[42px]"
        >
          Enroll Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 font-semibold">Student ID</th>
              <th className="p-4 font-semibold">Course ID</th>
              <th className="p-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enrollments.map(e => (
              <tr key={e.enrollment_id} className="hover:bg-red-50/50 transition-colors">
                <td className="p-4 text-gray-700 font-mono text-sm">#{e.student}</td>
                <td className="p-4 text-gray-700 font-mono text-sm">#{e.course}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => onDeleteEnrollment(e.enrollment_id)} 
                    className="text-red-500 hover:text-red-700 font-bold underline text-sm"
                  >
                    Unenroll
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentList;