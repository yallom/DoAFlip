import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import logoComp from '@/assets/logo.png';
import bgRegister from '@/assets/bg_register.png';
import leaf from '@/assets/leaf.png';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { AuthAllergy, AuthGender, AuthGoal } from '@/hooks/queries/auth';

const Register: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [age, setAge] = useState('25');
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState('175');
    const [weight, setWeight] = useState('70');
    const [weightUnit, setWeightUnit] = useState('kg');

    const [allergies, setAllergies] = useState<string[]>(['Peanuts']);
    const predefinedAllergies = ['Peanuts', 'Lactose', 'Soy', 'Seafood'];

    const [objective, setObjective] = useState('');

    const mapGender = (value: string): AuthGender | null => {
        if (value === 'Male') return 'Masculine';
        if (value === 'Female') return 'Feminine';
        return null;
    };

    const mapGoal = (value: string): AuthGoal | null => {
        if (value === 'weight-loss') return 'weight_loss';
        if (value === 'muscle-gain') return 'muscle_gain';
        if (value === 'health') return 'maintenance';
        return null;
    };

    const mapAllergy = (allergy: string): AuthAllergy => {
        switch (allergy) {
            case 'Peanuts':
                return 'peanuts';
            case 'Lactose':
                return 'lactose';
            case 'Soy':
                return 'soy';
            default:
                return 'seafood';
        }
    };

    const handleRegister = async () => {
        if (isSubmitting) return;

        const parsedAge = Number.parseInt(age, 10);
        const parsedHeight = Number.parseInt(height, 10);
        const parsedWeight = Number.parseFloat(weight);
        const mappedGender = mapGender(gender);
        const mappedGoal = mapGoal(objective);
        const weightInKg = weightUnit === 'lb' ? parsedWeight * 0.453592 : parsedWeight;

        if (!mappedGender || !mappedGoal) {
            console.error('Dados de registo inválidos.');
            return;
        }

        if (!Number.isFinite(parsedAge) || !Number.isFinite(parsedHeight) || !Number.isFinite(weightInKg)) {
            console.error('Dados numéricos inválidos.');
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await register({
                name: name.trim(),
                email: email.trim(),
                password,
                age: parsedAge,
                height: parsedHeight,
                weight: weightInKg,
                gender: mappedGender,
                goal: mappedGoal,
                allergies: allergies.map(mapAllergy),
            });

            if (success) {
                navigate('/recipes');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleAllergy = (allergy: string) => {
        if (allergies.includes(allergy)) {
            if (!predefinedAllergies.includes(allergy)) {
                setAllergies(allergies.filter(a => a !== allergy));
            } else {
                setAllergies(allergies.filter(a => a !== allergy));
            }
        } else {
            setAllergies([...allergies, allergy]);
        }
    };

    const validatePassword = (pwd: string) => {
        const hasUppercase = /[A-Z]/.test(pwd);
        const hasLowercase = /[a-z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasMinLength = pwd.length >= 8;

        return {
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasMinLength,
            isValid: hasUppercase && hasLowercase && hasNumber && hasMinLength
        };
    };

    const passwordValidation = validatePassword(password);
    const passwordsMatch = password === confirmPassword;

    return (
        <div className="min-h-screen relative overflow-hidden bg-white">
            <div
                className="absolute inset-y-0 left-0 w-1/2 opacity-10"
                style={{
                    backgroundImage: `url(${bgRegister})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <img
                src={leaf}
                alt="Leaf decoration"
                className="absolute bottom-0 right-0 w-40 h-40 opacity-20 p-10"
            />

            <div className="relative z-10 min-h-screen flex">
                <div className="w-1/2 p-12 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logoComp} alt="NutriAI Logo" className="h-12" />
                    </div>

                    <div className="mb-24">
                        <h1 className="text-5xl font-bold text-dark-green-2 leading-tight mb-4">
                            Fuel your body with
                            <br />
                            <span className="text-primary-green">intelligence.</span>
                        </h1>
                        <p className="text-dark-green-1/80 text-lg">
                            Join users optimizing their health<br />
                            through AI-driven personalized nutrition tips.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">

                        </div>
                        <div>

                        </div>
                    </div>
                </div>

                <div className="w-1/2 p-12 flex items-center justify-center">
                    <div className="w-full max-w-md">

                        <div className="mb-8">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 1
                                            ? 'bg-primary-green text-white'
                                            : 'bg-dark-green-1/10 border-2 border-dark-green-1/30 text-dark-green-1/50'
                                        }`}>
                                        1
                                    </div>
                                    <span className={`text-xs font-medium ${step >= 1 ? 'text-primary-green' : 'text-dark-green-1/50'
                                        }`}>ACCOUNT</span>
                                </div>

                                <div className={`w-16 h-0.5 mb-6 ${step >= 2 ? 'bg-primary-green/30' : 'bg-dark-green-1/20'
                                    }`}></div>

                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 2
                                            ? 'bg-primary-green text-white'
                                            : 'bg-dark-green-1/10 border-2 border-dark-green-1/30 text-dark-green-1/50'
                                        }`}>
                                        2
                                    </div>
                                    <span className={`text-xs font-medium ${step >= 2 ? 'text-primary-green' : 'text-dark-green-1/50'
                                        }`}>PERSONAL</span>
                                </div>

                                <div className={`w-16 h-0.5 mb-6 ${step >= 3 ? 'bg-primary-green/30' : 'bg-dark-green-1/20'
                                    }`}></div>

                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= 3
                                            ? 'bg-primary-green text-white'
                                            : 'bg-dark-green-1/10 border-2 border-dark-green-1/30 text-dark-green-1/50'
                                        }`}>
                                        3
                                    </div>
                                    <span className={`text-xs font-medium ${step >= 3 ? 'text-primary-green' : 'text-dark-green-1/50'
                                        }`}>DIETARY</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-dark-green-2 mb-1">
                                    {step === 1 && 'Create Your Account'}
                                    {step === 2 && 'Personal Information'}
                                    {step === 3 && 'Dietary Preferences'}
                                </h2>
                                <p className="text-dark-green-1/60 text-sm">Step {step} of 3</p>
                            </div>
                        </div>

                        <div className="space-y-6">

                            {step === 1 && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full px-4 py-3 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dark-green-1/80 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a secure password"
                                            className={`w-full px-4 py-3 bg-white border rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:ring-2 transition-all ${password && !passwordValidation.isValid
                                                    ? 'border-red-400 focus:ring-red-200'
                                                    : 'border-primary-green/30 focus:border-primary-green focus:ring-primary-green/20'
                                                }`}
                                        />

                                        <div className="mt-2 text-xs">
                                            <p className={passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-500'}>
                                                • At least 8 characters, 1 uppercase, 1 lowercase, and 1 number
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Re-enter your password"
                                            className={`w-full px-4 py-3 bg-white border rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:ring-2 transition-all ${confirmPassword && !passwordsMatch
                                                    ? 'border-red-400 focus:ring-red-200'
                                                    : 'border-primary-green/30 focus:border-primary-green focus:ring-primary-green/20'
                                                }`}
                                        />
                                        {confirmPassword && !passwordsMatch && (
                                            <p className="mt-2 text-xs text-red-500">
                                                • Passwords do not match
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Age</label>
                                            <input
                                                type="number"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Gender</label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setGender('Male')}
                                                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${gender === 'Male'
                                                            ? 'bg-primary-green text-white'
                                                            : 'bg-white border border-primary-green/30 text-dark-green-1/80 hover:border-primary-green/50'
                                                        }`}
                                                >
                                                    Male
                                                </button>
                                                <button
                                                    onClick={() => setGender('Female')}
                                                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${gender === 'Female'
                                                            ? 'bg-primary-green text-white'
                                                            : 'bg-white border border-primary-green/30 text-dark-green-1/80 hover:border-primary-green/50'
                                                        }`}
                                                >
                                                    Female
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Height (cm)</label>
                                            <input
                                                type="number"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Weight</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={weight}
                                                    onChange={(e) => setWeight(e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all"
                                                />
                                                <button
                                                    onClick={() => setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg')}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-green text-sm font-medium hover:text-dark-green-1 transition-colors"
                                                >
                                                    {weightUnit}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-dark-green-1/80 mb-3">
                                            Food Allergies & Intolerances
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {predefinedAllergies.map((allergy) => (
                                                <button
                                                    key={allergy}
                                                    onClick={() => toggleAllergy(allergy)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${allergies.includes(allergy)
                                                            ? 'bg-primary-green/20 border-2 border-primary-green text-primary-green'
                                                            : 'bg-white border border-primary-green/30 text-dark-green-1/80 hover:border-primary-green/50'
                                                        }`}
                                                >
                                                    {allergy}
                                                    {allergies.includes(allergy) && (
                                                        <X className="inline-block ml-1 w-3 h-3" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-dark-green-1/80 mb-3">
                                            What's your main health objective?
                                        </label>
                                        <div className="space-y-3">
                                            {[
                                                { value: 'weight-loss', label: 'Weight Loss', desc: 'Reduce body weight with balanced nutrition' },
                                                { value: 'muscle-gain', label: 'Muscle Gain', desc: 'Build lean muscle with protein-rich diet' },
                                                { value: 'health', label: 'General Health', desc: 'Improve overall health and wellness' },
                                            ].map((obj) => (
                                                <button
                                                    key={obj.value}
                                                    onClick={() => setObjective(obj.value)}
                                                    className={`w-full text-left px-5 py-4 rounded-xl transition-all ${objective === obj.value
                                                            ? 'bg-primary-green/20 border-2 border-primary-green'
                                                            : 'bg-white border border-primary-green/30 hover:border-primary-green/50'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className={`font-semibold mb-1 ${objective === obj.value ? 'text-primary-green' : 'text-dark-green-2'
                                                                }`}>
                                                                {obj.label}
                                                            </div>
                                                            <div className="text-sm text-dark-green-1/70">
                                                                {obj.desc}
                                                            </div>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${objective === obj.value
                                                                ? 'border-primary-green bg-primary-green'
                                                                : 'border-dark-green-1/30'
                                                            }`}>
                                                            {objective === obj.value && (
                                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-between pt-4">
                                {step > 1 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="flex items-center gap-2 px-6 py-3 text-dark-green-1/80 hover:text-dark-green-2 transition-colors"
                                    >
                                        <ArrowLeft size={20} />
                                        <span className="font-medium">Back</span>
                                    </button>
                                )}

                                {step < 3 ? (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        disabled={
                                            step === 1 &&
                                            (!name.trim() || !email.trim() || !password || !confirmPassword || !passwordValidation.isValid || !passwordsMatch)
                                        }
                                        className={`flex items-center gap-2 px-8 py-3 font-semibold rounded-xl transition-all ${step === 1 ? 'ml-auto' : ''
                                            } ${step === 1 && (!name.trim() || !email.trim() || !password || !confirmPassword || !passwordValidation.isValid || !passwordsMatch)
                                                ? 'bg-dark-green-1/30 text-white/50 cursor-not-allowed'
                                                : 'bg-primary-green hover:bg-dark-green-1 text-white hover:shadow-lg hover:shadow-primary-green/20'
                                            }`}
                                    >
                                        <span>Continue</span>
                                        <ArrowRight size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleRegister}
                                        disabled={isSubmitting}
                                        aria-busy={isSubmitting}
                                        className="flex items-center gap-2 px-8 py-3 bg-primary-green hover:bg-dark-green-1 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary-green/20"
                                    >
                                        <span>Complete Registration</span>
                                        <ArrowRight size={20} />
                                    </button>
                                )}
                            </div>

                            <p className="text-center text-sm text-dark-green-1/60 pt-2">
                                Already have an account?{' '}
                                <a href="/login" className="text-primary-green hover:text-dark-green-1 font-medium transition-colors">
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
