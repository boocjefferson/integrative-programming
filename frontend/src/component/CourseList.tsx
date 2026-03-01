import React, { useState } from 'react';
import { Course, Teacher } from '../types';

export const CourseList: React.FC<{ courses: Course[], teachers: Teacher[], onAddCourse: any, onUpdateCourse: any, onDeleteCourse: any }> = ({ courses, teachers, onAddCourse, onUpdateCourse, onDeleteCourse }) => {
  const [form, setForm] = useState({ course_name: '', units: '', teacher: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { course_name: form.course_name, units: Number(form.units), teacher: Number(form.teacher) };
    if (editingId !== null) {
      await onUpdateCourse(editingId, data);
      setEditingId(null);
    } else {
      await onAddCourse(data);
    }
    setForm({ course_name: '', units: '', teacher: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Course' : 'Add New Course'}</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <input className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={form.course_name} onChange={e => setForm({...form, course_name: e.target.value})} placeholder="Course Name" />
        <input className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="number" value={form.units} onChange={e => setForm({...form, units: e.target.value})} placeholder="Units" />
        <select className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={form.teacher} onChange={e => setForm({...form, teacher: e.target.value})}>
          <option value="">Select Teacher</option>
          {teachers.map(t => <option key={t.teacher_id} value={t.teacher_id}>{t.teacher_name}</option>)}
        </select>
        <button type="submit" className={`py-2 px-4 rounded-lg font-bold text-white shadow-sm transition-all ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr><th className="p-4 font-semibold">Course Name</th><th className="p-4 font-semibold text-center">Units</th><th className="p-4 font-semibold">Teacher ID</th><th className="p-4 font-semibold text-center">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {courses.map(c => (
            <tr key={c.course_id} className="hover:bg-indigo-50/50 transition-colors">
              <td className="p-4 font-medium text-gray-800">{c.course_name}</td>
              <td className="p-4 text-center"><span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">{c.units} Units</span></td>
              <td className="p-4 text-gray-500 text-sm font-mono">ID: {c.teacher}</td>
              <td className="p-4 text-center space-x-3">
                <button onClick={() => { setEditingId(c.course_id); setForm({ course_name: c.course_name, units: String(c.units), teacher: String(c.teacher) }); }} className="text-indigo-600 hover:text-indigo-800 font-bold underline">Edit</button>
                <button onClick={() => onDeleteCourse(c.course_id)} className="text-red-500 hover:text-red-700 font-bold underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CourseList;