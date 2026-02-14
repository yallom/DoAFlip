import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';
import bgLogin from '@/assets/bg_login.svg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-5 relative"
      style={{
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-[#001414]/70"></div>
      <div className="relative z-10 bg-[#0a1e1e]/1 backdrop-blur-xl border border-[#00ff88]/20 rounded-3xl p-12 w-full max-w-md shadow-2xl">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#00ff88] rounded-full flex items-center justify-center p-3">
            <img 
              src={logo} 
              alt="NutriAI Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          NutriAI
        </h1>
        <p className="text-sm text-center text-[#00ff88] mb-8 opacity-90">
          Your AI-powered journey to health starts here
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-[#00ff88]"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88] opacity-60 pointer-events-none" 
                size={20} 
              />
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-[#002828]/50 border border-[#00ff88]/30 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-3 focus:ring-[#00ff88]/10 focus:border-[#00ff88] focus:bg-[#003232]/60 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-[#00ff88]"
            >
              Password
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88] opacity-60 pointer-events-none" 
                size={20} 
              />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-3.5 bg-[#002828]/50 border border-[#00ff88]/30 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-3 focus:ring-[#00ff88]/10 focus:border-[#00ff88] focus:bg-[#003232]/60 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00ff88] opacity-60 hover:opacity-100 transition-opacity p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#00ff88] hover:bg-[#00e67a] text-[#001a1a] font-semibold text-base rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00ff88]/30 active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-white/70 mt-6 mb-8">
          Don't have an account?{' '}
          <a 
            href="/signup" 
            className="text-[#00ff88] font-semibold hover:text-[#00e67a] hover:underline transition-colors"
          >
            Sign Up
          </a>
        </p>

        <div className="flex justify-center items-center gap-6 pt-6 border-t border-[#00ff88]/20">
          <div className="flex items-center gap-1.5">
            <Shield size={16} className="text-[#00ff88] opacity-70" />
            <span className="text-[10px] font-semibold text-[#00ff88] opacity-80 tracking-wide">
              SECURE AI PROCESSING
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles size={16} className="text-[#00ff88] opacity-70" />
            <span className="text-[10px] font-semibold text-[#00ff88] opacity-80 tracking-wide">
              SMART MEAL PLANS
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;