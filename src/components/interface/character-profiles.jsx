import React, { useState } from 'react';
import { useBook } from "from "../../context/book-context"";
import { charactersData } from "from "../../data/characters-data"";
import { X, Heart, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const CharacterProfiles = () => {
    const { showCharacters, setShowCharacters } = useBook();
    const [activeId, setActiveId] = useState(charactersData[0].id);

    if (!showCharacters) return null;

    const activeChar = charactersData.find(c => c.id === activeId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setShowCharacters(false)}
            />

            {/* Profile Card */}
            <div className={`relative w-full max-w-5xl h-[85vh] bg-gradient-to-br ${activeChar.color} rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white/30 flex flex-col md:flex-row transition-all duration-700`}>

                {/* Close Button */}
                <button
                    onClick={() => setShowCharacters(false)}
                    className="absolute top-6 right-6 z-30 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all hover:rotate-90"
                >
                    <X size={32} />
                </button>

                {/* Media Side (Laura's Video or Others' Images) */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black/20">
                    {activeChar.video ? (
                        <video
                            src={activeChar.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img loading="lazy"
                            src={activeChar.image}
                            alt={activeChar.name}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Media Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col items-center">
                    <div className="w-full">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-white/20 px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest">{activeChar.title}</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg tracking-tight">{activeChar.name}</h2>

                        <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-10 font-medium italic">
                            "{activeChar.bio}"
                        </p>

                        <div className="space-y-4 mb-12">
                            <h3 className="text-white text-sm font-black uppercase tracking-[0.2em] opacity-60">Fun Facts</h3>
                            {activeChar.facts.map((fact, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        {i === 0 ? <Heart size={20} className="text-pink-300" fill="currentColor" /> :
                                            i === 1 ? <Star size={20} className="text-yellow-300" fill="currentColor" /> :
                                                <Sparkles size={20} className="text-cyan-300" fill="currentColor" />}
                                    </div>
                                    <span className="text-white font-bold text-lg">{fact}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Character Selector at Bottom */}
                    <div className="mt-auto pt-8 border-t border-white/10 w-full">
                        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-6 text-center">Meet the Friends</h3>
                        <div className="flex justify-center gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar">
                            {charactersData.map(char => (
                                <button
                                    key={char.id}
                                    onClick={() => setActiveId(char.id)}
                                    className={`group relative flex flex-col items-center transition-all duration-500 
                                ${activeId === char.id ? 'scale-110 opacity-100' : 'scale-90 opacity-40 hover:opacity-80'}`}
                                >
                                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 
                                ${activeId === char.id ? 'border-white ring-4 ring-white/20' : 'border-white/20'}`}>
                                        {char.video ? (
                                            <video src={char.video} muted className="w-full h-full object-cover" />
                                        ) : (
                                            <img loading="lazy" src={char.image} alt={char.name} className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <span className="mt-2 text-[10px] font-black text-white uppercase tracking-tighter">{char.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default CharacterProfiles;
