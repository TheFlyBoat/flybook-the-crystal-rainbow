import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { bookData } from "../data/story-data";

const BookContext = createContext();

export const useBook = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBook must be used within a BookProvider');
    }
    return context;
};

export const BookProvider = ({ children }) => {
    // --- State: Book Engine ---
    const [currentIndex, setCurrentIndex] = useState(0);
    const [history, setHistory] = useState([0]);
    const [isFlipping, setIsFlipping] = useState(false);
    const [puzzleSolved, setPuzzleSolved] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    // --- State: Interface Toggles ---
    const [isSoundOn, setIsSoundOn] = useState(true); // "Narrator"
    const [isSoundEffectsOn, setIsSoundEffectsOn] = useState(true); // "Sound Effects"
    const [isAutoplay, setIsAutoplay] = useState(false);
    const [theme, setTheme] = useState('auto'); // 'auto' or 'dark'
    const [timeOfDay, setTimeOfDay] = useState('morning');
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
    const [showCharacters, setShowCharacters] = useState(false);
    const [isInteractionActive, setIsInteractionActive] = useState(false);
    const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);

    // --- State: Badges & Achievements ---
    const [completedEndings, setCompletedEndings] = useState(() => {
        const saved = localStorage.getItem('magic_book_endings');
        return saved ? JSON.parse(saved) : [];
    });
    const [completedPuzzles, setCompletedPuzzles] = useState(() => {
        const saved = localStorage.getItem('magic_book_puzzles');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('magic_book_endings', JSON.stringify(completedEndings));
    }, [completedEndings]);

    useEffect(() => {
        localStorage.setItem('magic_book_puzzles', JSON.stringify(completedPuzzles));
    }, [completedPuzzles]);

    const markEndingComplete = (endingId) => {
        if (!completedEndings.includes(endingId)) {
            setCompletedEndings(prev => [...prev, endingId]);
        }
    };

    const markPuzzleComplete = (puzzleId) => {
        if (!completedPuzzles.includes(puzzleId)) {
            setCompletedPuzzles(prev => [...prev, puzzleId]);
        }
    };

    const requiredEndings = ["end-page-a", "end-page-b1", "end-page-b2"];
    const isSecretUnlocked = requiredEndings.every(end => (completedEndings || []).includes(end));

    const audioRef = useRef(new Audio());
    const sfxRef = useRef(new Audio());

    const playSFX = (src) => {
        if (!isSoundEffectsOn || !src) return;

        // Stop current SFX if playing
        sfxRef.current.pause();
        sfxRef.current.src = src;
        sfxRef.current.play().catch(err => console.error("SFX play error:", err));
    };

    const currentPageData = bookData[currentIndex];
    const getIndexById = (id) => bookData.findIndex(p => p.id === id);

    // --- Logic: Theme & Time ---
    useEffect(() => {
        const updateTimeAndHour = () => {
            const now = new Date();
            const hour = now.getHours();
            setCurrentHour(hour);

            // Keep timeOfDay for legacy components if any
            if (hour >= 5 && hour < 12) setTimeOfDay('morning');
            else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
            else if (hour >= 17 && hour < 21) setTimeOfDay('evening');
            else setTimeOfDay('night');
        };

        updateTimeAndHour();
        const interval = setInterval(updateTimeAndHour, 60000);
        return () => clearInterval(interval);
    }, []);

    const getThemeClass = () => {
        if (theme === 'dark') return 'theme-dark';
        return `hour-${currentHour}`;
    };

    // --- Logic: Navigation ---
    const navigateTo = (index) => {
        if (index >= 0 && index < bookData.length) {
            setIsFlipping(true);
            setTimeout(() => {
                setHistory(prev => [...prev, index]);
                setCurrentIndex(index);
                setIsFlipping(false);
            }, 300);
        }
    };

    const goToNextPage = () => {
        if (currentPageData.type === 'puzzle' && !puzzleSolved) return;

        if (currentPageData.next) {
            const nextId = currentPageData.next;

            // Redirect to page-secret-transition if secret is unlocked and we are going to page-13
            if (nextId === 'page-13' && isSecretUnlocked) {
                navigateTo(getIndexById('page-secret-transition'));
                return;
            }

            navigateTo(getIndexById(nextId));
        } else {
            const nextIndex = currentIndex + 1;
            const nextPage = bookData[nextIndex];

            // Handle numeric index increment redirection if applicable
            if (nextPage && nextPage.id === 'page-13' && isSecretUnlocked) {
                navigateTo(getIndexById('page-secret-transition'));
                return;
            }

            navigateTo(nextIndex);
        }
    };

    const goToPrevPage = () => {
        if (history.length > 1) {
            setIsFlipping(true);
            setTimeout(() => {
                const newHistory = [...history];
                newHistory.pop();
                setHistory(newHistory);
                setCurrentIndex(newHistory[newHistory.length - 1]);
                setIsFlipping(false);
            }, 300);
        }
    };

    const goToLastDecision = () => {
        // Find the index of the last page in history that was a choice page
        // We look backwards starting from the second to last item
        for (let i = history.length - 1; i >= 0; i--) {
            const pageIndex = history[i];
            const page = bookData[pageIndex];
            if (page.type === 'choice') {
                navigateTo(pageIndex);
                return;
            }
        }
        // Fallback: If no choice found (unlikely if they reached an ending), go to start
        navigateTo(0);
    };

    const goToStartJourney = () => {
        // Find page-1 index
        const index = getIndexById('page-1');
        if (index !== -1) {
            navigateTo(index);
        } else {
            navigateTo(0);
        }
    };

    // --- Logic: Audio ---
    const audioStageRef = useRef(1);

    useEffect(() => {
        const audio = audioRef.current;
        const currentSrc = bookData[currentIndex].audioSrc;
        audioStageRef.current = 1;

        if (currentSrc) {
            const absoluteSrc = window.location.origin + currentSrc;
            if (audio.src !== absoluteSrc) {
                audio.src = currentSrc;
                audio.load();
            }
            if (isSoundOn) {
                audio.play().catch(() => { });
            } else {
                audio.pause();
                setIsNarrationPlaying(false);
            }
        } else {
            audio.pause();
            audio.src = "";
            setIsNarrationPlaying(false);
        }

        const handlePlay = () => setIsNarrationPlaying(true);
        const handlePause = () => setIsNarrationPlaying(false);
        const handleEnded = () => setIsNarrationPlaying(false);
        const handleTimeUpdate = () => {
            if (audio.duration && audio.currentTime >= audio.duration - 0.1) {
                setIsNarrationPlaying(false);
            }
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.pause();
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [currentIndex, isSoundOn]);

    useEffect(() => {
        const audio = audioRef.current;
        const handleAudioEnd = () => {
            if (audioStageRef.current === 1 && currentPageData.audioSrc2) {
                audioStageRef.current = 2;
                audio.src = currentPageData.audioSrc2;
                audio.load();
                if (isSoundOn) {
                    audio.play().catch(() => { });
                }
                if (currentPageData.autoTriggerInteraction) {
                    setIsInteractionActive(true);
                }
                return;
            }

            // Both audio tracks finished (or just the first if there's no second)
            setIsNarrationPlaying(false);

            if (isAutoplay && currentPageData.type !== 'puzzle' && currentPageData.type !== 'choice') {
                setTimeout(() => goToNextPage(), 1000);
            }
        };
        audio.addEventListener('ended', handleAudioEnd);
        return () => audio.removeEventListener('ended', handleAudioEnd);
    }, [currentIndex, isAutoplay, currentPageData, isSoundOn, setIsInteractionActive, goToNextPage]);

    // --- Logic: Puzzles & Progress ---
    useEffect(() => {
        setPuzzleSolved(false);
        setFeedbackText('');
        setIsInteractionActive(false); // Reset interaction on page change
        setIsNarrationPlaying(false); // Ensure narration lock resets immediately on page load before audio starts

        // Track progress automatically
        if (currentPageData.type === 'back-cover') {
            markEndingComplete(currentPageData.id);
        }
        if (currentPageData.type === 'choice') {
            markPuzzleComplete(currentPageData.id);
        }
    }, [currentIndex]);

    const handlePuzzleInteraction = (isSilent = false) => {
        setPuzzleSolved(true);
        if (!isSilent) {
            setFeedbackText(currentPageData.successText || "Great job!");
        }
        markPuzzleComplete(currentPageData.id);
    };

    const stopNarration = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const value = {
        bookData,
        currentIndex,
        currentPageData,
        history,
        isFlipping,
        puzzleSolved,
        feedbackText,
        isSoundOn,
        isSoundEffectsOn,
        isAutoplay,
        theme,
        timeOfDay,
        currentHour,
        getThemeClass,
        navigateTo,
        goToNextPage,
        goToPrevPage,
        goToLastDecision,
        goToStartJourney,
        setIsSoundOn,
        setIsSoundEffectsOn,
        setIsAutoplay,
        setTheme,
        showCharacters,
        setShowCharacters,
        isInteractionActive,
        setIsInteractionActive,
        isNarrationPlaying,
        audioRef,
        playSFX,
        stopNarration,
        handlePuzzleInteraction,
        getIndexById,
        completedEndings,
        completedPuzzles,
        isSecretUnlocked,
        markEndingComplete,
        markPuzzleComplete
    };

    return (
        <BookContext.Provider value={value}>
            {children}
        </BookContext.Provider>
    );
};
