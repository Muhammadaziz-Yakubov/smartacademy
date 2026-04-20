import React from 'react';
import { Users, Calendar, LayoutDashboard, GraduationCap, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Bosh sahifa', icon: LayoutDashboard },
    { id: 'students', label: 'Talabalar', icon: Users },
    { id: 'groups', label: 'Guruhlar', icon: GraduationCap },
    { id: 'attendance', label: 'Davomat', icon: Calendar },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col h-full shadow-2xl transition-transform duration-300 transform lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-600 p-2 rounded-xl text-white">
            <GraduationCap className="w-8 h-8" />
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">Smart Academy</span>
        </div>
        <button onClick={() => setActiveTab(activeTab)} className="lg:hidden p-2 text-slate-400">
          {/* This button just helps to provide an area to click or can be a Close icon */}
        </button>
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

      <div className="p-6 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all duration-200 font-semibold text-[15px]"
        >
          <LogOut className="w-5 h-5" />
          <span>Chiqish</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
