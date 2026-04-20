import React from 'react';
import { Users, LayoutDashboard, CreditCard, CheckCircle, GraduationCap, TrendingUp, UserCheck, UserX } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} text-white transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
          <TrendingUp className="w-3 h-3 mr-1" />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
  </div>
);

const Dashboard = ({ students, groups }) => {
  const totalStudents = students.length;
  const totalGroups = groups.length;
  
  // Real data from s.paid (instead of s.isPaid)
  const paidStudents = students.filter(s => s.paid).length;
  const unpaidStudents = totalStudents - paidStudents;
  const paymentPercentage = totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0;

  // Calculate real today's attendance
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const presentToday = students.filter(student => {
    return student.attendance && student.attendance.some(record => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime() && record.status === 'bor';
    });
  }).length;
  
  // Calculate active group (group with most students)
  const groupCounts = students.reduce((acc, s) => {
    if (s.groupId) {
      acc[s.groupId] = (acc[s.groupId] || 0) + 1;
    }
    return acc;
  }, {});
  const topGroupId = Object.entries(groupCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topGroupName = groups.find(g => g._id === topGroupId)?.name || 'Hozircha yo\'q';

  // Calculate new students this month
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const newStudentsThisMonth = students.filter(s => {
    const createdAt = new Date(s.createdAt);
    return createdAt.getMonth() === thisMonth && createdAt.getFullYear() === thisYear;
  }).length;

  return (
    <div className="space-y-4 md:space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard 
          title="Talabalar" 
          value={totalStudents} 
          icon={Users} 
          color="bg-blue-600"
          trend="+12%"
        />
        <StatCard 
          title="Guruhlar" 
          value={totalGroups} 
          icon={LayoutDashboard} 
          color="bg-purple-600"
        />
        <StatCard 
          title="To'lovlar" 
          value={paidStudents} 
          icon={CheckCircle} 
          color="bg-emerald-600"
          trend={`${paymentPercentage}%`}
        />
        <StatCard 
          title="Qarzdorlar" 
          value={unpaidStudents} 
          icon={CreditCard} 
          color="bg-rose-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Chart/Status Area */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
              Akademiya Faoliyati
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs md:text-sm font-semibold text-slate-600">To'lovlar foizi</span>
                    <span className="text-xl md:text-2xl font-bold text-slate-800">{paymentPercentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${paymentPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-400">Oylik to'lovlar rejasi bo'yicha ko'rsatkich</p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100">
                    <div className="text-slate-500 text-[10px] md:text-xs mb-1">Eng faol guruh</div>
                    <div className="font-bold text-slate-800 text-sm md:text-base truncate">{topGroupName}</div>
                  </div>
                  <div className="bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100">
                    <div className="text-slate-500 text-[10px] md:text-xs mb-1">Yangi talabalar</div>
                    <div className="font-bold text-slate-800 text-sm md:text-base">+{newStudentsThisMonth} bu oy</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-6 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-2xl md:rounded-3xl text-white shadow-xl shadow-primary-200">
                <div className="text-center">
                  <GraduationCap className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-base md:text-lg font-bold mb-1">Muvaffaqiyatli darslar</h3>
                  <p className="text-primary-100 text-xs md:text-sm opacity-80 mb-4 px-2">Talabalar o'zlashtirish ko'rsatkichi oshmoqda!</p>
                  <button className="bg-white text-primary-600 px-5 md:px-6 py-2 rounded-xl font-bold text-xs md:text-sm hover:bg-slate-100 transition-all">
                    Hisobotni ko'rish
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-50 rounded-full opacity-50 blur-3xl"></div>
        </div>

        {/* Today's Stats */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[32px] border border-slate-200 shadow-sm">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-6 uppercase tracking-wider text-xs md:text-base opacity-50">Bugungi Davomat</h2>
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center p-3 md:p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="bg-emerald-500 p-2 rounded-xl text-white mr-4 shadow-lg shadow-emerald-100">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Kelganlar</div>
                <div className="text-lg md:text-xl font-black text-emerald-900">{presentToday} talaba</div>
              </div>
            </div>

            <div className="flex items-center p-3 md:p-4 bg-rose-50 rounded-2xl border border-rose-100">
              <div className="bg-rose-500 p-2 rounded-xl text-white mr-4 shadow-lg shadow-rose-100">
                <UserX className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-rose-600 font-bold uppercase tracking-wider">Kelmaganlar</div>
                <div className="text-lg md:text-xl font-black text-rose-900">{totalStudents - presentToday} talaba</div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-400 mb-3">So'nggi bir necha kunlik faollik</div>
              <div className="flex items-end justify-between h-20 gap-2">
                {[45, 60, 55, 80, 70, 90, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-500 ${i === 6 ? 'bg-primary-500 shadow-lg shadow-primary-100' : 'bg-slate-300 group-hover:bg-primary-400'}`} 
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>Du</span><span>Se</span><span>Ch</span><span>Pa</span><span>Ju</span><span>Sha</span><span>Yak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
