import React, { useState } from 'react';
import { User, MapPin, Edit, AlertTriangle, Plus, ChevronRight, Lock, Bell, Shield, LogOut, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStep, setEditStep] = useState(1);
  
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex.johnson@email.com');
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('Non-binary');
  const [height, setHeight] = useState('178');
  const [weight, setWeight] = useState('72.4');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [allergies, setAllergies] = useState<string[]>(['Peanuts', 'Shellfish', 'Dairy']);
  const [isAddingOther, setIsAddingOther] = useState(false);
  const [otherAllergy, setOtherAllergy] = useState('');
  const predefinedAllergies = ['Peanuts', 'Dairy', 'Gluten', 'Shellfish', 'Soy'];
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(['Vegetarian', 'Low Carb', 'Intermittent Fasting']);
  
  const toggleAllergy = (allergy: string) => {
    if (allergies.includes(allergy)) {
      setAllergies(allergies.filter(a => a !== allergy));
    } else {
      setAllergies([...allergies, allergy]);
    }
  };

  const addOtherAllergy = () => {
    const trimmed = otherAllergy.trim();
    if (!trimmed) return;
    if (!allergies.includes(trimmed)) {
      setAllergies([...allergies, trimmed]);
    }
    setOtherAllergy('');
    setIsAddingOther(false);
  };

  const toggleDietaryPreference = (pref: string) => {
    if (dietaryPreferences.includes(pref)) {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== pref));
    } else {
      setDietaryPreferences([...dietaryPreferences, pref]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-primary-green/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary-green to-dark-green-1 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary-green rounded-full border-4 border-white"></div>
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold text-dark-green-2 mb-1">{name}</h1>
                    <p className="text-primary-green mb-2">{email}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-green hover:bg-dark-green-1 text-white font-semibold rounded-xl transition-colors">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-primary-green/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary-green/20 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-green" />
                </div>
                <h2 className="text-xl font-bold text-dark-green-2">Physical Profile</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-primary-green/20">
                  <p className="text-primary-green text-xs font-semibold mb-2">AGE</p>
                  <p className="text-dark-green-2 text-2xl font-bold">{age} <span className="text-base font-normal text-dark-green-1">y/s</span></p>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-primary-green/20">
                  <p className="text-primary-green text-xs font-semibold mb-2">GENDER</p>
                  <p className="text-dark-green-2 text-lg font-bold">{gender}</p>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-primary-green/20">
                  <p className="text-primary-green text-xs font-semibold mb-2">WEIGHT</p>
                  <p className="text-dark-green-2 text-2xl font-bold">{weight} <span className="text-base font-normal text-dark-green-1">{weightUnit}</span></p>
                  <p className="text-primary-green text-sm font-semibold">-1.2%</p>
                </div>
                
                <div className="bg-white rounded-2xl p-4 border border-primary-green/20">
                  <p className="text-primary-green text-xs font-semibold mb-2">HEIGHT</p>
                  <p className="text-dark-green-2 text-2xl font-bold">{height} <span className="text-base font-normal text-dark-green-1">cm</span></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-primary-green/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary-green/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-green text-lg">🍽️</span>
                </div>
                <h2 className="text-xl font-bold text-dark-green-2">Nutritional Profile</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-primary-green text-sm font-semibold mb-3">KNOWN ALLERGIES</h3>
                <div className="flex flex-wrap gap-3">
                  {allergies.map((allergy) => (
                    <span key={allergy} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl border border-red-500/30">
                      <AlertTriangle className="w-4 h-4" />
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-primary-green text-sm font-semibold mb-3">DIETARY PREFERENCE</h3>
                <div className="flex flex-wrap gap-3">
                  {dietaryPreferences.map((pref) => (
                    <span key={pref} className="px-4 py-2 bg-primary-green/20 text-primary-green rounded-xl border border-primary-green/40">
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-primary-green/20">
              <h2 className="text-xl font-bold text-dark-green-2 mb-6">Health Snapshot</h2>
              
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-primary-green/20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * 0.25}`}
                      className="text-primary-green"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-dark-green-2">22.8</span>
                    <span className="text-sm text-primary-green">BMI INDEX</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-primary-green font-semibold mb-2">Healthy Range</p>
                  <p className="text-dark-green-1 text-sm">Your BMI is currently within the optimal range for your height and age.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-primary-green/20">
              <h2 className="text-xl font-bold text-dark-green-2 mb-6">Account Settings</h2>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-primary-green/5 border border-primary-green/20 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-primary-green" />
                    <span className="text-dark-green-2 font-medium">Change Password</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-dark-green-1 group-hover:text-primary-green" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-primary-green/5 border border-primary-green/20 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-primary-green" />
                    <span className="text-dark-green-2 font-medium">Notification Settings</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-dark-green-1 group-hover:text-primary-green" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-primary-green/5 border border-primary-green/20 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary-green" />
                    <span className="text-dark-green-2 font-medium">Privacy & Data</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-dark-green-1 group-hover:text-primary-green" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-primary-green/20 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-green-2">Edit Profile</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditStep(1);
                }}
                className="p-2 hover:bg-primary-green/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-dark-green-1" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                      editStep >= 1 
                        ? 'bg-primary-green text-white' 
                        : 'bg-dark-green-1/10 border-2 border-dark-green-1/30 text-dark-green-1/50'
                    }`}>
                      1
                    </div>
                    <span className={`text-xs font-medium ${
                      editStep >= 1 ? 'text-primary-green' : 'text-dark-green-1/50'
                    }`}>PERSONAL</span>
                  </div>

                  <div className={`w-16 h-0.5 mb-6 ${
                    editStep >= 2 ? 'bg-primary-green/30' : 'bg-dark-green-1/20'
                  }`}></div>

                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                      editStep >= 2 
                        ? 'bg-primary-green text-white' 
                        : 'bg-dark-green-1/10 border-2 border-dark-green-1/30 text-dark-green-1/50'
                    }`}>
                      2
                    </div>
                    <span className={`text-xs font-medium ${
                      editStep >= 2 ? 'text-primary-green' : 'text-dark-green-1/50'
                    }`}>DIETARY</span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-dark-green-2 mb-1">
                    {editStep === 1 && 'Personal Information'}
                    {editStep === 2 && 'Dietary Preferences'}
                  </h3>
                  <p className="text-dark-green-1/60 text-sm">Step {editStep} of 2</p>
                </div>
              </div>

              {/* Step 1 - Personal Info */}
              {editStep === 1 && (
                <div className="space-y-6">
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
                    <label className="block text-sm font-medium text-dark-green-1/80 mb-2">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, State"
                      className="w-full px-4 py-3 bg-white border border-primary-green/30 rounded-xl text-dark-green-2 placeholder:text-dark-green-1/40 focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all"
                    />
                  </div>

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
                          className={`flex-1 px-3 py-3 rounded-xl font-medium text-sm transition-all ${
                            gender === 'Male'
                              ? 'bg-primary-green text-white'
                              : 'bg-white border border-primary-green/30 text-dark-green-1/80 hover:border-primary-green/50'
                          }`}
                        >
                          Male
                        </button>
                        <button
                          onClick={() => setGender('Female')}
                          className={`flex-1 px-3 py-3 rounded-xl font-medium text-sm transition-all ${
                            gender === 'Female'
                              ? 'bg-primary-green text-white'
                              : 'bg-white border border-primary-green/30 text-dark-green-1/80 hover:border-primary-green/50'
                          }`}
                        >
                          Female
                        </button>
                        <button
                          onClick={() => setGender('Non-binary')}
                          className={`px-3 py-3 rounded-xl font-medium text-sm transition-all ${
                            gender === 'Non-binary'
                              ? 'bg-primary-green text-white'
                              : 'bg-white border border-primary-green/30 text-dark-green-1/80 hover:border-primary-green/50'
                          }`}
                        >
                          Other
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
                </div>
              )}

              {/* Step 2 - Dietary Preferences */}
              {editStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-green-1/80 mb-3">
                      Food Allergies & Intolerances
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[...predefinedAllergies, ...allergies.filter(a => !predefinedAllergies.includes(a))].map((allergy) => (
                        <button
                          key={allergy}
                          onClick={() => toggleAllergy(allergy)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                            allergies.includes(allergy)
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
                      {isAddingOther ? (
                        <input
                          type="text"
                          value={otherAllergy}
                          onChange={(e) => setOtherAllergy(e.target.value)}
                          onBlur={addOtherAllergy}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              addOtherAllergy();
                            }
                          }}
                          autoFocus
                          placeholder="Enter allergy..."
                          className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-primary-green/50 outline-none"
                        />
                      ) : (
                        <button
                          onClick={() => setIsAddingOther(true)}
                          className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-primary-green/30 text-primary-green hover:border-primary-green/50 transition-all"
                        >
                          + Add Other
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-green-1/80 mb-3">
                      Dietary Preferences
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'Vegetarian', label: 'Vegetarian', desc: 'No meat or fish' },
                        { value: 'Vegan', label: 'Vegan', desc: 'No animal products' },
                        { value: 'Low Carb', label: 'Low Carb', desc: 'Reduced carbohydrate intake' },
                        { value: 'Keto', label: 'Keto', desc: 'High-fat, very low-carb' },
                        { value: 'Paleo', label: 'Paleo', desc: 'Whole foods, no processed' },
                        { value: 'Intermittent Fasting', label: 'Intermittent Fasting', desc: 'Time-restricted eating' },
                      ].map((pref) => (
                        <button
                          key={pref.value}
                          onClick={() => toggleDietaryPreference(pref.value)}
                          className={`w-full text-left px-5 py-4 rounded-xl transition-all ${
                            dietaryPreferences.includes(pref.value)
                              ? 'bg-primary-green/20 border-2 border-primary-green'
                              : 'bg-white border border-primary-green/30 hover:border-primary-green/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className={`font-semibold mb-1 ${
                                dietaryPreferences.includes(pref.value) ? 'text-primary-green' : 'text-dark-green-2'
                              }`}>
                                {pref.label}
                              </div>
                              <div className="text-sm text-dark-green-1/70">
                                {pref.desc}
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              dietaryPreferences.includes(pref.value) 
                                ? 'border-primary-green bg-primary-green' 
                                : 'border-dark-green-1/30'
                            }`}>
                              {dietaryPreferences.includes(pref.value) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-primary-green/20">
                {editStep > 1 ? (
                  <button
                    onClick={() => setEditStep(editStep - 1)}
                    className="flex items-center gap-2 px-6 py-3 text-dark-green-1/80 hover:text-dark-green-2 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back</span>
                  </button>
                ) : (
                  <div></div>
                )}
                
                {editStep < 2 ? (
                  <button
                    onClick={() => setEditStep(editStep + 1)}
                    className="flex items-center gap-2 px-8 py-3 bg-primary-green hover:bg-dark-green-1 text-white font-semibold rounded-xl transition-all ml-auto"
                  >
                    <span>Continue</span>
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditStep(1);
                    }}
                    className="flex items-center gap-2 px-8 py-3 bg-primary-green hover:bg-dark-green-1 text-white font-semibold rounded-xl transition-all"
                  >
                    <span>Save Changes</span>
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;