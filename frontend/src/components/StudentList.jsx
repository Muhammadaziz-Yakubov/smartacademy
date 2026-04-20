import React, { useState } from 'react';
import { Plus, User, Phone, CreditCard, Trash2, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import AddStudentModal from './AddStudentModal';

const StudentList = ({ students, groups = [], onAdd, onDelete, onTogglePayment, onUpdateGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800">Barcha Talabalar</h2>
          <p className="text-xs md:text-sm text-slate-500">Jami: {students.length} nafar</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-primary-600 text-white px-5 md:px-6 py-3 md:py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-95 text-sm md:text-base"
        >
          <Plus className="w-5 h-5" />
          <span>Talaba Qo'shish</span>
        </button>
      </div>

      {students.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Talabalar topilmadi</h3>
          <p className="text-slate-500">Hali hech qanday talaba qo'shilmagan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {students.map((student) => {
            return (
              <div key={student._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-primary-50 transition-colors">
                      <User className="w-6 h-6 text-slate-400 group-hover:text-primary-600" />
                    </div>
                    <button 
                      onClick={() => onDelete(student._id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary-700 transition-colors">{student.name}</h3>
                  <div className="flex flex-col space-y-3 mb-6">
                    <div className="flex items-center text-slate-500 text-sm">
                      <Phone className="w-3.5 h-3.5 mr-2 opacity-70" />
                      {student.phone}
                    </div>
                    
                    <div className="relative">
                      <select 
                        className="w-full bg-slate-50 text-[11px] font-bold uppercase tracking-wider py-2 px-3 rounded-xl border border-transparent hover:border-slate-200 outline-none transition-all appearance-none cursor-pointer"
                        value={student.groupId || ''}
                        onChange={(e) => onUpdateGroup(student._id, e.target.value)}
                      >
                        <option value="">Guruhsiz</option>
                        {groups.map(g => (
                          <option key={g._id} value={g._id}>{g.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">To'lov Holati</span>
                    <button 
                      onClick={() => onTogglePayment(student._id)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        student.paid 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {student.paid ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{student.paid ? "To'langan" : "To'lanmagan"}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-2">
                    <span>ID: {student._id.substring(18)}</span>
                    <span>Qo'shildi: {new Date(student.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={onAdd}
        groups={groups}
      />
    </div>
  );
};

export default StudentList;
