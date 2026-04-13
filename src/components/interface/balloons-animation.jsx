import React, { useEffect, useState, useMemo } from 'react';

const BALLOON_COLORS = [
    { bg: 'rgba(168, 85, 247, 0.8)', glow: 'rgba(168, 85, 247, 0.4)', name: 'purple' },
    { bg: 'rgba(236, 72, 153, 0.8)', glow: 'rgba(236, 72, 153, 0.4)', name: 'pink' },
    { bg: 'rgba(249, 115, 22, 0.8)', glow: 'rgba(249, 115, 22, 0.4)', name: 'orange' },
    { bg: 'rgba(255, 255, 255, 0.9)', glow: 'rgba(255, 255, 255, 0.3)', name: 'white' },
    { bg: 'rgba(199, 210, 254, 0.8)', glow: 'rgba(199, 210, 254, 0.4)', name: 'lavender' }
];

const BalloonsAnimation = ({ count = 25 }) => {
    const [balloons, setBalloons] = useState([]);

    useEffect(() => {
        const newBalloons = Array.from({ length: count }).map((_, i) => ({
            id: i,
            color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
            left: Math.random() * 100, // percentage
            delay: Math.random() * 15, // seconds
            duration: 7 + Math.random() * 8, // speed
            size: 40 + Math.random() * 40, // width
            swayDelay: Math.random() * 5
        }));
        setBalloons(newBalloons);
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            {balloons.map((b) => (
                <div
                    key={b.id}
                    className="absolute"
                    style={{
                        bottom: '-150px',
                        left: `${b.left}%`,
                        animation: `float-up ${b.duration}s linear ${b.delay}s infinite`,
                    }}
                >
                    <div
                        className="relative"
                        style={{
                            animation: `sway 4s ease-in-out ${b.swayDelay}s infinite alternate`
                        }}
                    >
                        {/* Balloon Body */}
                        <div
                            className="rounded-full relative shadow-lg"
                            style={{
                                width: `${b.size}px`,
                                height: `${b.size * 1.25}px`,
                                backgroundColor: b.color.bg,
                                boxShadow: `0 0 20px ${b.color.glow}, inset -10px -10px 20px rgba(0,0,0,0.1)`,
                                border: '1px solid rgba(255,255,255,0.3)'
                            }}
                        >
                            {/* Highlight / Shine */}
                            <div className="absolute top-[15%] left-[20%] w-[25%] h-[15%] bg-white/40 rounded-full rotate-[-45deg]" />
                        </div>

                        {/* Tie (Triangle) */}
                        <div
                            className="mx-auto"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderBottom: `10px solid ${b.color.bg}`,
                                marginTop: '-2px'
                            }}
                        />

                        {/* String */}
                        <div
                            className="bg-gray-400/40 mx-auto"
                            style={{
                                width: '1px',
                                height: '100px',
                                transformOrigin: 'top center'
                            }}
                        />
                    </div>
                </div>
            ))}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float-up {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-120vh); opacity: 0; }
                }
                @keyframes sway {
                    0% { transform: translateX(-20px) rotate(-5deg); }
                    100% { transform: translateX(20px) rotate(5deg); }
                }
            `}} />
        </div>
    );
};

export default BalloonsAnimation;
