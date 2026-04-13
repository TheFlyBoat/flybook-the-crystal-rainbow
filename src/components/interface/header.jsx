import React, { useState } from 'react';
import { useBook } from "from "../../context/book-context"";
import {
    Info,
    Moon,
    Sun,
    Volume2,
    VolumeX,
    Mic,
    MicOff,
    ThumbsUp,
    ThumbsDown,
    X,
    MessageSquare
} from 'lucide-react';

const Header = () => {
    const {
        isSoundOn,
        setIsSoundOn,
        isSoundEffectsOn,
        setIsSoundEffectsOn,
        theme,
        setTheme
    } = useBook();

    const [showInfo, setShowInfo] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'up' or 'down'
    const [feedbackText, setFeedbackText] = useState('');

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'auto' : 'dark');
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback submitted:", { feedback, text: feedbackText });
        // placeholder for future email logic
        alert("Thank you for your feedback!");
        setShowInfo(false);
        setFeedback(null);
        setFeedbackText('');
    };

    return (
        <div className="h-20 flex items-center justify-between px-6 md:px-10 relative z-50 pointer-events-none">
            {/* LOGO (TOP LEFT) */}
            <div className="flex items-center gap-2 pointer-events-auto">
                <img loading="lazy"
                    src=""/assets/image/logo.webp""
                    alt="Logo"
                    className="h-10 md:h-14 w-auto object-contain"
                />
            </div>

            {/* SETTINGS BAR (TOP RIGHT) */}
            <div className="flex items-center gap-3 pointer-events-auto">
                {/* Info Button */}
                <button
                    onClick={() => setShowInfo(true)}
                    className="setting-circle setting-lime"
                    title="Settings & Info"
                >
                    <Info size={24} strokeWidth={3} />
                </button>

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    className="setting-circle setting-blue"
                    title="Dark Mode"
                >
                    {theme === 'dark' ? <Sun size={24} strokeWidth={3} /> : <Moon size={24} strokeWidth={3} />}
                </button>

                {/* Sound Effects Toggle */}
                <button
                    onClick={() => setIsSoundEffectsOn(!isSoundEffectsOn)}
                    className="setting-circle setting-green"
                    title="Sound Effects"
                >
                    {isSoundEffectsOn ? <Volume2 size={24} strokeWidth={3} /> : <VolumeX size={24} strokeWidth={3} />}
                </button>

                {/* Narrator Toggle */}
                <button
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    className="setting-circle setting-orange"
                    title="Narrator Voice"
                >
                    {isSoundOn ? <Mic size={24} strokeWidth={3} /> : <MicOff size={24} strokeWidth={3} />}
                </button>
            </div>

            {/* INFO MODAL */}
            {showInfo && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto animate-fade-in z-[60]">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border-[8px] border-white relative">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 flex justify-between items-center text-white">
                            <h2 className="text-2xl font-black uppercase tracking-wider">About the Book</h2>
                            <button onClick={() => setShowInfo(false)} className="hover:rotate-90 transition-transform">
                                <X size={32} strokeWidth={3} />
                            </button>
                        </div>

                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            {/* Privacy Policy */}
                            <section className="mb-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    Privacy Policy
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed bg-blue-50 p-4 rounded-2xl">
                                    We respect your privacy. This application designed for children does not collect,
                                    store, or share any personally identifiable information. Your interactions with
                                    the story are processed locally on your device. Any feedback provided is sent
                                    directly and securely.
                                </p>
                            </section>

                            <hr className="border-gray-100 mb-8" />

                            {/* Feedback Form */}
                            <section>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <MessageSquare size={20} className="text-blue-500" />
                                    Your Feedback
                                </h3>
                                <div className="flex gap-4 mb-6">
                                    <button
                                        onClick={() => setFeedback('up')}
                                        className={`flex-1 py-4 rounded-2xl border-4 transition-all flex flex-col items-center gap-1
                                            ${feedback === 'up' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-emerald-50'}
                                        `}
                                    >
                                        <ThumbsUp size={32} />
                                        <span className="font-bold text-xs uppercase">Love it!</span>
                                    </button>
                                    <button
                                        onClick={() => setFeedback('down')}
                                        className={`flex-1 py-4 rounded-2xl border-4 transition-all flex flex-col items-center gap-1
                                            ${feedback === 'down' ? 'bg-rose-50 border-rose-500 text-rose-600' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-rose-50'}
                                        `}
                                    >
                                        <ThumbsDown size={32} />
                                        <span className="font-bold text-xs uppercase">Needs help</span>
                                    </button>
                                </div>

                                <textarea
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    placeholder="Tell us what you think..."
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 transition-colors resize-none mb-6 h-32"
                                />

                                <button
                                    disabled={!feedback}
                                    onClick={handleFeedbackSubmit}
                                    className={`w-full py-5 rounded-[2rem] font-black text-xl shadow-lg transition-all transform active:scale-95
                                        ${feedback ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                                    `}
                                >
                                    SEND FEEDBACK
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
