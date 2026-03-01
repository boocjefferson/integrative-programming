import React, { useState } from 'react';
import { Teacher } from '../types';

export const TeacherList: React.FC<{ teachers: Teacher[], onAddTeacher: any, onUpdateTeacher: any, onDeleteTeacher: any }> = ({ teachers, onAddTeacher, onUpdateTeacher, onDeleteTeacher }) => {
  const [form, setForm] = useState({ teacher_name: '', email: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      await onUpdateTeacher(editingId, form);
      setEditingId(null);
    } else {
      await onAddTeacher(form);
    }
    setForm({ teacher_name: '', email: '' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-bold text-gray-800">{editingId ? 'Edit Teacher' : 'Add Teacher'}</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <input className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Name" value={form.teacher_name} onChange={e => setForm({...form, teacher_name: e.target.value})} />
        <input className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <button type="submit" className={`py-2 px-4 rounded-lg font-bold text-white shadow-sm transition-all ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr><th className="p-4 font-semibold">Name</th><th className="p-4 font-semibold">Email</th><th className="p-4 font-semibold text-center">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {teachers.map(t => (
            <tr key={t.teacher_id} className="hover:bg-blue-50/50 transition-colors">
              <td className="p-4 text-gray-800 font-medium">{t.teacher_name}</td>
              <td className="p-4 text-gray-500 text-sm">{t.email}</td>
              <td className="p-4 text-center space-x-4">
                <button onClick={() => { setEditingId(t.teacher_id); setForm({ teacher_name: t.teacher_name, email: t.email }); }} className="text-blue-600 hover:text-blue-800 font-bold underline">Edit</button>
                <button onClick={() => onDeleteTeacher(t.teacher_id)} className="text-red-500 hover:text-red-700 font-bold underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TeacherList;