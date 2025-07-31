"use client"
import { useState, useRef, useEffect } from "react";
import { Send, Heart, User, Loader2, RefreshCw, MessageCircle, Sparkles, Activity } from "lucide-react";

export default function CuraChatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    }, [input]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user", content: input.trim() };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput("");
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server returned non-JSON response');
            }

            const data = await res.json();

            if (!data.success && data.error) {
                throw new Error(data.error);
            }

            if (!data.reply) {
                throw new Error('No reply received from API');
            }

            setMessages([...newMessages, { role: "assistant", content: data.reply }]);
        } catch (err) {
            let errorMessage = "I'm having trouble connecting right now. Please try again in a moment.";

            if (err.message.includes('HTTP error! status: 404')) {
                errorMessage = "API endpoint not found. Check if /api/chat exists.";
            } else if (err.message.includes('Non-JSON response')) {
                errorMessage = "Server configuration issue. Please contact support.";
            } else if (err.message.includes('Failed to fetch')) {
                errorMessage = "Network error. Please check your internet connection.";
            }

            setError(errorMessage);
            console.error('Chat error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const clearChat = () => {
        setMessages([]);
        setError("");
    };

    return (
        <div className="bg-[#cfddea] text-[#0f0f0f] min-h-screen max-h-fit">
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
                            <Heart className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-lg tracking-tight">Cura AI</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
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

                    {messages.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="hidden sm:inline-flex transition-all hover:shadow-md hover:bg-gray-100 text-sm font-medium text-black bg-white rounded-full px-6 py-2 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            NEW CHAT
                        </button>
                    )}
                </div>
            </header>

            {/* Main Chat Container */}
            <main className="mx-auto max-w-7xl h-fit px-6 pb-6">
                <div className="md:rounded-3xl overflow-hidden bg-white/50 rounded-b-3xl shadow-[rgba(255,_255,_255,_0.1)_0px_1px_1px_0px_inset,_rgba(50,_50,_93,_0.25)_0px_50px_100px_-20px,_rgba(0,_0,_0,_0.3)_0px_30px_60px_-30px] backdrop-blur-md h-[calc(100vh-120px)] flex flex-col">

                    {/* Chat Header */}
                    <div className="border-b border-gray-200/50 px-8 py-6 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 animate-slide-up">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center shadow-lg">
                                        <Heart className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-semibold text-black">Your Health Assistant</h1>
                                    <p className="text-sm text-gray-600 font-medium">Always here to help with your wellness journey</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 animate-slide-up animate-delay-200">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-medium">Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 h-fit p-8">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full animate-fade-in">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-700 rounded-full flex items-center justify-center shadow-2xl">
                                        <MessageCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                <h2 className="text-4xl font-medium text-black mb-3 tracking-tight">
                                    How can I help you today?
                                </h2>
                                <p className="text-lg text-gray-600 mb-12 max-w-2xl text-center leading-relaxed">
                                    Share your health concerns, ask about symptoms, or get personalized wellness advice. I'm here to guide you towards better health.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
                                    {[
                                        { text: "I have a headache and feel tired", icon: "🤕" },
                                        { text: "What are some natural remedies for stress?", icon: "🧘" },
                                        { text: "How can I improve my sleep quality?", icon: "😴" },
                                        { text: "I need advice on healthy eating habits", icon: "🥗" }
                                    ].map((suggestion, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInput(suggestion.text)}
                                            className={`group p-6 text-left bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up ${i === 0 ? 'animate-delay-200' : i === 1 ? 'animate-delay-400' : i === 2 ? 'animate-delay-600' : 'animate-delay-800'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl">{suggestion.icon}</span>
                                                <span className="text-gray-700 group-hover:text-black transition-colors font-medium text-base">{suggestion.text}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl max-w-2xl animate-slide-up animate-delay-1000">
                                    <div className="flex items-start gap-3">
                                        <Activity className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-blue-800 text-sm font-semibold mb-1">
                                                Important Disclaimer
                                            </p>
                                            <p className="text-blue-700 text-sm leading-relaxed">
                                                I provide general health information and guidance, but I'm not a substitute for professional medical advice. Please consult a healthcare provider for serious concerns.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 max-w-4xl mx-auto">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex animate-slide-up ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        <div className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                            {/* Avatar */}
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === "user"
                                                ? "bg-gradient-to-br from-green-500 to-green-600"
                                                : "bg-gradient-to-br from-black to-gray-700"
                                                }`}>
                                                {msg.role === "user" ? (
                                                    <User className="w-5 h-5 text-white" />
                                                ) : (
                                                    <Heart className="w-5 h-5 text-white" />
                                                )}
                                            </div>

                                            {/* Message */}
                                            <div className={`px-6 py-4 rounded-2xl shadow-lg max-w-2xl ${msg.role === "user"
                                                ? "bg-gradient-to-br from-black to-gray-800 text-white rounded-tr-md"
                                                : "bg-gradient-to-br from-gray-50 to-white border border-gray-200 text-gray-800 rounded-tl-md"
                                                }`}>
                                                <div className="whitespace-pre-wrap break-words leading-relaxed text-base">
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Loading indicator */}
                                {isLoading && (
                                    <div className="flex justify-start animate-fade-in">
                                        <div className="flex gap-4 max-w-3xl">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-black to-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                                                <Heart className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="px-6 py-4 rounded-2xl rounded-tl-md bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex gap-1">
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                                    </div>
                                                    <span className="text-gray-600 font-medium">Analyzing your health concern...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="px-8 pb-4 animate-fade-in">
                            <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 text-red-700 px-5 py-3 rounded-2xl text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>{error}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="border-t border-gray-200/50 p-8 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm">
                        <div className="relative max-w-4xl mx-auto">
                            <textarea
                                ref={textareaRef}
                                className="w-full px-6 py-4 pr-16 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-800 placeholder-gray-500 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black/30 max-h-32 overflow-hidden transition-all duration-200 text-base shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06)]"
                                placeholder="Describe your symptoms or health concerns..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                rows={1}
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 bottom-3 w-10 h-10 bg-gradient-to-br from-black to-gray-800 hover:from-gray-800 hover:to-black disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-gray-600 mt-3 text-center font-medium max-w-4xl mx-auto">
                            Cura AI provides general health information and wellness guidance. Always consult healthcare professionals for medical advice and serious health concerns.
                        </p>
                    </div>
                </div>
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
                .animate-delay-1000 {
                    animation-delay: 1.0s;
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
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 3px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}