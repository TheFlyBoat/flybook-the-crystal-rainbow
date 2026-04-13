import React from 'react';

const RainbowGlowEffect = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden flex items-center justify-center">
            {/* Primary Pulsing Rainbow Base */}
            <div className="absolute inset-0 opacity-40 animate-rainbow-cycle transition-opacity duration-2000" />

            {/* Radiant Rotating Beams */}
            <div className="absolute w-[300vw] h-[300vw] opacity-30 animate-spin-slow origin-center">
                <div
                    className="w-full h-full"
                    style={{
                        background: 'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff00ff, #ff0000)',
                        maskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 80%)'
                    }}
                />
            </div>

            {/* Shimmering Center (The source of light) */}
            <div className="absolute w-64 h-64 bg-white rounded-full blur-[80px] opacity-60 animate-pulse-fast transition-all duration-1000" />

            {/* Sparkle Particles (Twinkling stars from CSS) */}
            <div className="bg-magic-stars opacity-40" />

            {/* Vignette to focus on book */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.2)] pointer-events-none" />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes rainbow-cycle {
                    0% { background: rgba(255, 0, 0, 0.1); }
                    20% { background: rgba(0, 255, 0, 0.1); }
                    40% { background: rgba(0, 255, 255, 0.1); }
                    60% { background: rgba(0, 0, 255, 0.1); }
                    80% { background: rgba(255, 0, 255, 0.1); }
                    100% { background: rgba(255, 0, 0, 0.1); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse-fast {
                    0%, 100% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.3); opacity: 0.7; }
                }
                .animate-rainbow-cycle {
                    animation: rainbow-cycle 8s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-pulse-fast {
                    animation: pulse-fast 2.5s ease-in-out infinite;
                }
            `}} />
        </div>
    );
};

export default RainbowGlowEffect;
