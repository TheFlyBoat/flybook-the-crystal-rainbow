import React, { useEffect, useState } from 'react';

const RainbowOverlay = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Wait 3 seconds to match audio start, then trigger the animation
        const timer = setTimeout(() => {
            setShow(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="absolute inset-x-0 top-0 h-[80vh] z-50 pointer-events-none overflow-hidden"
            style={{ mixBlendMode: 'screen' }}
        >
            <div
                className="absolute w-[150vw] left-[-25vw] top-[20%] aspect-[2/1] opacity-70"
                style={{
                    background: `radial-gradient(circle at bottom center, 
                        transparent 40%, 
                        #9333ea 40%, #9333ea 44%, 
                        #3b82f6 44%, #3b82f6 48%, 
                        #22c55e 48%, #22c55e 52%, 
                        #eab308 52%, #eab308 56%, 
                        #f97316 56%, #f97316 60%, 
                        #ef4444 60%, #ef4444 64%, 
                        transparent 64%)`,
                    filter: 'blur(16px)',
                    // Clip path animation from left to right to simulate drawing the rainbow
                    clipPath: show ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                    transition: 'clip-path 3s ease-in-out',
                }}
            />
        </div>
    );
};

export default RainbowOverlay;
