import React from 'react';
import { PlayCircle, Volume2, VolumeX, Hand, Mic, MicOff } from 'lucide-react';

const OnboardingView = () => {
    return (
        <div className="flex-1 flex flex-col px-4 md:px-12 py-8 relative w-full h-full font-sans justify-center">

            {/* Title Section */}
            <div className="text-center mb-8">
                <h1 className="font-baloo text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-wide drop-shadow-sm">
                    <span className="text-pink-500">How </span>
                    <span className="text-sky-500">to </span>
                    <span className="text-emerald-500">Play</span>
                </h1>
                <p className="text-slate-500 text-sm md:text-lg font-medium">Welcome to a magical interactive adventure!</p>
            </div>

            {/* Instructions List */}
            <div className="flex flex-col gap-6 md:gap-8 max-w-2xl mx-auto w-full">

                {/* 1. Page Turning */}
                <div className="flex items-start gap-4 bg-white/50 p-4 rounded-3xl border-2 border-slate-100 shadow-sm">
                    <div className="relative flex-shrink-0 w-12 h-12 flex justify-center items-center">
                        <div className="absolute w-8 h-8 bg-blue-500 rounded-full animate-breathe blur-[2px]"></div>
                        <div className="absolute w-8 h-8 bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="font-baloo text-xl md:text-2xl font-bold text-slate-800">Turn the Pages</h3>
                        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed mt-1">Tap the pulsing blue circle at the <span className="font-bold text-blue-600 uppercase">bottom corners</span> of the book (or swipe) to go forward and back.</p>
                    </div>
                </div>

                {/* 2. Audio Controls */}
                <div className="flex items-start gap-4 bg-white/50 p-4 rounded-3xl border-2 border-slate-100 shadow-sm">
                    <div className="flex-shrink-0 flex flex-col gap-2 relative top-1">
                        <div className="w-10 h-10 rounded-full bg-[#10b981] text-white flex justify-center items-center shadow-md">
                            <Volume2 className="w-5 h-5" strokeWidth={3} />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#f97316] text-white flex justify-center items-center shadow-md">
                            <Mic className="w-5 h-5" strokeWidth={3} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-baloo text-xl md:text-2xl font-bold text-slate-800">Magical Sounds</h3>
                        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed mt-1">
                            Listen to the story! You can toggle the story's sound effects <Volume2 className="inline w-4 h-4 text-[#10b981] mx-1" /> and the narrator's voice <Mic className="inline w-4 h-4 text-[#f97316] mx-1" /> using the colorful buttons at the top of the screen.
                        </p>
                    </div>
                </div>

                {/* 3. Interactive Hand */}
                <div className="flex items-start gap-4 bg-white/50 p-4 rounded-3xl border-2 border-slate-100 shadow-sm">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(251,191,36,0.5)] flex justify-center items-center">
                        <Hand className="w-6 h-6 text-white fill-white/40 drop-shadow-md" />
                    </div>
                    <div>
                        <h3 className="font-baloo text-xl md:text-2xl font-bold text-slate-800">Puzzles & Secrets</h3>
                        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed mt-1">
                            When you see the golden hand icon, it means there is a puzzle to solve or a secret to uncover! Tap the objects to interact.
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default OnboardingView;
