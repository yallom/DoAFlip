import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import logoComp from '@/assets/logo_comp.png';
import bgRegister from '@/assets/bg_register.png';
import leaf from '@/assets/leaf.png';

const Register: React.FC = () => {
  const [step, setStep] = useState(2);
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [allergies, setAllergies] = useState<string[]>(['Peanuts', 'Gluten']);

  const toggleAllergy = (allergy: string) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter(a => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const addOtherAllergy = () => {
    // Logic to add custom allergy
    console.log('Add other allergy');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-darkgreen">
      <div 
        className="absolute inset-y-0 left-0 w-1/2 opacity-40"
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
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Fuel your body with
              <br />
              <span className="text-lightgreen">intelligence.</span>
            </h1>
            <p className="text-gray/80 text-lg">
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
                  <div className="w-10 h-10 rounded-full bg-lightgreen/20 border-2 border-lightgreen flex items-center justify-center text-lightgreen font-bold mb-2">
                    1
                  </div>
                  <span className="text-xs text-lightgreen font-medium">ACCOUNT</span>
                </div>

                <div className="w-16 h-0.5 bg-lightgreen/30 mb-6"></div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-lightgreen flex items-center justify-center text-darkgreen font-bold mb-2">
                    2
                  </div>
                  <span className="text-xs text-lightgreen font-medium">PERSONAL</span>
                </div>

                <div className="w-16 h-0.5 bg-gray/20 mb-6"></div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray/10 border-2 border-gray/30 flex items-center justify-center text-gray/50 font-bold mb-2">
                    3
                  </div>
                  <span className="text-xs text-gray/50 font-medium">DIETARY</span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-1">Personal Information</h2>
                <p className="text-gray/60 text-sm">Step 2 of 3</p>
              </div>
            </div>

            <div className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray/80 mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 bg-green/20 border border-lightgreen/30 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-lightgreen focus:ring-2 focus:ring-lightgreen/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray/80 mb-2">Gender</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGender('Male')}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        gender === 'Male'
                          ? 'bg-lightgreen text-darkgreen'
                          : 'bg-green/20 border border-lightgreen/30 text-gray/80 hover:border-lightgreen/50'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setGender('Female')}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        gender === 'Female'
                          ? 'bg-lightgreen text-darkgreen'
                          : 'bg-green/20 border border-lightgreen/30 text-gray/80 hover:border-lightgreen/50'
                      }`}
                    >
                      Female
                    </button>
                    <button
                      onClick={() => setGender('Other')}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${
                        gender === 'Other'
                          ? 'bg-lightgreen text-darkgreen'
                          : 'bg-green/20 border border-lightgreen/30 text-gray/80 hover:border-lightgreen/50'
                      }`}
                    >
                      Other
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray/80 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 bg-green/20 border border-lightgreen/30 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-lightgreen focus:ring-2 focus:ring-lightgreen/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray/80 mb-2">Weight (kg)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-green/20 border border-lightgreen/30 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-lightgreen focus:ring-2 focus:ring-lightgreen/20 transition-all"
                    />
                    <button
                      onClick={() => setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-lightgreen text-sm font-medium hover:text-yellow transition-colors"
                    >
                      {weightUnit}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray/80 mb-3">
                  Food Allergies & Intolerances
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'].map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                        allergies.includes(allergy)
                          ? 'bg-lightgreen/20 border-2 border-lightgreen text-lightgreen'
                          : 'bg-green/20 border border-lightgreen/30 text-gray/80 hover:border-lightgreen/50'
                      }`}
                    >
                      {allergy}
                      {allergies.includes(allergy) && (
                        <X className="inline-block ml-1 w-3 h-3" />
                      )}
                    </button>
                  ))}
                  <button
                    onClick={addOtherAllergy}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-green/20 border border-lightgreen/30 text-lightgreen hover:border-lightgreen/50 transition-all"
                  >
                    + Add Other
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-6 py-3 text-gray/80 hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span className="font-medium">Back</span>
                </button>

                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-8 py-3 bg-lightgreen hover:bg-yellow text-darkgreen font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-lightgreen/20"
                >
                  <span>Continue to Final Step</span>
                  <ArrowRight size={20} />
                </button>
              </div>

              <p className="text-center text-sm text-gray/60 pt-2">
                Already have an account?{' '}
                <a href="/login" className="text-lightgreen hover:text-yellow font-medium transition-colors">
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