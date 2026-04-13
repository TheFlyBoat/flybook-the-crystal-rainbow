import React, { useState, useEffect } from 'react';

const MagicTranslation = () => {
    const [phase, setPhase] = useState('scrambled'); // 'scrambled', 'swirling', 'translated'

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase('swirling'), 2000);
        const timer2 = setTimeout(() => setPhase('translated'), 5500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const scrambledLines = [
        "Br1ght s*y",
        "A mg1c y0u",
        "W0rd s",
        "Dy Crystl"
    ];

    const translatedLines = [
        "Rainbow Crystal,",
        "bright as day,",
        "A magic word",
        "you must say."
    ];

    return (
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none select-none z-30 overflow-hidden">
            <div className="relative w-full max-w-[85%] text-center">

                {/* 1. SCRAMBLED STAGE (Fading out) */}
                {phase === 'scrambled' && (
                    <div className="flex flex-col gap-2 md:gap-4 animate-fade-out-slow">
                        {scrambledLines.map((line, idx) => (
                            <div key={idx} className="font-serif italic font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest text-[#1e293b]/70 engraved-style">
                                {line}
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. SWIRLING STAGE (Chaos of letters/particles) */}
                {phase === 'swirling' && (
                    <div className="relative h-64 flex items-center justify-center">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-purple-400 font-bold text-2xl animate-magic-swirl"
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    left: '50%',
                                    top: '50%'
                                }}
                            >
                                {['✨', 'magic', 'sparkle', 'glow'][i % 4]}
                            </div>
                        ))}
                        <div className="absolute inset-0 bg-purple-500/20 blur-[100px] animate-pulse rounded-full shadow-[0_0_100px_rgba(168,85,247,0.4)]"></div>
                    </div>
                )}

                {/* 3. TRANSLATED STAGE (Glowing and clear) */}
                {phase === 'translated' && (
                    <div className="flex flex-col gap-2 md:gap-4 animate-magic-reveal">
                        {translatedLines.map((line, idx) => (
                            <div
                                key={idx}
                                className="font-serif italic font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide text-white translated-style"
                                style={{
                                    textShadow: '0 0 10px rgba(168,85,247,0.8), 0 0 20px rgba(168,85,247,0.4), 0 0 30px rgba(255,255,255,0.6)'
                                }}
                            >
                                {line}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-out-slow {
                    0% { opacity: 1; filter: blur(0) brightness(1); }
                    100% { opacity: 0; filter: blur(12px) brightness(2); }
                }
                @keyframes magic-swirl {
                    0% { transform: rotate(0deg) translate(0) scale(0); opacity: 0; filter: hue-rotate(0deg); }
                    20% { opacity: 1; transform: rotate(144deg) translate(100px) scale(1.5); }
                    80% { opacity: 1; transform: rotate(576deg) translate(150px) scale(1); }
                    100% { transform: rotate(1080deg) translate(300px) scale(0); opacity: 0; filter: hue-rotate(360deg); }
                }
                @keyframes magic-reveal {
                    0% { transform: scale(1.2) translateY(20px); opacity: 0; filter: blur(20px) brightness(3); }
                    50% { opacity: 0.8; filter: blur(5px) brightness(1.5); }
                    100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0) brightness(1); }
                }
                @keyframes glow-pulse {
                    0%, 100% { text-shadow: 0 0 10px rgba(168,85,247,0.8), 0 0 20px rgba(168,85,247,0.4), 0 0 30px rgba(255,255,255,0.6); }
                    50% { text-shadow: 0 0 20px rgba(168,85,247,1), 0 0 40px rgba(168,85,247,0.6), 0 0 60px rgba(255,255,255,0.8); }
                }
                .animate-fade-out-slow { animation: fade-out-slow 2.5s ease-in forwards; }
                .animate-magic-swirl { animation: magic-swirl 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                .animate-magic-reveal { animation: magic-reveal 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .translated-style {
                    animation: glow-pulse 2s infinite ease-in-out;
                }
                
                .engraved-style {
                    text-transform: uppercase;
                    text-shadow: rgba(255, 255, 255, 0.25) 0px 1px 1px, rgba(0, 0, 0, 0.5) 0px -1px 0px;
                }
                .translated-style {
                    text-transform: uppercase;
                }
                `
            }} />
        </div>
    );
};

export default MagicTranslation;
