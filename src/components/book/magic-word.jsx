import React from 'react';
import { useBook } from "../../context/book-context";

// We can define categories of onomatopoeias for different sound/color mappings
const MAGIC_WORD_REGISTRY = {
    // Taps & Bumps
    'tap': "/assets/audio/sfx/tap.mp3",
    'bump': "/assets/audio/sfx/bump.mp3",
    'creak': "/assets/audio/sfx/creak.mp3",
    'tick': "/assets/audio/sfx/tick.mp3",

    // Bouncy
    'boing': "/assets/audio/sfx/boing.mp3",
    'pop': "/assets/audio/sfx/pop.mp3",
    'bounce': "/assets/audio/sfx/bounce.mp3",

    // Nature & Movement
    'buzz': "/assets/audio/sfx/buzz.mp3",
    'whoosh': "/assets/audio/sfx/whoosh.mp3",
    'whooosh': "/assets/audio/sfx/whoosh.mp3",
    'gloop': "/assets/audio/sfx/gloop.mp3",
    'glop': "/assets/audio/sfx/gloop.mp3",
    'blub': "/assets/audio/sfx/blub.mp3",
    'rush': "/assets/audio/sfx/rush.mp3",
    'gush': "/assets/audio/sfx/gush.mp3",
    'splash': "/assets/audio/sfx/splash.mp3",
    'flutter': "/assets/audio/sfx/flutter.mp3",

    // Eating/Action
    'crunch': "/assets/audio/sfx/crunch.mp3",
    'munch': "/assets/audio/sfx/munch.mp3",
    'slurp': "/assets/audio/sfx/slurp.mp3",

    // Magic/Atmosphere
    'sparkle': "/assets/audio/sfx/sparkle.mp3",
    'shimmer': "/assets/audio/sfx/shimmer.mp3",
    'flicker': "/assets/audio/sfx/flicker.mp3",
    'flick': "/assets/audio/sfx/flicker.mp3",
    'flickered': "/assets/audio/sfx/flicker.mp3",
    'vooooom': "/assets/audio/sfx/vooooom.mp3",

    // Misc Actions
    'eek': "/assets/audio/sfx/eek.mp3",
    'click': "/assets/audio/sfx/click.mp3",
    'clack': "/assets/audio/sfx/clack.mp3",
    'puff': "/assets/audio/sfx/puff.mp3",
};

const MAGIC_WORD_COLORS = [
    'from-amber-400 to-orange-500',
    'from-rose-400 to-pink-500',
    'from-emerald-400 to-teal-500',
    'from-sky-400 to-indigo-500',
    'from-violet-400 to-purple-500',
    'from-orange-400 to-red-500',
    'from-lime-400 to-green-500',
    'from-cyan-400 to-blue-500'
];

const MagicWord = ({ children }) => {
    const { playSFX } = useBook();

    // Use children string to determine a stable color index
    const text = children.toString();
    const colorIndex = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorClass = MAGIC_WORD_COLORS[colorIndex % MAGIC_WORD_COLORS.length];

    // Better sound lookup: find the first word from the registry that appears in the children
    const findSound = () => {
        const normalized = text.toLowerCase();
        const registryWords = Object.keys(MAGIC_WORD_REGISTRY);
        // Sort by length descending to match longer words first (e.g., 'whooosh' before 'whoosh')
        registryWords.sort((a, b) => b.length - a.length);

        for (const word of registryWords) {
            if (normalized.includes(word)) {
                return MAGIC_WORD_REGISTRY[word];
            }
        }
        return null;
    };

    const sfxSrc = findSound();

    const handleClick = (e) => {
        e.stopPropagation();
        if (sfxSrc) {
            playSFX(sfxSrc);
        }
        // Add a little visual bounce on click if we want
    };

    return (
        <button
            onClick={handleClick}
            className="magic-word-btn group relative inline-flex items-center justify-center 
                   px-3 py-1 mx-0.5
                   transition-transform duration-200 ease-out
                   hover:-translate-y-1 hover:scale-105
                   active:translate-y-0 active:scale-95"
            title={`Magic Word: ${children}`}
        >
            {/* Soft glow background */}
            <span className={`absolute inset-0 bg-gradient-to-br ${colorClass} 
                        opacity-0 group-hover:opacity-25 blur-md rounded-full 
                        transition-opacity duration-200`}
            />

            {/* The Text */}
            <span className={`relative z-10 font-bold tracking-wide
                        bg-gradient-to-br ${colorClass} bg-clip-text text-transparent
                        drop-shadow-md transition-all duration-200
                        group-hover:drop-shadow-lg`}
                style={{
                    fontFamily: "'Baloo 2', cursive",
                    fontSize: '1.25em'
                }}>
                {children}
            </span>
        </button>
    );
};

export default MagicWord;
export { MAGIC_WORD_REGISTRY };
