import React, { useState } from 'react';
import { useBook } from "from "../../context/book-context"";
import { Settings, Printer, X, Moon, Sun, Volume2, VolumeX, PlayCircle, PauseCircle } from 'lucide-react';
import { charactersData } from "from "../../data/characters-data"";

const ParentalGate = () => {
    const {
        isSoundOn, setIsSoundOn,
        isAutoplay, setIsAutoplay,
        theme, setTheme,
        showCharacters, setShowCharacters
    } = useBook();

    const [isUnlocked, setIsUnlocked] = useState(false);
    const [numPad, setNumPad] = useState('');
    const [isParentOpen, setIsParentOpen] = useState(false);

    const checkAnswer = (val) => {
        if (val === '8') {
            setIsUnlocked(true);
        } else {
            setNumPad('');
        }
    };

    if (!isParentOpen) {
        return (
            <div className="absolute right-8 top-12 pointer-events-auto z-50 flex items-start gap-6">
                {/* Character Strip */}
                <div className="flex flex-col gap-4 pt-24 translate-x-4">
                    {charactersData.slice(0, 5).map(char => (
                        <button
                            key={char.id}
                            onClick={() => setShowCharacters(true)}
                            className="w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden transition-all hover:scale-110 active:scale-95 bg-white ring-4 ring-emerald-500/10"
                        >
                            <img loading="lazy" src={char.image} alt={char.name} className="w-full h-full object-cover" />
                        </button>
                    ))}
                    <button className="w-14 h-14 rounded-full border-4 border-white shadow-md flex items-center justify-center bg-gray-50 text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                {/* Lilo Guide Trigger */}
                <button
                    onClick={() => setIsParentOpen(true)}
                    className="lilo-guide animate-lilo-float w-24 h-24 flex items-center justify-center group"
                    title="Parent Settings"
                >
                    <img loading="lazy"
                        src=""/assets/image/lilo-leaf.png""
                        alt="Lilo the Leaf"
                        className="w-full h-full object-contain filter drop-shadow-lg"
                        onError={(e) => {
                            e.target.src = "https://cdn-icons-png.flaticon.com/512/892/892917.png"; // Fallback leaf
                        }}
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-2 py-1 rounded-full text-[8px] font-black text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter shadow-sm border border-emerald-100">
                        Grown-Ups
                    </div>
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-emerald-950/20 backdrop-blur-md z-50 flex items-center justify-end p-10 pointer-events-auto">
            <div
                className="absolute inset-0"
                onClick={() => { setIsParentOpen(false); setIsUnlocked(false); }}
            />

            <div className="card-leafy w-96 relative transition-all duration-500 animate-fade-in shadow-[0_35px_80px_-15px_rgba(6,78,59,0.3)]">
                {/* Header */}
                <div className="leafy-header relative">
                    🍃 Parent Gate 🍃
                    <button
                        onClick={() => { setIsParentOpen(false); setIsUnlocked(false); }}
                        className="absolute right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    {!isUnlocked ? (
                        <div className="text-center space-y-8">
                            <h3 className="text-emerald-700 font-black text-xl uppercase tracking-wider">Secret Challenge</h3>
                            <p className="text-emerald-600/60 font-black text-lg p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                                What is Three + <span className="text-emerald-700 underline decoration-4 underline-offset-4">Five</span>?
                            </p>

                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
                                    <button
                                        key={n}
                                        onClick={() => checkAnswer(n.toString())}
                                        className="btn-leafy aspect-square text-2xl shadow-[0_4px_0_rgba(16,185,129,0.1)] active:translate-y-1 active:shadow-none"
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Only for big explorers!</p>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                                    <Settings size={24} />
                                </div>
                                <h3 className="text-emerald-700 font-black text-lg uppercase">Device Settings</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setIsSoundOn(!isSoundOn)}
                                    className={`p-5 rounded-[2rem] border-4 flex flex-col items-center gap-3 transition-all
                                        ${isSoundOn ? 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-300'}`}
                                >
                                    {isSoundOn ? <Volume2 size={40} /> : <VolumeX size={40} />}
                                    <span className="font-black text-xs">SOUND</span>
                                </button>

                                <button
                                    onClick={() => setIsAutoplay(!isAutoplay)}
                                    className={`p-5 rounded-[2rem] border-4 flex flex-col items-center gap-3 transition-all
                                        ${isAutoplay ? 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-300'}`}
                                >
                                    {isAutoplay ? <PlayCircle size={40} /> : <PauseCircle size={40} />}
                                    <span className="font-black text-xs">AUTO</span>
                                </button>

                                <button
                                    onClick={() => setTheme(theme === 'auto' ? 'dark' : 'auto')}
                                    className="p-5 rounded-[2rem] bg-emerald-50 border-4 border-emerald-200 text-emerald-500 flex flex-col items-center gap-3 hover:border-emerald-400 transition-colors"
                                >
                                    {theme === 'dark' ? <Moon size={40} /> : <Sun size={40} />}
                                    <span className="font-black text-xs">THEME</span>
                                </button>

                                <button className="p-5 rounded-[2rem] bg-emerald-50 border-4 border-emerald-200 text-emerald-500 flex flex-col items-center gap-3 hover:border-emerald-400 transition-colors">
                                    <Printer size={40} />
                                    <span className="font-black text-xs">PRINT</span>
                                </button>
                            </div>

                            <button
                                onClick={() => setIsUnlocked(false)}
                                className="w-full py-5 mt-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95"
                            >
                                Lock & Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParentalGate;
