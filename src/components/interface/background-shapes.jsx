import React, { useMemo } from 'react';
import { useBook } from "../../context/book-context";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/700.css";

const BackgroundShapes = () => {
    const { currentHour, theme } = useBook();

    const palettes = useMemo(() => {
        const p = {};
        for (let h = 22; h <= 23; h++) p[h] = ['#020617', '#0f172a', '#1e293b', '#334155', '#1e1b4b', '#312e81', '#1e1b4b'];
        for (let h = 0; h <= 5; h++) p[h] = ['#020617', '#0f172a', '#1e293b', '#334155', '#1e1b4b', '#312e81', '#1e1b4b'];
        p[6] = ['#fff7ed', '#fde2e4', '#fad2e1', '#e2ece9', '#bee1e6', '#f0efeb', '#dfe7fd'];
        for (let h = 7; h <= 10; h++) {
            p[h] = ['#fffbd6', '#f2c2c2', '#e1dbfb', '#cffafe', '#ffffff', '#59f3cc', '#3dd8b5'];
        }
        for (let h = 11; h <= 15; h++) {
            p[h] = ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1'];
        }
        for (let h = 16; h <= 18; h++) {
            p[h] = ['#fffbeb', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309'];
        }
        p[19] = ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c'];
        for (let h = 20; h <= 21; h++) {
            p[h] = ['#4c1d95', '#5b21b6', '#6d28d9', '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'];
        }
        return p;
    }, []);

    const darkPalette = ['#02010a', '#0a0a2e', '#1a1a40', '#16213e', '#0f3460', '#1a1a2e', '#16213e'];
    const currentPalette = theme === 'dark' ? darkPalette : palettes[currentHour] || palettes[12];
    const [bg, ...layerColors] = currentPalette;
    const showStars = theme === 'dark' || currentHour < 6 || currentHour >= 20;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
            {/* The Solid Base Color Layer */}
            <div className="absolute inset-0 transition-colors duration-1000" style={{ backgroundColor: bg }} />

            {/* Twinkling Stars */}
            {showStars && (
                <div className="absolute inset-0 bg-magic-stars opacity-30 transition-opacity duration-1000" />
            )}

            {/* Wavy Bands - Now using a single blur on the container to prevent path-flicker */}
            <div className="absolute inset-0 overflow-hidden"
                style={{
                    filter: 'blur(50px)',
                    transform: 'translateZ(0)',
                    WebkitFilter: 'blur(50px)'
                }}>
                <svg className="w-full h-full opacity-90" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                    <WaveLayer color={layerColors[0]} index={1} baseHeight={180} amplitude={25} speed={40} />
                    <WaveLayer color={layerColors[1]} index={2} baseHeight={340} amplitude={35} speed={35} />
                    <WaveLayer color={layerColors[2]} index={3} baseHeight={500} amplitude={30} speed={45} />
                    <WaveLayer color={layerColors[3]} index={4} baseHeight={660} amplitude={40} speed={30} />
                    <WaveLayer color={layerColors[4]} index={5} baseHeight={820} amplitude={35} speed={38} />
                    <WaveLayer color={layerColors[5]} index={6} baseHeight={980} amplitude={30} speed={32} />
                </svg>
            </div>

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/5 mix-blend-overlay opacity-10" />
        </div>
    );
};

const WaveLayer = ({ color, index, baseHeight, amplitude, speed }) => {
    // Construct path
    const d = `
        M -200,${baseHeight} 
        C 200,${baseHeight - amplitude * 2} 800,${baseHeight + amplitude * 2} 1200,${baseHeight} 
        V 1200 H -200 Z
    `;

    return (
        <path
            d={d}
            fill={color}
            style={{
                animation: `wave-drift-${index % 2 === 0 ? 'right' : 'left'} ${speed}s ease-in-out infinite alternate`,
                transition: 'fill 2s ease-in-out',
                willChange: 'transform'
            }}
        />
    );
};

export default BackgroundShapes;
