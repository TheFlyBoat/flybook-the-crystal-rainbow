import React from 'react';
import { useBook } from "from "../../context/book-context"";
import { charactersData } from "from "../../data/characters-data"";
import { Users, Star } from 'lucide-react';

const FriendsSidebar = () => {
    const { setShowCharacters, showCharacters } = useBook();

    return (
        <div className="absolute right-2 top-16 bottom-4 w-24 flex flex-col items-center py-3 px-1.5 pointer-events-none z-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

            {/* Friends Access Button */}
            <div className="flex flex-col items-center w-full mb-3 pointer-events-auto">
                <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.1em] mb-1">Friends</span>
                <button
                    onClick={() => setShowCharacters(true)}
                    className={`relative p-2 rounded-full shadow-md border-2 transition-all duration-300
                        ${showCharacters
                            ? 'bg-purple-500 text-white border-white/40'
                            : 'bg-white/10 text-white/40 border-white/10 hover:bg-white/20 hover:text-white hover:border-white/30'}
                    `}
                >
                    <Users size={24} />
                    {showCharacters && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5 text-white shadow-sm ring-1 ring-white">
                            <Star size={8} fill="currentColor" />
                        </div>
                    )}
                </button>
            </div>

            <div className="w-full h-[1px] bg-white/5 mb-3"></div>

            {/* Quick Character Selection */}
            <div className="flex-1 w-full flex flex-col items-center overflow-y-auto no-scrollbar pointer-events-auto">
                <span className="text-[7px] font-black text-white/30 uppercase tracking-[0.1em] mb-2">Meet Them</span>
                <div className="grid grid-cols-2 gap-x-1 gap-y-3 w-full">
                    {charactersData.map(char => (
                        <button
                            key={char.id}
                            onClick={() => setShowCharacters(true)}
                            className="flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
                        >
                            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
                                {char.video ? (
                                    <video src={char.video} muted className="w-full h-full object-cover" />
                                ) : (
                                    <img loading="lazy" src={char.image} alt={char.name} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <span className="mt-1 text-[6px] font-black uppercase tracking-tighter text-white/40 group-hover:text-white/80 transition-colors">
                                {char.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default FriendsSidebar;
