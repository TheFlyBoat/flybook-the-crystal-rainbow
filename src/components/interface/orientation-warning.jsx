import React, { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';

const OrientationWarning = () => {
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            // Display warning if portrait AND on a mobile/tablet sized screen (less than 1024px width/height average)
            const isVertical = window.innerHeight > window.innerWidth;
            const isSmallScreen = window.innerWidth <= 1024 || window.innerHeight <= 1024;
            setIsPortrait(isVertical && isSmallScreen);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    if (!isPortrait) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-emerald-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center text-white">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes rotate-phone {
                    0% { transform: rotate(0deg); }
                    30% { transform: rotate(-90deg); }
                    70% { transform: rotate(-90deg); }
                    100% { transform: rotate(0deg); }
                }
                .anim-rotate-phone { animation: rotate-phone 3s ease-in-out infinite; }
            `}} />
            <div className="mb-8 border-4 border-white/20 p-8 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.3)] bg-emerald-900/50">
                <Smartphone size={80} className="anim-rotate-phone text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-wider font-baloo text-emerald-100">
                Turn Your Device
            </h2>
            <p className="font-sans text-xl md:text-2xl text-emerald-100/80 max-w-sm leading-relaxed font-bold">
                This magical book needs to be opened sideways to see all the pictures and puzzles perfectly!
            </p>
        </div>
    );
};

export default OrientationWarning;
