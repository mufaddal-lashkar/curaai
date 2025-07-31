"use client"
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, RefreshCw, Heart, Stethoscope, MessageCircle, Mic } from "lucide-react";

export default function Home() {
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

            console.log("REPLY :: ", res)

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
            let errorMessage = "Sorry, I'm having trouble connecting right now. Please try again in a moment.";

            if (err.message.includes('HTTP error! status: 404')) {
                errorMessage = "API endpoint not found. Check if /api/chat exists.";
            } else if (err.message.includes('Non-JSON response')) {
                errorMessage = "Server configuration issue. Please contact support.";
            } else if (err.message.includes('Failed to fetch')) {
                errorMessage = "Network error. Please check your internet connection.";
            }

            setError(errorMessage);
            console.error('Chat error:', err);
            console.error('Error details:', err.message);
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
        <div className="flex flex-col h-screen text-white bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Header */}
            <div className="bg-gray-800/80 backdrop-blur-lg border-b border-gray-700/50 px-6 py-4 shadow-xl">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">MediBot</h1>
                            <p className="text-sm text-gray-400 font-medium">Your Personal Health Assistant</p>
                        </div>
                    </div>
                    {messages.length > 0 && (
                        <button
                            onClick={clearChat}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>New Consultation</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    {messages.length === 0 ? (
                        <div className="text-center py-16 animate-fade-in">
                            <div className="relative mb-8">
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                                    <Stethoscope className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-3">
                                Welcome to MediBot
                            </h2>
                            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                                Your compassionate AI health assistant. I'm here to help with health questions, provide guidance, and support your wellbeing journey.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                                {[
                                    { text: "I have a headache and fever", icon: "🤒" },
                                    { text: "What are some home remedies for cold?", icon: "🏠" },
                                    { text: "I'm feeling stressed lately", icon: "😰" },
                                    { text: "Need advice on healthy eating", icon: "🥗" }
                                ].map((suggestion, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setInput(suggestion.text)}
                                        className="group p-5 text-left bg-gray-800/60 backdrop-blur-sm border border-gray-700/40 rounded-2xl hover:border-blue-500/50 hover:bg-gray-700/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{suggestion.icon}</span>
                                            <span className="text-gray-200 group-hover:text-white transition-colors font-medium">{suggestion.text}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl max-w-2xl mx-auto">
                                <p className="text-yellow-200 text-sm">
                                    <strong>Disclaimer:</strong> I provide general health information and guidance, but I'm not a substitute for professional medical advice. Please consult a healthcare provider for serious concerns.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className={`flex space-x-4 max-w-4xl ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                                        {/* Avatar */}
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === "user"
                                            ? "bg-gradient-to-r from-green-500 to-green-600"
                                            : "bg-gradient-to-r from-blue-500 to-indigo-500"
                                            }`}>
                                            {msg.role === "user" ? (
                                                <User className="w-5 h-5 text-white" />
                                            ) : (
                                                <Stethoscope className="w-5 h-5 text-white" />
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div className={`px-6 py-4 rounded-3xl shadow-lg max-w-2xl ${msg.role === "user"
                                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-tr-lg"
                                            : "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white rounded-tl-lg"
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
                                    <div className="flex space-x-4 max-w-4xl">
                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <Stethoscope className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="px-6 py-4 rounded-3xl rounded-tl-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                                </div>
                                                <span className="text-gray-300 font-medium">Analyzing your symptoms...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="max-w-4xl mx-auto px-6 pb-4 animate-fade-in">
                    <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-300 px-5 py-3 rounded-2xl text-sm font-medium">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span>{error}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="bg-transparent px-6 py-6">
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <textarea
                            ref={textareaRef}
                            className="w-full px-6 py-4 pr-24 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-400 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 max-h-32 overflow-hidden transition-all duration-200 text-base shadow-lg"
                            placeholder="Describe your symptoms or health concerns..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={isLoading}
                        />
                        <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5 text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 text-center font-medium">
                        MediBot provides general health information. Always consult healthcare professionals for medical advice.
                    </p>
                </div>
            </div>
        </div>
    );
}