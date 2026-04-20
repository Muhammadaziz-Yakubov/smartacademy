import React, { useState } from 'react';
import { Plus, Users, User, Clock, Calendar, Trash2, X } from 'lucide-react';

const GroupList = ({ groups, onAdd, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [time, setTime] = useState('');
  const [days, setDays] = useState([]);

  const dayOptions = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !teacher || !time) return;
    
    const success = await onAdd({ name, teacher, time, days });
    if (success) {
      setName('');
      setTeacher('');
      setTime('');
      setDays([]);
      setIsModalOpen(false);
    }
  };

  const toggleDay = (day) => {
    if (days.includes(day)) {
      setDays(days.filter(d => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800">Guruhlar</h2>
          <p className="text-xs md:text-sm text-slate-500">Jami: {groups.length} ta guruh</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-primary-600 text-white px-5 md:px-6 py-3 md:py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-700 transition-all shadow-lg active:scale-95 text-sm md:text-base"
        >
          <Plus className="w-5 h-5" />
          <span>Guruh Qo'shish</span>
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">Guruhlar topilmadi</h3>
          <p className="text-slate-500">Hali hech qanday guruh yaratilmagan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-50 p-3 rounded-2xl">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <button onClick={() => onDelete(group._id)} className="p-2 text-slate-300 hover:text-red-500 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2">{group.name}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-500">
                  <User className="w-4 h-4 mr-2 opacity-70" />
                  <span>Ustoz: {group.teacher}</span>
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <Clock className="w-4 h-4 mr-2 opacity-70" />
                  <span>Vaqt: {group.time}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {group.days.map(day => (
                    <span key={day} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-tighter">
                      {day}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400">
                <span>Yaratildi: {new Date(group.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Group Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Yangi Guruh</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Guruh nomi</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Frontend Foundation"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">O'qituvchi</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  placeholder="Ism sharifi"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Dars vaqti</label>
                <input 
                  type="text" 
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Masalan: 14:00 - 16:00"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Kunlar</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dayOptions.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        days.includes(day) 
                          ? 'bg-primary-600 text-white border-primary-600' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-primary-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 mt-4">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
