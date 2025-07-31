"use client"
import { useState, useEffect } from 'react';
import { Activity, Heart, Moon, Droplets, Brain, TestTube, Calendar, Utensils, Star, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function HealthAnalyzer() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        activityLevel: '',
        sleepHours: '',
        waterIntake: '',
        smokingStatus: '',
        alcoholConsumption: '',
        medicalConditions: '',
        medications: '',
        stressLevel: '',
        exerciseFrequency: ''
    });

    const [submittedData, setSubmittedData] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTip, setCurrentTip] = useState(0);

    const healthTips = [
        "💧 Drinking water first thing in the morning kickstarts your metabolism!",
        "🧘 Just 5 minutes of deep breathing can reduce stress hormones by 23%",
        "🚶 A 10-minute walk after meals can improve digestion by 30%",
        "😴 Quality sleep is when your body repairs and regenerates cells",
        "🥗 Eating colorful foods ensures you get diverse nutrients",
        "💪 Regular exercise releases endorphins - your body's natural happiness chemicals",
        "🌞 Sunlight exposure helps your body produce vitamin D naturally",
        "🧠 Learning new skills keeps your brain young and active"
    ];

    useEffect(() => {
        let interval;
        if (isLoading) {
            interval = setInterval(() => {
                setCurrentTip((prev) => (prev + 1) % healthTips.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const mockResponse = {
                "quick_cards": [
                    { "title": "BMI", "value": "18.1", "description": "Underweight. Aim for a healthy weight range." },
                    { "title": "Stress Level", "value": "High", "description": "Try relaxation techniques like deep breathing, yoga, or meditation." },
                    { "title": "Sleep Quality", "value": "Fair", "description": "Aim for 7-8 hours of sleep daily for better health." },
                    { "title": "Hydration Level", "value": "Good", "description": "Keep up the good work! Aim for 12-15 cups of water daily." }
                ],
                "home_remedies": [
                    "Increase protein intake through nuts, seeds, and lean meats to support weight gain.",
                    "Practice gentle stretches or yoga to reduce stress and improve flexibility.",
                    "Drink a glass of warm milk before bed to promote better sleep."
                ],
                "suggested_tests": [
                    "Complete Blood Count (CBC)",
                    "Vitamin D level test",
                    "Thyroid Profile (TSH, T3, T4)"
                ],
                "possible_diseases_by_age": {
                    "18-30": ["Anemia", "Vitamin D deficiency", "Anxiety disorders"]
                },
                "daily_routine_and_meals": {
                    "routine": [
                        "Wake up by 7:00 AM and drink a glass of warm water with a slice of lemon.",
                        "Do 30 minutes of light exercise or yoga, 3 times a week.",
                        "Practice relaxation techniques like deep breathing or meditation before bed."
                    ],
                    "meals": {
                        "breakfast": "Omelette with whole wheat toast + fruits + nuts",
                        "lunch": "Brown rice + chicken or fish + mixed vegetables + curd",
                        "snacks": "Handful of nuts and seeds or a fruit salad",
                        "dinner": "Grilled chicken or fish + mixed vegetables + quinoa or brown rice"
                    }
                }
            };

            setSubmittedData(mockResponse);
            setIsLoading(false);
            setShowResults(true);
        }, 5000);
    };

    const getCardIcon = (title) => {
        switch (title.toLowerCase()) {
            case 'bmi': return <TrendingUp className="w-6 h-6" />;
            case 'stress level': return <Brain className="w-6 h-6" />;
            case 'sleep quality': return <Moon className="w-6 h-6" />;
            case 'hydration level': return <Droplets className="w-6 h-6" />;
            default: return <Heart className="w-6 h-6" />;
        }
    };

    const getCardColor = (value) => {
        const lowerValue = value.toLowerCase();
        if (lowerValue.includes('good') || lowerValue.includes('excellent')) {
            return 'from-emerald-500 to-teal-600';
        } else if (lowerValue.includes('fair') || lowerValue.includes('moderate')) {
            return 'from-yellow-500 to-orange-500';
        } else if (lowerValue.includes('high') || lowerValue.includes('poor')) {
            return 'from-red-500 to-pink-600';
        }
        return 'from-blue-500 to-indigo-600';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 via-emerald-800/20 to-teal-800/20 animate-pulse"></div>
                <div className="relative z-10 text-center max-w-md mx-auto px-6">
                    <div className="mb-8">
                        <div className="w-20 h-20 mx-auto mb-6 relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-spin"></div>
                            <div className="absolute inset-2 rounded-full bg-gray-900 flex items-center justify-center">
                                <Heart className="w-8 h-8 text-emerald-400 animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Health Data</h2>
                        <p className="text-gray-300">Please wait while we process your information...</p>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                        <div className="flex items-center justify-center mb-4">
                            <Star className="w-6 h-6 text-emerald-400 mr-2" />
                            <span className="text-emerald-400 font-semibold">Health Tip</span>
                        </div>
                        <p className="text-white text-lg leading-relaxed animate-fade-in">
                            {healthTips[currentTip]}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (showResults && submittedData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 py-8 px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 via-emerald-800/10 to-teal-800/10 animate-pulse"></div>
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-8 animate-fade-in">
                        <h1 className="text-4xl font-bold text-white mb-2">Your Health Analysis</h1>
                        <p className="text-gray-300">Comprehensive insights into your wellness journey</p>
                    </div>

                    {/* Quick Cards */}
                    <div className="mb-8 animate-slide-up">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Activity className="w-6 h-6 mr-2 text-emerald-400" />
                            Health Overview
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {submittedData.quick_cards.map((card, idx) => (
                                <div key={idx} className="group">
                                    <div className={`bg-gradient-to-br ${getCardColor(card.value)} p-6 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-white opacity-80">
                                                {getCardIcon(card.title)}
                                            </div>
                                            <div className="text-right">
                                                <h3 className="text-white/80 text-sm font-medium">{card.title}</h3>
                                                <p className="text-white text-2xl font-bold">{card.value}</p>
                                            </div>
                                        </div>
                                        <p className="text-white/90 text-sm leading-relaxed">{card.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Home Remedies */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 animate-slide-up">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Heart className="w-5 h-5 mr-2 text-emerald-400" />
                                Natural Remedies
                            </h3>
                            <div className="space-y-3">
                                {submittedData.home_remedies.map((remedy, idx) => (
                                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-300 text-sm leading-relaxed">{remedy}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Suggested Tests */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 animate-slide-up">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <TestTube className="w-5 h-5 mr-2 text-emerald-400" />
                                Recommended Tests
                            </h3>
                            <div className="space-y-3">
                                {submittedData.suggested_tests.map((test, idx) => (
                                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all duration-300">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-300 text-sm leading-relaxed">{test}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Age-based Diseases */}
                    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 animate-slide-up">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-emerald-400" />
                            Age-Related Health Risks
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(submittedData.possible_diseases_by_age).map(([ageRange, diseases], idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-gray-700/30">
                                    <h4 className="text-emerald-400 font-semibold mb-2">Ages {ageRange}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {diseases.map((disease, diseaseIdx) => (
                                            <span key={diseaseIdx} className="px-3 py-1 bg-gray-600/50 text-gray-300 text-sm rounded-full">
                                                {disease}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Daily Routine & Meals */}
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 animate-slide-up">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-emerald-400" />
                                Daily Routine
                            </h3>
                            <div className="space-y-3">
                                {submittedData.daily_routine_and_meals.routine.map((item, idx) => (
                                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-700/30">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-emerald-400 text-xs font-bold">{idx + 1}</span>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 animate-slide-up">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Utensils className="w-5 h-5 mr-2 text-emerald-400" />
                                Meal Plan
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(submittedData.daily_routine_and_meals.meals).map(([mealType, meal], idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-gray-700/30">
                                        <h4 className="text-emerald-400 font-semibold mb-2 capitalize">{mealType}</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{meal}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setShowResults(false);
                                setSubmittedData(null);
                                setFormData({
                                    name: '', age: '', gender: '', height: '', weight: '',
                                    activityLevel: '', sleepHours: '', waterIntake: '', smokingStatus: '',
                                    alcoholConsumption: '', medicalConditions: '', medications: '',
                                    stressLevel: '', exerciseFrequency: ''
                                });
                            }}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                        >
                            Analyze Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 py-8 px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/10 via-emerald-800/10 to-teal-800/10 animate-pulse"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-emerald-500/20 animate-fade-in">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Health Data Analyzer
                        </h1>
                        <p className="text-gray-300">
                            Discover insights about your wellness journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="bg-gray-700/30 p-6 rounded-2xl border border-gray-600/30 animate-slide-up">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                <Heart className="w-6 h-6 mr-3 text-emerald-400" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Age *
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        max="120"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Your age"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Gender *
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Physical Measurements */}
                        <div className="bg-gray-700/30 p-6 rounded-2xl border border-gray-600/30 animate-slide-up">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                <TrendingUp className="w-6 h-6 mr-3 text-emerald-400" />
                                Physical Measurements
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Height (cm) *
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        required
                                        min="50"
                                        max="250"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Height in cm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Weight (kg) *
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleInputChange}
                                        required
                                        min="20"
                                        max="300"
                                        step="0.1"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Weight in kg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lifestyle & Health Habits */}
                        <div className="bg-gray-700/30 p-6 rounded-2xl border border-gray-600/30 animate-slide-up">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                <Activity className="w-6 h-6 mr-3 text-emerald-400" />
                                Lifestyle & Health Habits
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Activity Level *
                                    </label>
                                    <select
                                        name="activityLevel"
                                        value={formData.activityLevel}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="">Select activity level</option>
                                        <option value="sedentary">Sedentary</option>
                                        <option value="light">Light Activity</option>
                                        <option value="moderate">Moderate Activity</option>
                                        <option value="active">Active</option>
                                        <option value="very-active">Very Active</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Sleep Hours per Night *
                                    </label>
                                    <input
                                        type="number"
                                        name="sleepHours"
                                        value={formData.sleepHours}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                        max="24"
                                        step="0.5"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Hours of sleep"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Water Intake (glasses/day) *
                                    </label>
                                    <input
                                        type="number"
                                        name="waterIntake"
                                        value={formData.waterIntake}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        max="20"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Glasses per day"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Exercise Frequency *
                                    </label>
                                    <select
                                        name="exerciseFrequency"
                                        value={formData.exerciseFrequency}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="">Select frequency</option>
                                        <option value="never">Never</option>
                                        <option value="rarely">Rarely</option>
                                        <option value="sometimes">Sometimes</option>
                                        <option value="often">Often</option>
                                        <option value="daily">Daily</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Smoking Status *
                                    </label>
                                    <select
                                        name="smokingStatus"
                                        value={formData.smokingStatus}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="">Select status</option>
                                        <option value="never">Never smoked</option>
                                        <option value="former">Former smoker</option>
                                        <option value="current">Current smoker</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Alcohol Consumption *
                                    </label>
                                    <select
                                        name="alcoholConsumption"
                                        value={formData.alcoholConsumption}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                    >
                                        <option value="">Select consumption</option>
                                        <option value="never">Never</option>
                                        <option value="rarely">Rarely</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="frequent">Frequent</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Stress Level (1-10) *
                                </label>
                                <input
                                    type="range"
                                    name="stressLevel"
                                    value={formData.stressLevel}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    max="10"
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>Low (1)</span>
                                    <span className="font-medium text-emerald-400">Current: {formData.stressLevel || 'Not set'}</span>
                                    <span>High (10)</span>
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div className="bg-gray-700/30 p-6 rounded-2xl border border-gray-600/30 animate-slide-up">
                            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                                <TestTube className="w-6 h-6 mr-3 text-emerald-400" />
                                Medical Information
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Medical Conditions (if any)
                                    </label>
                                    <textarea
                                        name="medicalConditions"
                                        value={formData.medicalConditions}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="List any medical conditions, allergies, or health concerns"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Current Medications (if any)
                                    </label>
                                    <textarea
                                        name="medications"
                                        value={formData.medications}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="List current medications and supplements"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl group"
                            >
                                <span className="flex items-center justify-center">
                                    <Heart className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                                    Analyze My Health Data
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }
                
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981, #059669);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                }
                
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981, #059669);
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                }
                
                .shadow-3xl {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </div>
    );
}