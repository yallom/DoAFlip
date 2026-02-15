import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, Sparkles } from 'lucide-react';
import logo from '@/assets/logo.png';
import bgLogin from '@/assets/bg_login.svg';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const success = await login(email, password);
            if (success) {
                navigate('/recipes');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-5 relative bg-white"
            style={{
                backgroundImage: `url(${bgLogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-white/90"></div>
            <div className="relative z-10 bg-white backdrop-blur-xl border border-primary-green/20 rounded-3xl p-12 w-full max-w-md shadow-2xl">

                <div className="flex justify-center mb-6">
                    <div className="bg-primary-green p-0 rounded-full flex items-center justify-center">
                        <img
                            src={logo}
                            alt="NutriAI Logo"
                            className="w-18 h-18 object-cover"
                        />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-dark-green-2 mb-2">
                    NutriAI
                </h1>
                <p className="text-sm text-center text-primary-green mb-8 opacity-90">
                    Your AI-powered journey to health starts here
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-dark-green-1"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-green opacity-60 pointer-events-none"
                                size={20}
                            />
                            <input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 text-sm placeholder:text-dark-green-1/40 focus:outline-none focus:ring-3 focus:ring-primary-green/10 focus:border-primary-green focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-dark-green-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Lock
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-green opacity-60 pointer-events-none"
                                size={20}
                            />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-12 pr-12 py-3.5 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 text-sm placeholder:text-dark-green-1/40 focus:outline-none focus:ring-3 focus:ring-primary-green/10 focus:border-primary-green focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-green opacity-60 hover:opacity-100 transition-opacity p-1"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="w-full py-4 bg-primary-green hover:bg-dark-green-1 text-white font-semibold text-base rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-green/30 active:translate-y-0"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-dark-green-1/70 mt-6 mb-8">
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="text-primary-green font-semibold hover:text-dark-green-1 hover:underline transition-colors"
                    >
                        Sign Up
                    </a>
                </p>

                <div className="flex justify-center items-center gap-6 pt-6 border-t border-primary-green/20">
                    <div className="flex items-center gap-1.5">
                        <Shield size={16} className="text-primary-green opacity-70" />
                        <span className="text-[10px] font-semibold text-primary-green opacity-80 tracking-wide">
                            SECURE AI PROCESSING
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Sparkles size={16} className="text-primary-green opacity-70" />
                        <span className="text-[10px] font-semibold text-primary-green opacity-80 tracking-wide">
                            SMART MEAL PLANS
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
