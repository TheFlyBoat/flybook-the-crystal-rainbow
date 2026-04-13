import React from 'react';
import { useBook } from "from "../../context/book-context"";
import { puzzleBadges, endingBadges } from "from "../../data/badge-data.jsx"";
import { Trophy, Zap } from 'lucide-react';

const BadgeOverlay = () => {
    const { completedEndings, completedPuzzles } = useBook();

    const isEarned = (list, id) => list.includes(id);

    return (
        <div className="absolute left-6 top-32 w-72 pointer-events-auto z-20 transition-all duration-700 animate-fade-in">
            <div className="card-chest w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
                {/* Brass Latch */}
                <div className="chest-brass-latch">
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-900 border-2 border-white shadow-inner" />
                </div>

                {/* Lid */}
                <div className="chest-lid">
                    ✨ Treasure ✨
                </div>

                {/* Body (Inside Chest) */}
                <div className="p-6 pt-12 space-y-8 bg-black/20 backdrop-blur-sm">
                    {/* Story Endings Section */}
                    <section>
                        <h3 className="text-amber-200/50 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="h-0.5 flex-1 bg-amber-200/20" />
                            Magic Charms
                            <div className="h-0.5 flex-1 bg-amber-200/20" />
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {endingBadges.map(badge => (
                                <div
                                    key={badge.id}
                                    title={badge.label}
                                    className={`badge-charm aspect-square rounded-2xl flex items-center justify-center relative group
                                        ${isEarned(completedEndings, badge.id) ? 'badge-earned' : 'opacity-20 grayscale scale-90'}`}
                                >
                                    {/* Jewel/Charm Circle */}
                                    <div className={`absolute inset-0 rounded-full border-4 border-white shadow-lg ${badge.color} saturation-150 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.3)]`} />
                                    <div className="relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                        {React.cloneElement(badge.icon, { size: 32, strokeWidth: 3 })}
                                    </div>

                                    {/* Tooltip on hover */}
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white text-amber-900 font-black text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border-2 border-amber-100 uppercase">
                                        {badge.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Puzzle Stars Section */}
                    <section>
                        <h3 className="text-amber-200/50 font-black text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <div className="h-0.5 flex-1 bg-amber-200/20" />
                            Discovery Stars
                            <div className="h-0.5 flex-1 bg-amber-200/20" />
                        </h3>
                        <div className="grid grid-cols-4 gap-3">
                            {puzzleBadges.map(badge => (
                                <div
                                    key={badge.id}
                                    className={`w-full aspect-square flex items-center justify-center transition-all duration-500 badge-charm
                                        ${isEarned(completedPuzzles, badge.id)
                                            ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] scale-110 rotate-0'
                                            : 'text-white/10 -rotate-12 scale-90 grayscale'}`}
                                >
                                    {React.cloneElement(badge.icon, { size: 24, strokeWidth: 3 })}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Floating Key Sticker (as seen in mockup) */}
            <div className="absolute -left-10 bottom-0 w-24 h-24 animate-pulse">
                <div className="w-full h-full rounded-full border-8 border-white bg-gradient-to-br from-cyan-400 to-blue-500 shadow-xl flex items-center justify-center text-white rotate-[-20deg]">
                    {/* Using a key icon to match mockup's "Magic Key" */}
                    <span className="text-4xl drop-shadow-lg">🔑</span>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
            </div>
        </div>
    );
};

export default BadgeOverlay;
