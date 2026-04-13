import React, { useState, useEffect, useRef } from 'react';
import { Hand } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBook } from "../../context/book-context";

const MediaRenderer = ({ data, isSolved, isLeftPage }) => {
    const { isInteractionActive, setIsInteractionActive, isNarrationPlaying } = useBook();
    const isPuzzleLocked = data.type === 'puzzle' && isNarrationPlaying && !isSolved;
    const [isHovered, setIsHovered] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const confettiFiredRef = useRef(false);

    // Reset video ended state when page changes
    useEffect(() => {
        setVideoEnded(false);
        confettiFiredRef.current = false;
    }, [data.id]);

    // Base source (including solved puzzles)
    let src = (isSolved && data.mediaSolved) ? data.mediaSolved : data.media;

    // --- INTERACTION OVERRIDE (highest priority) ---
    if (isInteractionActive && data.clickMedia) {
        src = data.clickMedia;
    }
    // --- HOVER OVERRIDE (only if NOT active) ---
    else if (!isInteractionActive && isHovered && data.hoverMedia) {
        src = data.hoverMedia;
    }

    if (!src) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative bg-gray-50">
                <div className="w-24 h-24 rounded-full bg-gray-200 blur-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
        );
    }

    // IMAGE
    const isVideo = src.match(/\.(mp4|webm|ogg)$|^data:video\//i) || data.mediaType === 'video';

    const renderClickHint = () => {
        if (!data.clickMedia || isInteractionActive) return null;
        return (
            <div className={`absolute top-6 ${isLeftPage ? 'left-6' : 'right-6'} z-20 pointer-events-none click-hint`}>
                <div className="bg-amber-400/80 backdrop-blur-md p-3 rounded-full border-2 border-white shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:bg-amber-300 transition-colors">
                    <Hand size={32} className="text-white fill-white/40 drop-shadow-md" />
                </div>
            </div>
        );
    };

    const triggerPuzzleConfetti = () => {
        const duration = 2500;
        const end = Date.now() + duration;
        const colors = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#ef4444', '#8b5cf6', '#F59E0B'];

        (function frame() {
            const timeLeft = end - Date.now();
            if (timeLeft <= 0) return;

            confetti({
                particleCount: 7,
                angle: 70,
                spread: 95,
                startVelocity: 60,
                origin: { x: 0, y: 0.7 },
                colors: colors,
                zIndex: 100,
                scalar: 3.5,
                drift: 0.9,
            });

            confetti({
                particleCount: 7,
                angle: 110,
                spread: 95,
                startVelocity: 60,
                origin: { x: 1, y: 0.7 },
                colors: colors,
                zIndex: 100,
                scalar: 3.5,
                drift: 0.9,
            });

            requestAnimationFrame(frame);
        }());
    };

    useEffect(() => {
        let timer;
        if (isInteractionActive && data.confettiOnClick && !confettiFiredRef.current) {
            confettiFiredRef.current = true;
            const delay = isVideo ? 3000 : 5000;
            timer = setTimeout(triggerPuzzleConfetti, delay);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isInteractionActive, data.confettiOnClick, isVideo]);

    if (isVideo) {
        if (videoEnded && data.fallbackImage) {
            return (
                <div className={`w-full h-full relative ${data.clickMedia ? 'cursor-pointer group' : ''} transition-all duration-700 ${isPuzzleLocked ? 'opacity-50 grayscale' : ''}`}>
                    <img loading="lazy"
                        src={data.fallbackImage}
                        alt={data.imageAlt}
                        className="w-full h-full object-cover"
                    />
                    {renderClickHint()}
                </div>
            );
        }

        return (
            <div className={`w-full h-full relative bg-black ${data.clickMedia ? 'cursor-pointer group' : ''} transition-all duration-700 ${isPuzzleLocked ? 'opacity-50 grayscale' : ''}`}
                onClick={() => {
                    if (data.clickMedia) {
                        setIsInteractionActive(!isInteractionActive);
                    }
                }}
            >
                <video
                    key={`${data.id}-${src}`} // Force re-render on src or page change
                    src={src}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop={!data.noLoop}
                    muted={!data.playSound}
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                />
                {renderClickHint()}
            </div>
        );
    }

    return (
        <div className={`w-full h-full relative ${data.clickMedia ? 'cursor-pointer group' : ''} transition-all duration-700 ${isPuzzleLocked ? 'opacity-50 grayscale' : ''}`}
            onClick={() => {
                if (data.clickMedia) {
                    setIsInteractionActive(!isInteractionActive);
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img loading="lazy"
                src={src}
                alt={data.imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x800?text=Image+Not+Found';
                }}
            />
            {renderClickHint()}
        </div>
    );
};

export default MediaRenderer;
