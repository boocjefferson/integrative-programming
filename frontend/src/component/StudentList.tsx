import React, { useState } from 'react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, 'student_id'>) => Promise<void>;
  onUpdateStudent: (id: number, data: Partial<Student>) => Promise<void>;
  onDeleteStudent: (id: number) => Promise<void>;
}

export const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  onAddStudent, 
  onUpdateStudent, 
  onDeleteStudent 
}) => {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', age: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.age) {
      alert("Please fill in all fields");
      return;
    }
    const studentData = { ...form, age: Number(form.age) };
    if (editingId !== null) {
      await onUpdateStudent(editingId, studentData);
      setEditingId(null);
    } else {
      await onAddStudent(studentData);
    }
    setForm({ first_name: '', last_name: '', email: '', age: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Student' : 'Add New Student'}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">First Name</label>
          <input className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} placeholder="First Name" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Last Name</label>
          <input className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} placeholder="Last Name" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
          <input className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 uppercase">Age</label>
          <input className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="Age" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className={`flex-1 py-2 px-4 rounded-lg font-bold text-white shadow-sm transition-all ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
            {editingId ? 'Save' : 'Add'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({first_name:'', last_name:'', email:'', age:''}); }} className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
              <th className="p-4 font-semibold">First Name</th>
              <th className="p-4 font-semibold">Last Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Age</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => (
              <tr key={s.student_id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 text-gray-700">{s.first_name}</td>
                <td className="p-4 text-gray-700">{s.last_name}</td>
                <td className="p-4 text-gray-500 text-sm">{s.email}</td>
                <td className="p-4 text-gray-700">{s.age}</td>
                <td className="p-4 text-center space-x-3">
                  <button onClick={() => { setEditingId(s.student_id); setForm({ first_name: s.first_name, last_name: s.last_name, email: s.email, age: String(s.age) }); }} className="text-blue-600 hover:text-blue-800 font-bold text-sm underline">Edit</button>
                  <button onClick={() => onDeleteStudent(s.student_id)} className="text-red-500 hover:text-red-700 font-bold text-sm underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;