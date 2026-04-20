import React, { useState } from 'react';
import { GraduationCap, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Imitating a small delay for better UX
    setTimeout(() => {
      if (username === 'muhammadaziz' && password === '19191919') {
        onLogin();
        toast.success('Hush kelibsiz, Muhammadaziz!');
      } else {
        toast.error('Login yoki parol xato!');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex bg-primary-600 p-4 rounded-[2rem] text-white shadow-xl shadow-primary-200 mb-6 group hover:scale-110 transition-transform duration-500">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Smart Academy</h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">CRM System Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Tizimga kirish</h2>
            <p className="text-slate-500 text-sm">Davom etish uchun ma'lumotlaringizni kiriting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Login</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] transition-all outline-none focus:bg-white focus:border-primary-500/20 focus:ring-4 focus:ring-primary-500/5 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Parol</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] transition-all outline-none focus:bg-white focus:border-primary-500/20 focus:ring-4 focus:ring-primary-500/5 font-medium"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-4 rounded-[1.25rem] font-bold text-lg shadow-xl shadow-primary-200 hover:bg-primary-700 hover:shadow-primary-300 active:scale-[0.98] transition-all flex items-center justify-center group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Kirish
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-slate-400 text-sm font-medium">
          &copy; 2026 Smart Academy. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
