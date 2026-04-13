import React, { useState, useEffect } from 'react';
import { Monitor, Tablet } from 'lucide-react';

const OrientationWarning = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDeviceSize = () => {
            // Display warning if screen is too narrow or too short for the 3D book spread
            const isTooSmall = window.innerWidth < 850 || window.innerHeight < 550;
            // Additional check for mobile user agents as a fallback
            const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            setIsMobile(isTooSmall || isMobileUA);
        };

        checkDeviceSize();
        window.addEventListener('resize', checkDeviceSize);
        return () => window.removeEventListener('resize', checkDeviceSize);
    }, []);

    if (!isMobile) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-emerald-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center text-white">
            <div className="mb-8 border-4 border-white/20 p-8 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.3)] bg-emerald-900/50 flex gap-4">
                <Tablet size={60} className="text-emerald-400 opacity-80" />
                <Monitor size={60} className="text-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-wider font-baloo text-emerald-100">
                Bigger Screen Needed
            </h2>
            <p className="font-sans text-xl md:text-2xl text-emerald-100/80 max-w-md leading-relaxed font-bold">
                This magical book is quite large! <br /><br />
                Please use a Tablet or Desktop Computer to experience all the puzzles and animations properly.
            </p>
        </div>
    );
};

export default OrientationWarning;
