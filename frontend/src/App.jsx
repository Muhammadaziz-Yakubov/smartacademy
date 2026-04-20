import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar, LayoutDashboard, Plus, Search, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import StudentList from './components/StudentList';
import AttendanceList from './components/AttendanceList';
import GroupList from './components/GroupList';

// Configure Axios
const api = axios.create({
  baseURL: 'https://smartacademy.onrender.com/api'
});

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentRes, groupRes] = await Promise.all([
        api.get('/students'),
        api.get('/groups')
      ]);
      setStudents(studentRes.data);
      setGroups(groupRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Maʼlumotlarni yuklab boʻlmadi. Server ishlayaptimi?');
      setLoading(false);
      toast.error('Maʼlumotlarni yuklashda xatolik');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addStudent = async (studentData) => {
    try {
      const res = await api.post('/students', studentData);
      setStudents([res.data, ...students]);
      toast.success("Talaba muvaffaqiyatli qo'shildi");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi");
      return false;
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Haqiqatan ham ushbu talabani oʻchirib tashlamoqchimisiz?')) return;
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter(s => s._id !== id));
      toast.success("Talaba o'chirildi");
    } catch (err) {
      console.error(err);
      toast.error("O'chirishda xatolik");
    }
  };

  const addGroup = async (groupData) => {
    try {
      const res = await api.post('/groups', groupData);
      setGroups([res.data, ...groups]);
      toast.success("Guruh yaratildi");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi");
      return false;
    }
  };

  const deleteGroup = async (id) => {
    if (!window.confirm('Ushbu guruhni oʻchirib tashlamoqchimisiz?')) return;
    try {
      await api.delete(`/groups/${id}`);
      setGroups(groups.filter(g => g._id !== id));
      // Re-fetch students as their group assignment might have changed (reset to null)
      const res = await api.get('/students');
      setStudents(res.data);
      toast.success("Guruh o'chirildi");
    } catch (err) {
      console.error(err);
      toast.error("O'chirishda xatolik");
    }
  };

  const togglePayment = async (id) => {
    try {
      const res = await api.put(`/students/${id}/payment`);
      setStudents(students.map(s => s._id === id ? res.data : s));
      toast.success("To'lov holati yangilandi");
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi");
    }
  };

  const markAttendance = async (id, status) => {
    try {
      const res = await api.put(`/students/${id}/attendance`, { status });
      setStudents(students.map(s => s._id === id ? res.data : s));
      toast.success(status === 'bor' ? "Bor deb belgilandi" : "Yo'q deb belgilandi");
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi");
    }
  };

  const updateStudentGroup = async (id, groupId) => {
    try {
      const res = await api.put(`/students/${id}/group`, { groupId });
      setStudents(students.map(s => s._id === id ? res.data : s));
      toast.success("Guruh yangilandi");
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi");
    }
  };

  const getFilteredData = () => {
    if (activeTab === 'groups') return groups;
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.phone.includes(searchTerm)
    );
  };

  const filteredData = getFilteredData();

  const getPageTitle = () => {
    switch(activeTab) {
      case 'students': return 'Talabalar';
      case 'groups': return 'Guruhlar';
      case 'attendance': return 'Davomat';
      default: return 'Smart Academy';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{getPageTitle()}</h1>
            <p className="text-sm text-slate-500">Smart Academy CRM System</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Qidiruv..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 w-64 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="p-8 pb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-slate-500">Yuklanmoqda...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
              <XCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-semibold">{error}</p>
              <button 
                onClick={fetchData}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-medium"
              >
                Qayta urinish
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'students' && (
                <StudentList 
                  students={filteredData} 
                  groups={groups}
                  onAdd={addStudent} 
                  onDelete={deleteStudent}
                  onTogglePayment={togglePayment}
                  onUpdateGroup={updateStudentGroup}
                />
              )}
              {activeTab === 'groups' && (
                <GroupList 
                  groups={groups}
                  onAdd={addGroup}
                  onDelete={deleteGroup}
                />
              )}
              {activeTab === 'attendance' && (
                <AttendanceList 
                  students={filteredData} 
                  groups={groups}
                  onAttendance={markAttendance}
                />
              )}
            </>
          )}
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
