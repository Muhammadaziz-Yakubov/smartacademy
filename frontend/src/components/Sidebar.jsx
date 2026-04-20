import React from 'react';
import { Users, Calendar, LayoutDashboard, GraduationCap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'students', label: 'Talabalar', icon: Users },
    { id: 'groups', label: 'Guruhlar', icon: LayoutDashboard },
    { id: 'attendance', label: 'Davomat', icon: Calendar },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm">
      <div className="p-8 flex items-center space-x-3">
        <div className="bg-primary-600 p-2 rounded-xl text-white">
          <GraduationCap className="w-8 h-8" />
        </div>
        <span className="text-xl font-extrabold text-slate-800 tracking-tight">Smart Academy</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-primary-50 text-primary-600 shadow-sm border border-primary-100/50'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="font-semibold text-[15px]">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-900 rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-sm font-bold mb-1 italic">Pro Plan</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">Cheksiz talabalar va hisobotlar.</p>
            <button className="text-xs bg-white text-slate-900 px-4 py-2 rounded-xl font-bold hover:bg-slate-100 transition-all">
              Batafsil
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary-600/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
