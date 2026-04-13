import React, { useState, useEffect, useRef } from 'react';

const CoverPage = ({ onOpen }) => {
    const [state, setState] = useState('idle'); // idle, animating, crystal-reveal, exiting
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const audioRef = useRef(null);

    // Timings
    const CRYSTAL_TRIGGER = 1000; // Time start rainbow -> Crystal appears
    const EXIT_DELAY = 1500; // How long to admire crystal before opening

    // Setup Audio
    useEffect(() => {
        // Attempt to play magic sound. 
        const audioPath = "'/assets/audio/items/magic-chime.mp3'";
        audioRef.current = new Audio(audioPath);
        audioRef.current.volume = 0.6;

        audioRef.current.onerror = () => {
            console.log("Magic chime audio not found. Please upload 'magic_chime.mp3' to public/assets/audio/");
        };
    }, []);

    const handleMouseMove = (e) => {
        if (state !== 'idle') {
            setRotation({ x: 0, y: 0 }); // Reset when animating
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = (x / rect.width) - 0.5;
        const yPct = (y / rect.height) - 0.5;

        setRotation({
            x: -yPct * 20,
            y: xPct * 20
        });
    };

    const handleCoverClick = () => {
        if (state !== 'idle') return;
        setState('animating');
        setRotation({ x: 0, y: 0 });

        // Play Sound
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
        }

        // Sequence
        // 1. Rainbow starts immediately (CSS transition)
        // 2. Crystal reveals
        setTimeout(() => {
            setState('crystal-reveal');

            // 3. Open Book
            setTimeout(() => {
                setState('opening');

                // Actual navigation happens just before the book is fully "gone" or open
                setTimeout(() => {
                    onOpen();
                }, 1000);
            }, EXIT_DELAY);

        }, CRYSTAL_TRIGGER);
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full p-4 perspective-2000">
            {/* Book Container - Anchored Left for Opening */}
            <div
                className={`relative w-full max-w-[800px] aspect-square transition-all ease-in-out transform-style-3d cursor-pointer group`}
                style={{
                    // If opening, swing left (-125deg). Otherwise, track mouse.
                    transform: state === 'opening'
                        ? 'translateZ(50px) rotateY(-125deg)'
                        : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transitionDuration: state === 'opening' ? '1200ms' : '300ms', // Slower for opening
                    transformOrigin: 'left center', // KEY: Swing from spine
                    zIndex: 10
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setRotation({ x: 0, y: 0 })}
                onClick={handleCoverClick}
            >
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-800 transform -translate-x-full origin-right skew-y-12 shadow-xl z-[-1]"></div>

                {/* Main Cover Body */}
                <div className="relative w-full h-full bg-white rounded-r-xl rounded-l-sm shadow-2xl overflow-hidden border-l-4 border-gray-700 backface-hidden">

                    {/* Layer 1: Background (Bottom) */}
                    <div className="absolute inset-0 z-0 bg-black">
                        <img loading="lazy"
                            src=""/assets/cover/cover-background.png""
                            alt="Background"
                            className="w-full h-full object-contain transform scale-105 pointer-events-none"
                            style={{ transform: `translate(${rotation.y * -0.5}px, ${rotation.x * -0.5}px) scale(1.05)` }}
                        />
                    </div>

                    {/* Layer 2: Rainbow Trail */}
                    <div
                        className={`absolute inset-0 z-10 transition-all duration-[2000ms] ease-in-out`}
                        style={{
                            clipPath: state === 'idle' ? 'circle(0% at 100% 0%)' : 'circle(150% at 100% 0%)',
                            zIndex: 10,
                            transform: `translate(${rotation.y * 0.8}px, ${rotation.x * 0.8}px)`
                        }}
                    >
                        <img loading="lazy"
                            src=""/assets/cover/trail-and-crystal.png""
                            alt="Rainbow Trail"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Layer 3: Crystal (Now correctly ABOVE trail) */}
                    <div
                        className={`absolute inset-0 z-20 transition-all duration-1000 ${state === 'crystal-reveal' || state === 'opening' ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transform: `translate(${rotation.y * 0.8}px, ${rotation.x * 0.8}px)`,
                            transition: 'opacity 1s ease-out'
                        }}
                    >
                        <img loading="lazy"
                            src=""/assets/cover/crystal.png""
                            alt="Crystal"
                            className="w-full h-full object-contain"
                        />
                        {/* Crystal Sheen */}
                        {(state === 'crystal-reveal' || state === 'opening') && (
                            <div className="absolute inset-0 z-10 mix-blend-screen"
                                style={{
                                    maskImage: 'url(/assets/cover/crystal.png)',
                                    WebkitMaskImage: 'url(/assets/cover/crystal.png)',
                                    maskSize: 'contain',
                                    WebkitMaskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskRepeat: 'no-repeat',
                                    maskPosition: 'center',
                                    WebkitMaskPosition: 'center'
                                }}
                            >
                                <div className="w-[50%] h-[200%] absolute top-[-50%] left-[-50%] bg-gradient-to-r from-transparent via-white to-transparent rotate-[25deg] animate-sheen-fast opacity-100"></div>
                            </div>
                        )}
                    </div>

                    {/* Layer 4: Text - Rainbow Crystal */}
                    <div
                        className="absolute inset-0 z-30 pointer-events-none transition-transform duration-100"
                        style={{ transform: `translate(${rotation.y * 1.5}px, ${rotation.x * 1.5}px)` }}
                    >
                        <TextLayer src=""/assets/cover/text-rainbow-crystal.png"" alt="Rainbow Crystal" sheenDelay="1.5s" />
                    </div>

                    {/* Layer 5: Text - Laura */}
                    <div
                        className="absolute inset-0 z-40 pointer-events-none transition-transform duration-100"
                        style={{ transform: `translate(${rotation.y * 2}px, ${rotation.x * 2}px)` }}
                    >
                        <TextLayer src=""/assets/cover/text-laura.png"" alt="Laura" sheenDelay="0.5s" />
                    </div>

                    {/* Hint Pulse */}
                    {state === 'idle' && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-sm animate-pulse z-50 pointer-events-none">
                            Tap to Open
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TextLayer = ({ src, alt, sheenDelay = "0s" }) => {
    return (
        <div className="absolute inset-0 w-full h-full">
            <img loading="lazy" src={src} alt={alt} className="w-full h-full object-contain relative z-10" />

            {/* Sparkle */}
            <div className="absolute inset-0 z-20 mix-blend-overlay opacity-50 pointer-events-none"
                style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}>
                <div className="w-full h-full animate-noise" style={{ backgroundImage: `repeating-radial-gradient(#fff 0 0.0001%, #0000 0 0.0002%)`, backgroundSize: '100px 100px' }}></div>
            </div>

            {/* Sheen */}
            <div className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
                style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}>
                <div className="w-[50%] h-[200%] absolute top-[-50%] left-[-50%] bg-gradient-to-r from-transparent via-white to-transparent rotate-[45deg] animate-sheen-cycle opacity-80" style={{ animationDelay: sheenDelay }}></div>
            </div>
        </div>
    );
};

export default CoverPage;
