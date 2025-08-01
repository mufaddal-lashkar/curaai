"use client"
import React from 'react';
import Head from 'next/head';
import {
  TrendingUp,
  Menu,
  PlayCircle,
  ArrowRight,
  Users,
  Star,
  Award,
  Play,
  Bookmark,
  Clock,
  Calendar,
  BarChart3,
  Monitor,
  ShieldCheck,
  Bitcoin,
  Coins,
  HeartPlus,
  HeartPulse,
  Activity,
  Stethoscope
} from 'lucide-react';

const CryptoLearnHomePage = () => {
  return (
    <>
      <Head>
        <title>Cura AI - Know More. Live Better.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-[#cfddea] text-[#0f0f0f] antialiased min-h-screen">
        {/* Background Image */}
        <div
          className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: "url('/background.jpg')"
          }}
        />


        {/* Header */}
        <header className="py-6 animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center">
                <HeartPlus className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">Cura AI</span>
            </a>

            <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
              <a href="analyzer" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                Analyzer
              </a>
              <a href="chat" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                Chatbot
              </a>
              {/* <a href="#" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                Curriculum
              </a>
              <a href="#" className="transition-colors flex items-center gap-2 hover:text-black text-gray-700">
                Reviews
              </a> */}
            </nav>

            <button className="hidden sm:inline-flex transition-all hover:shadow-md hover:bg-gray-100 text-sm font-medium text-black bg-white rounded-full px-6 py-2 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] items-center justify-center">
              CONTACT US
            </button>

            <button className="md:hidden p-2 rounded-lg transition-colors hover:bg-white/20">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <section className="mx-auto max-w-7xl px-6 pb-20">
            <div className="md:rounded-3xl md:p-16 lg:p-24 overflow-hidden bg-white/50 rounded-b-3xl p-8 shadow-[rgba(255,_255,_255,_0.1)_0px_1px_1px_0px_inset,_rgba(50,_50,_93,_0.25)_0px_50px_100px_-20px,_rgba(0,_0,_0,_0.3)_0px_30px_60px_-30px] backdrop-blur-md">

              {/* Hero Section */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {/* Social Proof Badge */}
                  <div className="flex items-center bg-[#f1f2f3] rounded-full pl-4 pr-6 py-2 w-max mb-8 animate-slide-up">
                    <div className="flex -space-x-3">
                      {[
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=320&q=80",
                        "https://images.unsplash.com/photo-1468218457742-ee484fe2fe4c?w=320&q=80",
                        "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=320&q=80",
                        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=320&q=80",
                        "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=320&q=80"
                      ].map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          className="w-8 h-8 rounded-full border-2 object-cover border-white"
                          alt="Student"
                        />
                      ))}
                    </div>
                    <span className="ml-4 text-sm font-medium">
                      <span className="font-semibold">12.5k</span> Lives Improved with Cura AI’s Guidance
                    </span>
                  </div>

                  {/* Hero Title */}
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-tight animate-slide-up animate-delay-200 font-medium tracking-tight mt-2 mb-2">
                    Cura AI - Know More. Live Better.
                    <br className="hidden sm:block" />
                  </h1>

                  {/* Hero Description */}
                  <p className="text-base sm:text-lg max-w-xl animate-slide-up animate-delay-400 mt-6 text-gray-600">
                    From daily health basics to personalized care insights, unlock the secrets of better living with our all-in-one AI health companion. Join thousands who&apos;ve already taken charge of their well-being with Cura AI.
                  </p>

                  {/* CTA Buttons */}
                  <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-600">
                    <a
                      href="analyzer"
                      className="inline-flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:bg-gray-900 font-medium text-white bg-black rounded-full px-8 py-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Get Personalized Care
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    {/* <a
                      href="#"
                      className="inline-flex items-center justify-center gap-2 font-medium px-8 py-4 rounded-full border transition-all hover:shadow-md bg-white hover:bg-gray-100 text-black border-gray-200"
                    >
                      <Users className="w-4 h-4" />
                      Meet Our Team
                    </a> */}
                  </div>

                  {/* Stats */}
                  <div className="mt-12 flex items-center gap-8 animate-slide-up animate-delay-800">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Industry Certified</span>
                    </div>
                  </div>
                </div>

                {/* Hero Image Section */}
                <div className="relative animate-slide-up animate-delay-400">
                  <div className="relative rounded-3xl overflow-hidden h-80 sm:h-[28rem] shadow-2xl">
                    <img
                      src="https://cdn.midjourney.com/bb972d04-5615-480a-bdd9-75cf76f6bec5/0_0.png?w=800&q=80"
                      alt="Crypto trading dashboard"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Instructor Info */}
                    <div className="absolute top-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=320&q=80"
                          className="w-6 h-6 rounded-full border-2 object-cover border-white"
                          alt="Instructor"
                        />
                        <span className="text-xs font-medium">Cura AI, AI powered doctor</span>
                      </div>
                      <p className="text-xs leading-4 max-w-[200px] backdrop-blur-sm rounded-lg p-2 bg-black/20">
                        &quot;From basic anatomy to clinical excellence in 8 weeks. I&apos;ll guide you through every step of your medical journey!&quot;
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="backdrop-blur-sm rounded-full p-2 transition-colors bg-white/20 hover:bg-white/30">
                        <Play className="w-4 h-4 text-white" />
                      </button>
                      <button className="backdrop-blur-sm rounded-full p-2 transition-colors bg-white/20 hover:bg-white/30">
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="backdrop-blur-sm rounded-lg p-3 bg-white/10">
                        <div className="flex items-center justify-between text-sm text-white">
                          <span>Current Module: Cura AI</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            2 min
                          </span>
                        </div>
                        <div className="mt-2 rounded-full h-1 bg-white/20">
                          <div className="rounded-full h-1 w-2/3 bg-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-4 -right-4 bg-white border-gray-100 border rounded-2xl p-4 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Medical Accuracy</p>
                        <p className="text-xs text-gray-600">+82% precise and accurate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Info Cards */}
              <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Calendar,
                    label: "Duration",
                    value: "8 Weeks",
                    subtitle: "Self-paced",
                    gradient: "from-blue-50 to-white",
                    border: "border-blue-100",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    delay: "animate-delay-200"
                  },
                  {
                    icon: BarChart3,
                    label: "Level",
                    value: "Beginner+",
                    subtitle: "No medical knowledge needed",
                    gradient: "from-purple-50 to-white",
                    border: "border-purple-100",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    delay: "animate-delay-400"
                  },
                  {
                    icon: Monitor,
                    label: "Format",
                    value: "Online",
                    subtitle: "Live + Recorded",
                    gradient: "from-orange-50 to-white",
                    border: "border-orange-100",
                    iconBg: "bg-orange-100",
                    iconColor: "text-orange-600",
                    delay: "animate-delay-600"
                  },
                  {
                    icon: ShieldCheck,
                    label: "Certification",
                    value: "Verified",
                    subtitle: "Healthcare trusted",
                    gradient: "from-green-50 to-white",
                    border: "border-green-100",
                    iconBg: "bg-green-100",
                    iconColor: "text-green-600",
                    delay: "animate-delay-800"
                  }
                ]
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center bg-gradient-to-br border rounded-2xl px-6 py-8 hover:shadow-lg transition-all animate-slide-up ${item.delay} ${item.gradient} ${item.border}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.iconBg}`}>
                        <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <span className="text-sm mb-1 text-gray-600">{item.label}</span>
                      <span className="font-semibold text-lg">{item.value}</span>
                      <span className="text-xs text-gray-500 mt-1">{item.subtitle}</span>
                    </div>
                  ))}
              </div>

              {/* Course Modules */}
              <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Stethoscope, // Use a relevant medical icon here
                    title: "Symptom Analysis",
                    description: "Understand your symptoms with AI-powered insights and get personalized health suggestions instantly.",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    delay: "animate-delay-200"
                  },
                  {
                    icon: Activity, // Represents health or vitals tracking
                    title: "Vitals & History",
                    description: "Track your vitals and medical history to improve diagnosis accuracy and health monitoring.",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    delay: "animate-delay-400"
                  },
                  {
                    icon: HeartPulse, // Represents preventive care or health tips
                    title: "Preventive Care Tips",
                    description: "Receive daily health tips, lifestyle suggestions, and early warning signs based on your data.",
                    iconBg: "bg-green-100",
                    iconColor: "text-green-600",
                    delay: "animate-delay-600"
                  }
                ]
                  .map((module, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl p-6 transition-colors animate-slide-up ${module.delay} bg-gray-50 hover:bg-gray-100`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${module.iconBg}`}>
                          <module.icon className={`w-5 h-5 ${module.iconColor}`} />
                        </div>
                        <h3 className="font-semibold">{module.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </main>

        {/* Custom Styles for Animations */}
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
            opacity: 0;
          }
          .animate-slide-up {
            animation: slideUp 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
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
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default CryptoLearnHomePage;