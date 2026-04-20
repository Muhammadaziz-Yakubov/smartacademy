import React, { useState } from 'react';
import { LogIn, LogOut, History, Clock, User, Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';

const AttendanceList = ({ students, groups = [], onAttendance }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const getTodayRecord = (attendance) => {
    if (!attendance) return null;
    const today = new Date().toDateString();
    return attendance.find(a => new Date(a.date).toDateString() === today);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredStudents = selectedGroupId 
    ? students.filter(s => s.groupId === selectedGroupId)
    : students;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4 flex-1">
          <div className="bg-primary-50 p-3 rounded-2xl">
            <CalendarIcon className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Sana: {new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })}</h2>
            <p className="text-sm text-slate-500">Bugungi davomatni belgilang</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <label className="text-sm font-bold text-slate-500 whitespace-nowrap">Guruh:</label>
          <select 
            className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500 w-48"
            value={selectedGroupId}
            onChange={(e) => setSelectedGroupId(e.target.value)}
          >
            <option value="">Barcha guruhlar</option>
            {groups.map(g => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Talaba</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Bugungi Holat</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-8 py-10 text-center text-slate-400 italic">
                  Bu guruhda talabalar topilmadi
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const todayRecord = getTodayRecord(student.attendance);
                const isExpanded = expandedId === student._id;

                return (
                  <React.Fragment key={student._id}>
                    <tr className={`hover:bg-slate-50/50 transition-colors group ${isExpanded ? 'bg-slate-50/80' : ''}`}>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-700">{student.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-slate-400">{student.phone}</p>
                              {groups.find(g => g._id === student.groupId) && (
                                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                  {groups.find(g => g._id === student.groupId).name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {!todayRecord ? (
                          <span className="text-xs font-bold text-slate-300 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">Belgilanmagan</span>
                        ) : (
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                            todayRecord.status === 'bor' 
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                              : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                            {todayRecord.status === 'bor' ? 'Bor' : "Yo'qlama"}
                          </span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onAttendance(student._id, 'bor');
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              todayRecord?.status === 'bor' 
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                                : 'bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                            }`}
                          >
                            Bor
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onAttendance(student._id, "yo'q");
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                              todayRecord?.status === "yo'q"
                                ? 'bg-red-600 text-white shadow-lg shadow-red-200' 
                                : 'bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 border border-slate-200'
                            }`}
                          >
                            Yo'q
                          </button>
                          <button 
                            type="button"
                            onClick={() => toggleExpand(student._id)}
                            className={`p-2.5 rounded-xl transition-all hover:bg-slate-100 ${isExpanded ? 'bg-slate-100 text-slate-800' : 'text-slate-400'}`}
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <History className="w-5 h-5" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {isExpanded && (
                      <tr className="bg-slate-50/50 border-none">
                        <td colSpan="3" className="px-8 py-6">
                          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center">
                              <History className="w-4 h-4 mr-2 text-primary-600" />
                              Davomat Tarixi
                            </h4>
                            {student.attendance.length === 0 ? (
                              <p className="text-sm text-slate-400 italic">Tarix mavjud emas</p>
                            ) : (
                              <div className="space-y-3">
                                {[...student.attendance].reverse().slice(0, 10).map((record, idx) => (
                                  <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                    <div className="flex items-center space-x-4">
                                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                        {new Date(record.date).toLocaleDateString()}
                                      </span>
                                      <span className={`text-[10px] uppercase font-bold tracking-widest ${record.status === 'bor' ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {record.status === 'bor' ? 'Bor' : "Yo'qlama"}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {record.date ? new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
