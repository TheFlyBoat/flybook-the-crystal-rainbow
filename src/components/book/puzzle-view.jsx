import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Zap, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';
import { puzzleBadges } from "from "../../data/badge-data.jsx"";
import { useBook } from "from "../../context/book-context"";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/700.css";

const PuzzleView = ({
    currentPageData,
    puzzleSolved,
    handlePuzzleInteraction,
    goToNextPage,
    feedbackText,
    isSoundOn,
}) => {
    const { stopNarration, audioRef, isNarrationPlaying, playSFX } = useBook();
    const { puzzleType, items } = currentPageData;
    const [selectedItems, setSelectedItems] = useState([]);
    const [shakeItem, setShakeItem] = useState(null);
    const [localFeedback, setLocalFeedback] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [hoveredItemName, setHoveredItemName] = useState(null);

    // Lock puzzle interactions while narration is playing
    const isLocked = isNarrationPlaying;

    // Item Name Audio Ref
    const itemAudioRef = useRef(null);

    // Drag State for Beaver Puzzle
    const [dragItem, setDragItem] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Match Pairs State
    const [flippedItems, setFlippedItems] = useState([]); // Stores IDs of currently flipped cards

    // Initialize Audio on mount only
    useEffect(() => {
        itemAudioRef.current = new Audio();
        return () => {
            if (itemAudioRef.current) {
                itemAudioRef.current.pause();
                itemAudioRef.current = null;
            }
        };
    }, []);

    // Audio references
    useEffect(() => {
        setSelectedItems([]);
        setShakeItem(null);
        setLocalFeedback(null);
        setShowConfetti(false);
        setFlippedItems([]);
        setDragItem(null);

        // Cleanup Item Audio
        if (itemAudioRef.current) {
            itemAudioRef.current.pause();
            itemAudioRef.current.currentTime = 0;
        }
    }, [currentPageData.id]);

    // Confetti Effect triggered by state
    useEffect(() => {
        if (showConfetti) {
            stopNarration();
            if (currentPageData.successAudio && itemAudioRef.current) {
                try {
                    itemAudioRef.current.src = currentPageData.successAudio;
                    itemAudioRef.current.volume = 0.8;
                    const playPromise = itemAudioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => { });
                    }
                } catch (e) { }
            }
            const duration = 2500;
            const end = Date.now() + duration;
            // Added more vibrant colors
            const colors = ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#ef4444', '#8b5cf6', '#F59E0B'];

            (function frame() {
                const timeLeft = end - Date.now();
                if (timeLeft <= 0) return;

                // Launch particles from left edge
                confetti({
                    particleCount: 7,
                    angle: 70,
                    spread: 95,
                    startVelocity: 60,
                    origin: { x: 0, y: 0.7 },
                    colors: colors,
                    zIndex: 100,
                    scalar: 3.5, // 50% larger
                    drift: 0.9,
                });

                // Launch particles from right edge
                confetti({
                    particleCount: 7,
                    angle: 110,
                    spread: 95,
                    startVelocity: 60,
                    origin: { x: 1, y: 0.7 },
                    colors: colors,
                    zIndex: 100,
                    scalar: 3.5, // 50% larger
                    drift: -0.9,
                });

                requestAnimationFrame(frame);
            }());
        }
    }, [showConfetti]);

    const playItemName = (item) => {
        if (!isSoundOn || !itemAudioRef.current || puzzleSolved || showConfetti || isLocked) return;

        // Use hoverAudio if provided, otherwise fallback to conventional naming
        const audioPath = item.hoverAudio || `/assets/audio/items/${item.id}.mp3`;

        try {
            itemAudioRef.current.src = audioPath;
            itemAudioRef.current.volume = 0.5;
            itemAudioRef.current.load();

            const playPromise = itemAudioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // console.log("Missing item audio:", audioPath);
                });
            }
        } catch (e) {
            // Ignore errors
        }
    };

    const playSound = (type) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext || !isSoundOn) return;
        // ... (rest of playSound logic same as before, simplified check above)

        try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'correct') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            } else if (type === 'wrong') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.3, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
            } else if (type === 'victory') {
                const now = ctx.currentTime;
                [0, 0.2, 0.4, 0.8].forEach((delay, i) => {
                    const vOsc = ctx.createOscillator();
                    const vGain = ctx.createGain();
                    vOsc.connect(vGain);
                    vGain.connect(ctx.destination);

                    vOsc.type = 'triangle';
                    vOsc.frequency.value = 400 * (i + 1.5);
                    vGain.gain.setValueAtTime(0.2, now + delay);
                    vGain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.6);

                    vOsc.start(now + delay);
                    vOsc.stop(now + delay + 0.6);
                });
            }
        } catch (e) { }
    };

    const playNote = (frequency) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext || !isSoundOn) return;

        try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            // Soft musical sine wave
            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

            osc.start();
            osc.stop(ctx.currentTime + 1.2);
        } catch (e) { }
    };

    const getIncorrectMessage = (item) => {
        const id = currentPageData.id;
        if (id === 'page-5') return "Try something else.\nTeddy will stay safe at home.";
        if (id === 'page-9') return "This is a little bug!\nTry again.";
        if (id === 'page-12') return "Those two look different. Let's try again!";
        if (id === 'page-18') return "Not quite! What number comes next?";
        if (id === 'page-20') return "Hugo can't eat that.\nTry again!";
        if (id === 'page-23' || id === 'page-32' || id === 'page-43') return item.id;
        if (id === 'page-26') return "That shape doesn't fit.\nTry another one!";
        if (id === 'page-43') {
            if (item.id === 'Nothing here') return "Nothing here";
            if (item.id === 'Dinosaur Bone') return "Dinosaur Bone";
            return item.id;
        }
        if (id === 'page-45') return "That spell did not work! Try a different word.";
        return "Try again!";
    };

    const handleItemClick = (item) => {
        if (puzzleSolved || showConfetti || isLocked) return;

        // Logic: Packing Game
        if (puzzleType === 'packing') {
            if (item.correct) {
                // Already selected?
                if (selectedItems.includes(item.id)) return;

                playSound('correct');
                const newSelected = [...selectedItems, item.id];
                setSelectedItems(newSelected);
                setLocalFeedback(null); // Clear any error message

                // Check Win Condition
                const correctItems = items.filter(i => i.correct).map(i => i.id);
                const allCorrectSelected = correctItems.every(id => newSelected.includes(id));
                const exactMatch = allCorrectSelected && newSelected.length === correctItems.length;

                console.log(`[Puzzle Logic] selected=${newSelected.join(',')}, exactMatch=${exactMatch}, allCorrect=${allCorrectSelected}`);

                if (exactMatch) {
                    if (currentPageData.id === 'page-20') {
                        setTimeout(() => {
                            playSound('victory');
                            setShowConfetti(true);
                        }, 500); // Small pause before confetti
                        setTimeout(() => {
                            handlePuzzleInteraction();
                        }, 3500); // Longer delay to allow full custom audio to play
                    } else {
                        playSound('victory');
                        setShowConfetti(true);
                        setTimeout(() => {
                            handlePuzzleInteraction();
                        }, 2800);
                    }
                }
            } else {
                playSound('wrong');
                setShakeItem(item.id);
                setLocalFeedback(getIncorrectMessage(item));
                setTimeout(() => setShakeItem(null), 800);
            }
        }

        else if (puzzleType === 'stones-order') {
            const nextNumber = selectedItems.length + 1;

            if (item.number === nextNumber) {
                playSound('correct');
                const newSelected = [...selectedItems, item.id];
                setSelectedItems(newSelected);
                setLocalFeedback(null);

                if (newSelected.length === 5) {
                    playSound('victory');
                    setShowConfetti(true);
                    setTimeout(() => {
                        handlePuzzleInteraction();
                    }, 2000);
                }
            } else {
                playSound('wrong');
                setShakeItem(item.id);
                setLocalFeedback(getIncorrectMessage(item));
                setTimeout(() => setShakeItem(null), 800);
            }
        }

        else if (puzzleType === 'find-nut') {
            if (selectedItems.includes(item.id)) return;

            const newSelected = [...selectedItems, item.id];
            setSelectedItems(newSelected);

            playItemName(item);

            if (item.correct) {
                setLocalFeedback(item.id);
                setTimeout(() => {
                    playSound('victory');
                    setShowConfetti(true);
                }, 1500);
                setTimeout(() => {
                    handlePuzzleInteraction();
                }, 4300);
            } else {
                playSound('wrong');
                setShakeItem(item.id);
                setLocalFeedback(getIncorrectMessage(item));
                setTimeout(() => {
                    setShakeItem(null);
                    setLocalFeedback(null);
                }, 1500);
            }
        }

        else if (puzzleType === 'selection-reveal') {
            if (item.correct) {
                if (selectedItems.includes(item.id)) return;

                playSound('correct');
                const newSelected = [...selectedItems, item.id];
                setSelectedItems(newSelected);
                setLocalFeedback(null);

                const correctItems = items ? items.filter(i => i.correct).map(i => i.id) : [];
                const allCorrectSelected = correctItems.every(id => newSelected.includes(id));

                if (allCorrectSelected) {
                    if (currentPageData.id === 'page-26') {
                        setLocalFeedback(currentPageData.successText || "Well done!");
                        setTimeout(() => {
                            playSound('victory');
                            setShowConfetti(true);
                        }, 500);
                        setTimeout(() => {
                            handlePuzzleInteraction();
                        }, 4000);
                    } else {
                        playSound('victory');
                        setShowConfetti(true);
                        setTimeout(() => {
                            handlePuzzleInteraction();
                        }, 2000);
                    }
                }
            } else {
                playSound('wrong');
                setShakeItem(item.id);
                setLocalFeedback(getIncorrectMessage(item));
                setTimeout(() => setShakeItem(null), 800);
            }
        }
        else if (puzzleType === 'choice') {
            if (item.targetId !== currentPageData.id) {
                // Correct Choice
                playSound('victory');
                setLocalFeedback(null);
                setShowConfetti(true);
                setTimeout(() => {
                    handlePuzzleInteraction();
                }, 2000);
            } else {
                // Incorrect Choice
                playSound('wrong');
                setShakeItem(item.label);
                setLocalFeedback(getIncorrectMessage(item));
                setTimeout(() => setShakeItem(null), 800);
            }
        }
        else if (puzzleType === 'match-pairs') {
            if (selectedItems.includes(item.id)) return;
            if (flippedItems.includes(item.id)) return;

            playSound('correct');
            const newSelectedForMatch = [...flippedItems, item.id];
            setFlippedItems(newSelectedForMatch);

            if (newSelectedForMatch.length === 2) {
                const id1 = newSelectedForMatch[0];
                const id2 = newSelectedForMatch[1];
                const item1 = items.find(i => i.id === id1);
                const item2 = items.find(i => i.id === id2);

                if (item1.pairId === item2.pairId) {
                    setTimeout(() => {
                        playSound('correct');
                        setSelectedItems(prev => [...prev, id1, id2]);
                        setFlippedItems([]);

                        const allMatched = items.every(i => [...selectedItems, id1, id2].includes(i.id));
                        if (allMatched) {
                            playSound('victory');
                            setShowConfetti(true);
                            setTimeout(() => handlePuzzleInteraction(), 1500);
                        }
                    }, 400);
                } else {
                    setTimeout(() => {
                        playSound('wrong');
                        setShakeItem(id1);
                        setShakeItem(id2);
                        setFlippedItems([]);
                        setLocalFeedback(getIncorrectMessage(item));
                        setTimeout(() => {
                            setShakeItem(null);
                            setLocalFeedback(null);
                        }, 1200);
                    }, 600);
                }
            }
        }

        else if (puzzleType === 'musical-garden') {
            playNote(item.note);
            setShakeItem(item.id);
            setTimeout(() => setShakeItem(null), 500);
        }
    };

    // Abstract interactive layer over the background image
    const renderPuzzleInteraction = () => {
        switch (puzzleType) {
            case 'choice':
                return (
                    <div className={`absolute inset-0 w-full h-full flex items-center justify-center p-8 transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                        {localFeedback && !puzzleSolved && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#fffdf5] px-8 py-4 rounded-[2rem] shadow-xl border-[3px] border-[#fbbf24] z-50 animate-bounce-in max-w-[80%]">
                                <p className="text-[#451a03] font-bold text-lg md:text-xl text-center font-sans tracking-wide leading-tight whitespace-pre-line">
                                    {localFeedback}
                                </p>
                            </div>
                        )}
                        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
                            {currentPageData.choices && currentPageData.choices.map((choice, idx) => {
                                const isShaking = shakeItem === choice.label;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleItemClick(choice)}
                                        onMouseEnter={() => choice.audioSrc && playSFX(choice.audioSrc)}
                                        className={`w-full py-4 px-6 rounded-[2rem] border-4 border-black/5 shadow-lg 
                                                    font-baloo font-black text-lg md:text-2xl
                                                    transition-all duration-300 transform
                                                    ${isShaking ? 'animate-shake' : 'hover:scale-105 active:scale-95'}
                                                    ${choice.color}`}
                                    >
                                        {choice.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            case 'packing':
                return (
                    <div className={`absolute inset-0 w-full h-full z-20 transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                        {(localFeedback || hoveredItemName) && !puzzleSolved && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#fffdf5] px-8 py-4 rounded-[2rem] shadow-xl border-[3px] border-[#fbbf24] z-40 animate-bounce-in max-w-[80%]">
                                <p className="text-[#451a03] font-bold text-lg md:text-xl text-center font-sans tracking-wide leading-tight whitespace-pre-line">
                                    {localFeedback || hoveredItemName}
                                </p>
                            </div>
                        )}

                        {items && items.map((item) => {
                            const isSelected = selectedItems.includes(item.id);
                            const isShaking = shakeItem === item.id;

                            if (isSelected) return null;

                            return (
                                <div
                                    key={item.id}
                                    style={item.style}
                                    className="absolute flex items-center justify-center pointer-events-none"
                                >
                                    <img loading="lazy"
                                        src={item.src}
                                        alt=""
                                        className="w-full h-auto opacity-0"
                                        aria-hidden="true"
                                    />
                                    <button
                                        onClick={() => handleItemClick(item)}
                                        onMouseEnter={() => {
                                            playItemName(item);
                                            const capitalizedName = item.id.charAt(0).toUpperCase() + item.id.slice(1);
                                            setHoveredItemName(capitalizedName);
                                        }}
                                        onMouseLeave={() => setHoveredItemName(null)}
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] transition-all duration-300 cursor-pointer rounded-xl group pointer-events-auto flex items-center justify-center
                                            ${isShaking ? 'animate-shake' : 'hover:scale-110'}
                                        `}
                                        aria-label={`Pick ${item.id}`}
                                    >
                                        <img loading="lazy"
                                            src={item.src}
                                            alt={item.id}
                                            className="absolute w-[166%] h-auto max-w-none object-contain pointer-events-none select-none drop-shadow-md transition-transform duration-300"
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'stones-order':
                return (
                    <div className={`absolute inset-0 z-20 w-full h-full transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                        {/* Dynamic Feedback Message */}
                        {localFeedback && !puzzleSolved && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#fffdf5] px-8 py-4 rounded-[2rem] shadow-xl border-[3px] border-[#fbbf24] z-40 animate-bounce-in max-w-[80%]">
                                <p className="text-[#451a03] font-bold text-lg md:text-xl text-center font-sans tracking-wide leading-tight whitespace-pre-line">
                                    {localFeedback}
                                </p>
                            </div>
                        )}

                        {items && items.map((item) => {
                            const isSelected = selectedItems.includes(item.id);
                            const isShaking = shakeItem === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    disabled={isSelected || isLocked}
                                    style={item.style}
                                    className={`absolute transition-all duration-300 cursor-pointer w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center
                                        ${isShaking ? 'animate-shake' : 'hover:scale-110'}
                                        ${isSelected ? 'brightness-125 scale-105' : ''}
                                    `}
                                    aria-label={`Stone ${item.number}`}
                                >
                                    <div className="relative w-full h-full">
                                        <img loading="lazy"
                                            src={item.src}
                                            alt={`Stone ${item.number}`}
                                            className="w-full h-full object-contain drop-shadow-xl"
                                        />
                                        {/* Number Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center pt-1 md:pt-2">
                                            <span className={`font-serif font-extrabold text-3xl md:text-5xl drop-shadow-md ${isSelected ? 'text-[#fcd34d]' : 'text-white'}`}>
                                                {item.number}
                                            </span>
                                        </div>

                                        {/* Success Marker */}
                                        {isSelected && (
                                            <div className="absolute -top-2 -right-2 bg-[#fbbf24] rounded-full p-1 shadow-lg animate-bounce">
                                                <CheckCircle size={28} className="text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                );

            case 'find-nut':
                return (
                    <div className={`absolute inset-0 w-full h-full z-20 transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                        {/* Instructions or Feedback - Moved to top as requested */}
                        {localFeedback && !puzzleSolved && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#fffdf5] px-8 py-4 rounded-[2rem] shadow-xl border-[3px] border-[#fbbf24] z-50 animate-bounce-in max-w-[90%] pointer-events-none">
                                <p className="text-[#451a03] font-bold text-lg md:text-xl text-center font-sans tracking-wide leading-tight whitespace-pre-line">
                                    {localFeedback}
                                </p>
                            </div>
                        )}

                        {/* 1. Render REVEALED items as Full-Screen Overlays (Framed Images) */}
                        {items && items.map((item) => {
                            const isRevealed = selectedItems.includes(item.id);
                            if (!isRevealed) return null;

                            return (
                                <div key={`revealed-${item.id}`} className="absolute inset-0 w-full h-full pointer-events-none z-30 animate-fade-in">
                                    <img loading="lazy"
                                        src={item.src}
                                        alt="Found Item"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            );
                        })}

                        {/* 2. Render CLICK ZONES (Invisible Buttons) */}
                        {items && items.map((item) => {
                            const isRevealed = selectedItems.includes(item.id);

                            // If revealed, we disable the click zone so you can't click it again
                            if (isRevealed) return null;

                            return (
                                <button
                                    key={`zone-${item.id}`}
                                    onClick={() => handleItemClick(item)}
                                    disabled={isLocked}
                                    style={item.style} // Use unified style for positioning
                                    className="absolute cursor-pointer transition-all duration-300 hover:bg-white/10 rounded-full z-40"
                                    aria-label="Dig here"
                                >
                                </button>
                            );
                        })}
                    </div>
                );

            case 'selection-reveal':
                return (
                    <div className={`absolute inset-0 w-full h-full z-20 transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                        {/* 1. Render REVEALED pieces as full-screen overlays (from revealSrc) */}
                        {items && items.filter(i => i.correct).map((item) => {
                            const isRevealed = selectedItems.includes(item.id);
                            if (!isRevealed) return null;

                            return (
                                <div key={`revealed-${item.id}`} className="absolute inset-0 w-full h-full pointer-events-none z-30 animate-fade-in">
                                    <img loading="lazy"
                                        src={item.revealSrc}
                                        alt="Repaired Part"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            );
                        })}

                        {/* 2. Feedback (Instructions) */}
                        {localFeedback && !puzzleSolved && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#fffdf5] px-8 py-4 rounded-[2rem] shadow-xl border-[3px] border-[#fbbf24] z-50 animate-bounce-in max-w-[80%] pointer-events-none text-center">
                                <p className="text-[#451a03] font-bold text-lg md:text-xl font-sans tracking-wide leading-tight whitespace-pre-line">
                                    {localFeedback}
                                </p>
                            </div>
                        )}

                        {/* 3. Choice Items */}
                        <div className="absolute inset-0 z-40 flex items-start justify-center">
                            <div className="w-full h-full relative">
                                {items && items.map((item) => {
                                    const isSelected = selectedItems.includes(item.id);
                                    const isShaking = shakeItem === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleItemClick(item)}
                                            style={item.style}
                                            disabled={isSelected || isLocked}
                                            className={`absolute transition-all duration-300 cursor-pointer
                                                ${isShaking ? 'animate-shake' : 'hover:scale-105 active:scale-95'}
                                                ${isSelected ? 'opacity-40 grayscale-[0.8] cursor-default' : ''}
                                            `}
                                        >
                                            <div className="relative w-full h-full">
                                                <img loading="lazy"
                                                    src={item.src}
                                                    alt={item.id}
                                                    className="w-full h-full object-contain drop-shadow-xl"
                                                />
                                                {isSelected && (
                                                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-md animate-bounce-in">
                                                        <CheckCircle size={14} className="text-white" strokeWidth={3} />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );

            case 'beaver-basket':
                const handleBeaverDragStart = (e, item) => {
                    if (selectedItems.includes(item.id) || puzzleSolved || showConfetti || isLocked) return;
                    e.preventDefault();
                    e.stopPropagation();

                    if (!item.correct) {
                        playSound('wrong');
                        setShakeItem(item.id);
                        setLocalFeedback(getIncorrectMessage(item));
                        setTimeout(() => {
                            setShakeItem(null);
                            setLocalFeedback(null);
                        }, 1200);
                        return;
                    }

                    // Start tracking drag: relative to screen coords
                    setDragItem({
                        ...item,
                        startX: e.clientX,
                        startY: e.clientY,
                        currentX: e.clientX,
                        currentY: e.clientY
                    });
                };

                const handleBeaverDragMove = (e) => {
                    if (dragItem) {
                        e.preventDefault();
                        setDragItem(prev => ({
                            ...prev,
                            currentX: e.clientX,
                            currentY: e.clientY
                        }));
                    }
                };

                const handleBeaverDragEnd = (e) => {
                    if (!dragItem) return;
                    e.preventDefault();

                    const basketEl = document.getElementById('beaver-basket-zone');
                    if (basketEl) {
                        const basketRect = basketEl.getBoundingClientRect();
                        const x = e.clientX;
                        const y = e.clientY;

                        if (x >= basketRect.left && x <= basketRect.right &&
                            y >= basketRect.top && y <= basketRect.bottom) {

                            playSound('correct');
                            const newSelected = [...selectedItems, dragItem.id];
                            setSelectedItems(newSelected);

                            const correctCount = items.filter(i => i.correct).length;
                            if (newSelected.length === correctCount) {
                                playSound('victory');
                                setShowConfetti(true);
                                setTimeout(() => handlePuzzleInteraction(), 2000);
                            }
                        } else {
                            playSound('wrong');
                        }
                    }
                    setDragItem(null);
                };

                return (
                    <div
                        className={`absolute inset-0 w-full h-full touch-none transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}
                        onPointerMove={handleBeaverDragMove}
                        onPointerUp={handleBeaverDragEnd}
                        onPointerLeave={handleBeaverDragEnd}
                    >
                        {localFeedback && !puzzleSolved && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#fffdf5] px-8 py-4 rounded-[2rem] shadow-xl border-[3px] border-[#fbbf24] z-50 animate-bounce-in max-w-[80%]">
                                <p className="text-[#451a03] font-bold text-lg md:text-xl text-center font-sans tracking-wide leading-tight whitespace-pre-line">
                                    {localFeedback}
                                </p>
                            </div>
                        )}
                        {/* Basket Drop Zone - Invisible as requested */}
                        {currentPageData.basket && (
                            <div id="beaver-basket-zone" className="absolute pointer-events-none" style={currentPageData.basket.style}>
                                {/* Image removed, just a zone for coords */}
                            </div>
                        )}

                        {/* 1. VISUAL LAYER: Full Canvas Images that move with drag interaction */}
                        {items && items.map((item) => {
                            const isCollected = selectedItems.includes(item.id);
                            const isDragging = dragItem && dragItem.id === item.id;

                            if (isCollected) return null;

                            // Apply translation if dragging
                            let transformStyle = {};
                            if (isDragging) {
                                const dx = dragItem.currentX - dragItem.startX;
                                const dy = dragItem.currentY - dragItem.startY;
                                transformStyle = { transform: `translate(${dx}px, ${dy}px)` };
                            }

                            return (
                                <img loading="lazy"
                                    key={`vis-${item.id}`}
                                    src={item.src}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-20"
                                    style={transformStyle}
                                />
                            );
                        })}

                        {/* 2. INTERACTION LAYER: Invisible Hitboxes with Aspect Ratio */}
                        {items && items.map((item) => {
                            const isCollected = selectedItems.includes(item.id);
                            const isDragging = dragItem && dragItem.id === item.id;
                            const isShaking = shakeItem === item.id;

                            if (isCollected) return null;

                            // Move hitbox with drag to maintain alignment
                            // Added aspectRatio to ensure it has height!
                            let hitboxStyle = {
                                ...item.style,
                                aspectRatio: '1/1'
                            };

                            if (isDragging) {
                                const dx = dragItem.currentX - dragItem.startX;
                                const dy = dragItem.currentY - dragItem.startY;
                                hitboxStyle = {
                                    ...hitboxStyle,
                                    transform: `translate(${dx}px, ${dy}px)`,
                                    cursor: 'grabbing'
                                };
                            }

                            return (
                                <div
                                    key={`hit-${item.id}`}
                                    onPointerDown={(e) => handleBeaverDragStart(e, item)}
                                    style={hitboxStyle}
                                    className={`absolute cursor-grab z-30
                                       ${isShaking ? 'animate-shake' : ''}
                                       /* Transparent hitbox */
                                    `}
                                    aria-label="Item"
                                >
                                </div>
                            );
                        })}
                    </div>
                );



            case 'match-pairs':
                return (
                    <div className={`absolute inset-0 w-full h-full grid grid-cols-3 gap-6 p-12 md:p-16 place-content-center transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                        {localFeedback && !puzzleSolved && (
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#fffdf5] px-8 py-4 rounded-[2rem] shadow-xl border-[3px] border-[#fbbf24] z-50 animate-bounce-in max-w-[80%]">
                                <p className="text-[#451a03] font-bold text-lg md:text-xl text-center font-sans tracking-wide leading-tight whitespace-pre-line">
                                    {localFeedback}
                                </p>
                            </div>
                        )}
                        {items && items.map((item) => {
                            const isMatched = selectedItems.includes(item.id);
                            const isSelected = flippedItems.includes(item.id);
                            const isShaking = shakeItem === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    disabled={isMatched}
                                    className={`relative w-full aspect-square transition-all duration-300 transform
                                        ${isMatched ? 'grayscale brightness-50 cursor-default' : 'cursor-pointer'}
                                        ${!isMatched && 'hover:scale-110 active:scale-95'}
                                        ${isSelected ? 'scale-125 brightness-125 z-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'z-20'}
                                        ${isShaking ? 'animate-shake' : ''}
                                    `}
                                >
                                    <img loading="lazy"
                                        src={item.src}
                                        alt="mushroom"
                                        className="w-full h-full object-contain drop-shadow-lg"
                                        // Hue-rotate is no longer needed since we have colored PNGs now, but I'll keep the logic if hue exists
                                        style={item.hue ? { filter: `hue-rotate(${item.hue}deg)` } : {}}
                                    />

                                    {isMatched && (
                                        <div className="absolute top-0 right-0 animate-fade-in">
                                            <CheckCircle size={24} className="text-green-400 drop-shadow-md" strokeWidth={3} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                );

            case 'musical-garden':
                return (
                    <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                        {/* THE FLOWERS (Visual Stack as overlays) */}
                        {items && items.map((item) => {
                            const isShaking = shakeItem === item.id;
                            return (
                                <img loading="lazy"
                                    key={`img-${item.id}`}
                                    src={item.src}
                                    alt=""
                                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-300
                                        ${isShaking ? 'scale-105 brightness-125' : 'scale-100'}`}
                                />
                            );
                        })}

                        {/* CLICK ZONES (Invisible Hitboxes) using unified 'style' key */}
                        {items && items.map((item) => (
                            <button
                                key={`hit-${item.id}`}
                                onClick={() => handleItemClick(item)}
                                style={item.style}
                                className="absolute cursor-pointer rounded-full hover:bg-white/10 active:bg-white/20 transition-colors z-30"
                                aria-label="Play Flower"
                            />
                        ))}
                    </div>
                );

            default:
                if (currentPageData.type === 'interaction') return null;
                return (
                    <div className="absolute inset-0 flex items-end justify-center pb-8">
                        <button
                            onClick={() => handlePuzzleInteraction()}
                            className="px-6 py-3 bg-white/90 text-purple-900 font-bold rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce border-2 border-purple-200"
                        >
                            {puzzleSolved ? <CheckCircle size={24} className="text-green-600" /> : "Tap to Solve"}
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">

            {/* Allow interaction only on children */}
            <div className="w-full h-full pointer-events-auto">
                {/* Final Success Overlay */}
                {puzzleSolved && (() => {
                    const badge = puzzleBadges.find(b => b.id === currentPageData.id);
                    // Split feedbackText into header and subtext
                    const parts = feedbackText.split(/([!?.]{1,2}\s+)/);
                    const headerText = parts[0] + (parts[1] || '').trim();
                    const subText = parts.slice(2).join('').trim();

                    return (
                        <div className="absolute inset-0 z-50 animate-fade-in flex items-center justify-center p-8 text-center pointer-events-auto">
                            <div className="absolute inset-0 w-full h-full">
                                <img loading="lazy"
                                    src=""/assets/puzzles/well-done-banner.png""
                                    alt="Well Done!"
                                    className="w-full h-full object-cover shadow-2xl"
                                />
                            </div>
                            <div className="relative z-10 flex flex-col items-center justify-center">
                                {badge && (
                                    <div className="mb-4 animate-bounce-slow">
                                        <div className={`relative p-4 rounded-full shadow-lg border-4 border-white/50 ${badge.color} text-white`}>
                                            {React.cloneElement(badge.icon, { size: 48, strokeWidth: 2.5 })}
                                            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 text-white shadow-md ring-2 ring-white">
                                                <Zap size={16} fill="currentColor" />
                                            </div>
                                        </div>
                                        <span className="mt-2 block text-[10px] font-black uppercase tracking-[0.2em] text-[#451a03] opacity-60">
                                            {badge.label} Badge Earned!
                                        </span>
                                    </div>
                                )}
                                <div className="transform -rotate-1 max-w-xl mx-auto px-4 flex flex-col items-center gap-4">
                                    <h2 className="text-[#451a03] font-serif font-black text-6xl md:text-7xl lg:text-8xl drop-shadow-md tracking-tight">
                                        {headerText}
                                    </h2>
                                    {subText && (
                                        <p className="text-[#451a03]/90 font-bold text-2xl md:text-3xl mt-4 max-w-lg leading-relaxed text-center"
                                            style={{ fontFamily: '"Quicksand", sans-serif' }}>
                                            {subText}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })()}

                {!puzzleSolved && renderPuzzleInteraction()}

                {/* Give Up / Show Answer Button */}
                {!puzzleSolved && currentPageData.type !== 'interaction' && (
                    <div className="absolute bottom-4 right-4 pointer-events-auto z-40">
                        <button
                            onClick={() => {
                                handlePuzzleInteraction(true); // silent solve
                                goToNextPage();
                            }}
                            className="px-4 py-2 bg-white/50 hover:bg-white/80 text-gray-600 hover:text-gray-900 rounded-full text-xs font-bold transition-all backdrop-blur-sm border border-white/20 shadow-sm"
                        >
                            Skip Puzzle
                        </button>
                    </div>
                )}

                {/* Interaction Hint (Hand Icon) for non-puzzles */}
                {currentPageData.type === 'interaction' && (
                    <div className="absolute top-6 right-6 z-40 pointer-events-none click-hint flex flex-col items-center gap-2">
                        <div className={`${currentPageData.puzzleType === 'musical-garden' ? 'bg-purple-500/80 shadow-[0_0_20px_rgba(139,92,246,0.5)]' : 'bg-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.5)]'} backdrop-blur-md p-4 rounded-full border-2 border-white`}>
                            <Hand size={36} className="text-white fill-white/20 drop-shadow-md animate-pulse" />
                        </div>
                    </div>
                )}

                {/* "Play" Tag for Puzzles when unlocked */}
                {!isLocked && !puzzleSolved && currentPageData.type !== 'interaction' && (
                    <div className="absolute top-6 right-6 z-50 pointer-events-none animate-bounce-in">
                        <div className="bg-yellow-400 text-yellow-900 font-baloo font-black text-2xl px-6 py-2 rounded-[2rem] shadow-lg border-2 border-yellow-200">
                            Play
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PuzzleView;
