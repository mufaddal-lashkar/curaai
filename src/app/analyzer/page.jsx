"use client"
import { useState, useEffect } from 'react';
import { Activity, Heart, Moon, Droplets, Brain, TestTube, Calendar, Utensils, Star, TrendingUp, AlertCircle, CheckCircle, HeartPlus, ArrowLeft, Sparkles, Target } from 'lucide-react';
import axios from 'axios';

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

        try {
            const url = '/api/analyzer';
            const response = await axios.post(url, { formData });

            // If reply is a JSON string (not an object), parse it
            let parsedReply;
            if (typeof response.data.reply === 'string') {
                parsedReply = JSON.parse(response.data.reply);
            } else {
                parsedReply = response.data.reply;
            }

            setSubmittedData(parsedReply);
            setIsLoading(false);
            setShowResults(true);
        } catch (err) {
            console.error('Error in handleSubmit:', err);
            setIsLoading(false);
        }
    };


    const getCardIcon = (title) => {
        switch (title.toLowerCase()) {
            case 'bmi': return <TrendingUp className="w-5 h-5" />;
            case 'stress level': return <Brain className="w-5 h-5" />;
            case 'sleep quality': return <Moon className="w-5 h-5" />;
            case 'hydration level': return <Droplets className="w-5 h-5" />;
            default: return <Heart className="w-5 h-5" />;
        }
    };

    const getCardColor = (value) => {
        const lowerValue = value.toLowerCase();
        if (lowerValue.includes('good') || lowerValue.includes('excellent')) {
            return 'from-green-50 to-emerald-50 border-green-200';
        } else if (lowerValue.includes('fair') || lowerValue.includes('moderate')) {
            return 'from-yellow-50 to-orange-50 border-yellow-200';
        } else if (lowerValue.includes('high') || lowerValue.includes('poor')) {
            return 'from-red-50 to-pink-50 border-red-200';
        }
        return 'from-blue-50 to-indigo-50 border-blue-200';
    };

    const getCardIconBg = (value) => {
        const lowerValue = value.toLowerCase();
        if (lowerValue.includes('good') || lowerValue.includes('excellent')) {
            return 'bg-green-100 text-green-600';
        } else if (lowerValue.includes('fair') || lowerValue.includes('moderate')) {
            return 'bg-yellow-100 text-yellow-600';
        } else if (lowerValue.includes('high') || lowerValue.includes('poor')) {
            return 'bg-red-100 text-red-600';
        }
        return 'bg-blue-100 text-blue-600';
    };

    if (isLoading) {
        return (
            <div className="bg-[#cfddea] text-[#0f0f0f] min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="mb-8">
                        <div className="w-20 h-20 mx-auto mb-6 relative animate-spin">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
                            <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                                <HeartPlus className="w-8 h-8 text-black animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-medium text-black mb-2 tracking-tight">Analyzing Your Health Data</h2>
                        <p className="text-gray-600">Please wait while we process your information...</p>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                        <div className="flex items-center justify-center mb-4">
                            <Sparkles className="w-5 h-5 text-black mr-2" />
                            <span className="text-black font-medium">Health Tip</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed animate-fade-in">
                            {healthTips[currentTip]}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (showResults && submittedData) {
        return (
            <>
                <header className="py-4 md:py-6 animate-fade-in sticky top-0 z-10 bg-[#cfddea]/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between">
                        <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center">
                                <Heart className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-lg tracking-tight">Cura AI</span>
                        </a>

                        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-medium">
                            <a href="/" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                                Home
                            </a>
                            <a href="analyzer" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                                Analyzer
                            </a>
                            <a href="chat" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700 font-semibold">
                                Chatbot
                            </a>
                        </nav>
                    </div>
                </header>
                <div className="bg-[#cfddea] text-[#0f0f0f] min-h-screen py-8 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8 animate-fade-in">
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
                                className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Analyzer
                            </button>

                            <div className="text-center">
                                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-2">Your Health Analysis</h1>
                                <p className="text-gray-600 text-lg">Comprehensive insights into your wellness journey</p>
                            </div>
                        </div>

                        {/* Quick Cards */}
                        <div className="mb-12 animate-slide-up">
                            <h2 className="text-2xl font-medium text-black mb-6 flex items-center">
                                <Target className="w-6 h-6 mr-3" />
                                Health Overview
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {submittedData.quick_cards.map((card, idx) => (
                                    <div key={idx} className="group animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                        <div className={`bg-gradient-to-br border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${getCardColor(card.value)}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCardIconBg(card.value)}`}>
                                                    {getCardIcon(card.title)}
                                                </div>
                                                <div className="text-right">
                                                    <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
                                                    <p className="text-black text-2xl font-semibold">{card.value}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            {/* Home Remedies */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg animate-slide-up">
                                <h3 className="text-xl font-medium text-black mb-4 flex items-center">
                                    <Heart className="w-5 h-5 mr-3" />
                                    Natural Remedies
                                </h3>
                                <div className="space-y-3">
                                    {submittedData.home_remedies.map((remedy, idx) => (
                                        <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700 text-sm leading-relaxed">{remedy}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggested Tests */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg animate-slide-up animate-delay-200">
                                <h3 className="text-xl font-medium text-black mb-4 flex items-center">
                                    <TestTube className="w-5 h-5 mr-3" />
                                    Recommended Tests
                                </h3>
                                <div className="space-y-3">
                                    {submittedData.suggested_tests.map((test, idx) => (
                                        <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700 text-sm leading-relaxed">{test}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Age-based Diseases */}
                        <div className="mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg animate-slide-up animate-delay-400">
                            <h3 className="text-xl font-medium text-black mb-4 flex items-center">
                                <Calendar className="w-5 h-5 mr-3" />
                                Age-Related Health Risks
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(submittedData.possible_diseases_by_age).map(([ageRange, diseases], idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-gray-50">
                                        <h4 className="text-black font-medium mb-2">Ages {ageRange}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {diseases.map((disease, diseaseIdx) => (
                                                <span key={diseaseIdx} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-200">
                                                    {disease}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Daily Routine & Meals */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg animate-slide-up animate-delay-600">
                                <h3 className="text-xl font-medium text-black mb-4 flex items-center">
                                    <Calendar className="w-5 h-5 mr-3" />
                                    Daily Routine
                                </h3>
                                <div className="space-y-3">
                                    {submittedData.daily_routine_and_meals.routine.map((item, idx) => (
                                        <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50">
                                            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium">
                                                {idx + 1}
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg animate-slide-up animate-delay-800">
                                <h3 className="text-xl font-medium text-black mb-4 flex items-center">
                                    <Utensils className="w-5 h-5 mr-3" />
                                    Meal Plan
                                </h3>
                                <div className="space-y-4">
                                    {Object.entries(submittedData.daily_routine_and_meals.meals).map(([mealType, meal], idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-gray-50">
                                            <h4 className="text-black font-medium mb-2 capitalize">{mealType}</h4>
                                            <p className="text-gray-700 text-sm leading-relaxed">{meal}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
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
                                className="inline-flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-gray-900 font-medium text-white bg-black rounded-full px-8 py-4 shadow-lg"
                            >
                                Analyze Again
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <header className="py-4 md:py-6 animate-fade-in sticky top-0 z-10 bg-[#cfddea]/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-lg tracking-tight">Cura AI</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-medium">
                        <a href="/" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                            Home
                        </a>
                        <a href="analyzer" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                            Analyzer
                        </a>
                        <a href="chat" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700 font-semibold">
                            Chatbot
                        </a>
                    </nav>
                </div>
            </header>
            <div className="bg-[#cfddea] text-[#0f0f0f] min-h-screen py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                    <HeartPlus className="w-5 h-5 text-white" />
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight">
                                    Health Data Analyzer
                                </h1>
                            </div>
                            <p className="text-gray-600 text-lg">
                                Discover insights about your wellness journey
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 animate-slide-up">
                                <h2 className="text-2xl font-medium text-black mb-6 flex items-center tracking-tight">
                                    <Heart className="w-6 h-6 mr-3" />
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
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
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                                            placeholder="Your age"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Gender *
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
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
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 animate-slide-up animate-delay-200">
                                <h2 className="text-2xl font-medium text-black mb-6 flex items-center tracking-tight">
                                    <TrendingUp className="w-6 h-6 mr-3" />
                                    Physical Measurements
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
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
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                                            placeholder="Height in cm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
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
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                                            placeholder="Weight in kg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Lifestyle & Health Habits */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 animate-slide-up animate-delay-400">
                                <h2 className="text-2xl font-medium text-black mb-6 flex items-center tracking-tight">
                                    <Activity className="w-6 h-6 mr-3" />
                                    Lifestyle & Health Habits
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Activity Level *
                                        </label>
                                        <select
                                            name="activityLevel"
                                            value={formData.activityLevel}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
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
                                        <label className="block text-sm font-medium text-gray-700">
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
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                                            placeholder="Hours of sleep"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
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
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                                            placeholder="Glasses per day"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Exercise Frequency *
                                        </label>
                                        <select
                                            name="exerciseFrequency"
                                            value={formData.exerciseFrequency}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
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
                                        <label className="block text-sm font-medium text-gray-700">
                                            Smoking Status *
                                        </label>
                                        <select
                                            name="smokingStatus"
                                            value={formData.smokingStatus}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="">Select status</option>
                                            <option value="never">Never smoked</option>
                                            <option value="former">Former smoker</option>
                                            <option value="current">Current smoker</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Alcohol Consumption *
                                        </label>
                                        <select
                                            name="alcoholConsumption"
                                            value={formData.alcoholConsumption}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
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
                                    <label className="block text-sm font-medium text-gray-700">
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
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>Low (1)</span>
                                        <span className="font-medium text-black">Current: {formData.stressLevel || 'Not set'}</span>
                                        <span>High (10)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Information */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 animate-slide-up animate-delay-600">
                                <h2 className="text-2xl font-medium text-black mb-6 flex items-center tracking-tight">
                                    <TestTube className="w-6 h-6 mr-3" />
                                    Medical Information
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Medical Conditions (if any)
                                        </label>
                                        <textarea
                                            name="medicalConditions"
                                            value={formData.medicalConditions}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="List any medical conditions, allergies, or health concerns"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Current Medications (if any)
                                        </label>
                                        <textarea
                                            name="medications"
                                            value={formData.medications}
                                            onChange={handleInputChange}
                                            rows="3"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="List current medications and supplements"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center pt-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-gray-900 font-medium text-white bg-black rounded-full px-12 py-4 shadow-lg group"
                                >
                                    <Heart className="w-5 h-5 group-hover:animate-pulse" />
                                    Analyze My Health Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }
                
                .animate-delay-200 {
                    animation-delay: 0.2s;
                }
                
                .animate-delay-400 {
                    animation-delay: 0.4s;
                }
                
                .animate-delay-600 {
                    animation-delay: 0.6s;
                }
                
                .animate-delay-800 {
                    animation-delay: 0.8s;
                }
                
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #000000;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
                
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #000000;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
            `}</style>
            </div>
        </>
    );
}