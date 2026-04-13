import React from 'react';

const EngravedRiddle = () => {
    const lines = [
        "Br1ght s*y",
        "A mg1c y0u",
        "W0rd s",
        "Dy Crystl"
    ];

    return (
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none select-none z-30">
            {/* The Text Block - centered over the slate image */}
            <div className="relative flex flex-col gap-2 md:gap-4 text-center max-w-[85%]">
                {lines.map((line, idx) => (
                    <div
                        key={idx}
                        className="font-serif italic font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest engraved-text"
                        style={{
                            /* Dark slate/gray carved color */
                            color: 'rgba(15, 23, 42, 0.75)',
                            /* Internal shadow/chisel look */
                            textShadow: 'rgba(255, 255, 255, 0.25) 0px 1px 1px, rgba(0, 0, 0, 0.5) 0px -1px 0px',
                            filter: 'contrast(1.2)'
                        }}
                    >
                        {line}
                    </div>
                ))}

                {/* Subtle Magic Breath */}
                <div className="absolute -inset-8 bg-purple-600/5 blur-[60px] animate-pulse rounded-full z-0"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .engraved-text {
                    text-transform: uppercase;
                    opacity: 0.9;
                }
                `
            }} />
        </div>
    );
};

export default EngravedRiddle;
