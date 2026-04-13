import React from 'react';
import { useBook } from "../../context/book-context";
import { useState } from 'react';
import MediaRenderer from "./media-renderer";
import ContentArea from "./content-area";
import { PageCurl, PageCurlBack } from "./page-curl";
import CoverPage from "./cover-page";
import { PlayCircle, GitBranch, MapPin } from 'lucide-react';
import PuzzleView from './puzzle-view';
import ProgressMap from '../interface/progress-map';
import BalloonsAnimation from '../interface/balloons-animation';
import RainbowGlowEffect from '../interface/rainbow-glow-effect';
import EngravedRiddle from '../interface/engraved-riddle';
import MagicTranslation from '../interface/magic-translation';
import RainbowOverlay from './rainbow-overlay';
import OnboardingView from './onboarding-view';

const BookEngine = () => {
    const {
        currentIndex,
        currentPageData,
        history,
        isFlipping,
        puzzleSolved,
        feedbackText,
        isSoundOn,
        isSoundEffectsOn,
        navigateTo,
        goToNextPage,
        goToPrevPage,
        goToLastDecision,
        goToStartJourney,
        handlePuzzleInteraction,
        markPuzzleComplete,
        setIsInteractionActive,
        getIndexById,
        isSecretUnlocked,
        isNarrationPlaying
    } = useBook();

    const [showMap, setShowMap] = useState(false);

    // --- Logic: Keyboard Navigation ---
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't navigate if user is typing in an input or textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key === 'ArrowRight') {
                goToNextPage();
            } else if (e.key === 'ArrowLeft') {
                goToPrevPage();
            } else if (e.key === ' ' || e.key === 'Enter') {
                // Trigger the animation/video interaction
                setIsInteractionActive(prev => !prev);
                // Prevent scrolling when space is pressed
                if (e.key === ' ') e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNextPage, goToPrevPage, setIsInteractionActive]);

    const renderBookContent = () => {
        if (currentPageData.type === 'cover') {
            return <CoverPage onOpen={goToNextPage} />;
        }

        if (currentPageData.type === 'back-cover') {
            return (
                <div className="w-full max-w-[1440px] aspect-[2/1] bg-gray-900 rounded-sm shadow-2xl relative flex overflow-hidden">
                    <div className="w-1/2 h-full relative border-r border-gray-800 bg-[#fcfcfc] overflow-hidden">
                        {currentPageData.media && (
                            <MediaRenderer data={currentPageData} isLeftPage={true} />
                        )}
                    </div>
                    <div className="w-1/2 h-full bg-gray-100 flex flex-col items-center justify-center p-8 md:p-16 text-center relative tracking-tight">
                        <h2 className="font-baloo text-4xl md:text-7xl text-gray-900 mb-8 relative z-10 font-black tracking-tight">
                            {currentPageData.id === 'end-page-secret' ? 'The Secret Heart' : 'The End'}
                        </h2>

                        {currentPageData.text && (
                            <div className="font-sans text-xl md:text-3xl text-gray-700 mb-12 whitespace-pre-line leading-relaxed max-w-lg font-medium opacity-90">
                                {currentPageData.text}
                            </div>
                        )}

                        <div className="flex flex-col gap-6 w-full max-w-xs relative z-10">
                            {currentPageData.id === 'end-page-secret' ? (
                                <>
                                    <button
                                        onClick={() => navigateTo(0)}
                                        className="flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-[2.5rem] text-2xl font-black hover:scale-105 transition-all shadow-xl active:scale-95 border-b-8 border-blue-700 font-baloo"
                                    >
                                        <PlayCircle size={36} />
                                        Start Again
                                    </button>
                                </>
                            ) : (
                                <>
                                    {isSecretUnlocked ? (
                                        <>
                                            <div className="text-emerald-500 font-extrabold text-2xl animate-pulse">
                                                A secret passage has opened!
                                            </div>
                                            <button
                                                onClick={() => navigateTo(getIndexById('page-secret-transition'))}
                                                className="flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-[2.5rem] text-2xl font-black hover:scale-105 transition-all shadow-xl active:scale-95 border-b-8 border-green-700 font-baloo"
                                            >
                                                <GitBranch size={36} />
                                                Go to Ancient Tree
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={goToLastDecision}
                                            className="flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-[2.5rem] text-2xl font-black hover:scale-105 transition-all shadow-xl active:scale-95 border-b-8 border-orange-700 font-baloo"
                                        >
                                            <GitBranch size={36} />
                                            Look for more Crystals
                                        </button>
                                    )}

                                    <button
                                        onClick={goToStartJourney}
                                        className="flex items-center justify-center gap-4 px-10 py-6 bg-white text-slate-700 rounded-[2.5rem] text-2xl font-black hover:scale-105 transition-all shadow-xl active:scale-95 border-4 border-slate-100 border-b-8 border-b-slate-300 font-baloo"
                                    >
                                        <PlayCircle size={36} />
                                        Start from Home
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        const isPuzzle = currentPageData.type === 'puzzle';
        const isInteraction = currentPageData.type === 'interaction';
        const isChoice = currentPageData.type === 'choice';
        const isImageOnRight = currentPageData.layout === 'image-right';
        const isPage3Dimmed = currentPageData.id === 'page-3' && !isNarrationPlaying;

        return (
            <div className={`relative flex flex-row w-full max-w-[1440px] aspect-[2/1] shadow-2xl transition-transform duration-500 animate-fade-in 
                ${isFlipping ? 'scale-[0.99]' : 'scale-100'}`}>

                <div className="absolute left-0 top-1 bottom-1 w-2 md:w-4 bg-gray-100 rounded-l-md z-0 shadow-sm border border-gray-200"></div>
                <div className="absolute right-0 top-1 bottom-1 w-2 md:w-4 bg-gray-100 rounded-r-md z-0 shadow-sm border border-gray-200"></div>

                {/* LEFT PAGE */}
                <div className={`w-1/2 h-full ${!isImageOnRight ? currentPageData.color : 'bg-[#fcfcfc]'} 
                    relative overflow-hidden rounded-l-sm md:rounded-l-xl z-10 shadow-md`}>

                    <div className={`w-full h-full relative ${isImageOnRight ? 'px-8 md:px-16' : ''}`}>
                        {isImageOnRight ? (
                            currentPageData.id === 'dedication' ? (
                                <OnboardingView />
                            ) : (
                                <ContentArea
                                    data={currentPageData}
                                    isChoice={isChoice}
                                    isPuzzle={isPuzzle}
                                    puzzleSolved={puzzleSolved}
                                    navigateTo={navigateTo}
                                    getIndexById={getIndexById}
                                    isLeftPage={true}
                                />
                            )
                        ) : (
                            <>
                                <MediaRenderer data={currentPageData} isSolved={puzzleSolved} isLeftPage={true} />
                                {(isPuzzle || isInteraction) && (
                                    <PuzzleView
                                        currentPageData={currentPageData}
                                        puzzleSolved={puzzleSolved}
                                        handlePuzzleInteraction={handlePuzzleInteraction}
                                        goToNextPage={goToNextPage}
                                        feedbackText={feedbackText}
                                        isSoundOn={isSoundEffectsOn}
                                    />
                                )}
                                {currentPageData.id === 'page-42' && <EngravedRiddle />}
                                {currentPageData.id === 'page-44' && <MagicTranslation />}
                            </>
                        )}
                    </div>

                    {history.length > 1 && <PageCurlBack onClick={goToPrevPage} />}
                </div>

                {/* CENTER LINE */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/30 z-40 transform -translate-x-1/2"></div>

                {/* RIGHT PAGE */}
                <div className={`w-1/2 h-full ${isImageOnRight ? currentPageData.color : 'bg-[#fcfcfc]'} 
                    relative overflow-hidden rounded-r-sm md:rounded-r-xl z-10 shadow-md`}>

                    {/* Dimming Overlay for Text Page */}
                    <div className={`absolute inset-0 bg-black z-30 pointer-events-none transition-opacity duration-1000 ${isPage3Dimmed ? 'opacity-95' : 'opacity-0'}`}></div>

                    <div className={`w-full h-full relative ${!isImageOnRight ? 'px-8 md:px-16' : ''}`}>
                        {!isImageOnRight ? (
                            currentPageData.id === 'dedication' ? (
                                <OnboardingView />
                            ) : (
                                <ContentArea
                                    data={currentPageData}
                                    isChoice={isChoice}
                                    isPuzzle={isPuzzle}
                                    puzzleSolved={puzzleSolved}
                                    navigateTo={navigateTo}
                                    getIndexById={getIndexById}
                                    isLeftPage={false}
                                />
                            )
                        ) : (
                            <>
                                <MediaRenderer data={currentPageData} isSolved={puzzleSolved} isLeftPage={false} />
                                {(isPuzzle || isInteraction) && (
                                    <PuzzleView
                                        currentPageData={currentPageData}
                                        puzzleSolved={puzzleSolved}
                                        handlePuzzleInteraction={handlePuzzleInteraction}
                                        goToNextPage={goToNextPage}
                                        feedbackText={feedbackText}
                                        isSoundOn={isSoundEffectsOn}
                                    />
                                )}
                                {currentPageData.id === 'page-42' && <EngravedRiddle />}
                                {currentPageData.id === 'page-44' && <MagicTranslation />}
                            </>
                        )}
                    </div>

                    {(!isChoice && (puzzleSolved || !isPuzzle)) && (
                        <PageCurl
                            onClick={goToNextPage}
                            pageNumber={currentPageData.pageNumber}
                            showIndicator={!isNarrationPlaying}
                        />
                    )}
                </div>
            </div>
        );
    };

    const isCover = currentPageData.id === 'cover';

    return (
        <div className="flex-1 flex items-center justify-center p-4 md:p-10 overflow-hidden relative">
            {/* Outer Background Dimming Overlay */}
            {currentPageData.id === 'page-3' && (
                <div className={`absolute inset-0 bg-black z-0 pointer-events-none transition-opacity duration-1000 ${!isNarrationPlaying ? 'opacity-95' : 'opacity-0'}`}></div>
            )}

            {/* Giant Rainbow Animation (appears 3s after page load) */}
            {currentPageData.id === 'page-46' && <RainbowOverlay />}

            <div className={`relative z-10 w-full flex justify-center ${!isCover ? 'py-8 md:py-12 px-4' : ''}`}>
                {!isCover ? (
                    <div className="real-book-frame relative h-fit overflow-visible">
                        {/* Page Stacks (Visual depth) */}
                        <div className="page-stack-left"></div>
                        <div className="page-stack-right"></div>

                        {/* The Bookmark Ribbon with Map Icon */}
                        <div className="bookmark-ribbon-shadow"></div>
                        <div className="bookmark-ribbon">
                            <button
                                onClick={() => setShowMap(true)}
                                className="bookmark-icon-btn"
                                title="Open Adventure Map"
                            >
                                <MapPin size={32} strokeWidth={2.5} fill="currentColor" fillOpacity={0.2} />
                            </button>
                        </div>

                        <div className="relative z-10 w-full">
                            {renderBookContent()}
                        </div>

                        {/* The Central Gutter (Spine) */}
                        <div className="book-gutter"></div>
                    </div>
                ) : (
                    renderBookContent()
                )}
            </div>

            {/* Balloons Animation on Celebration Pages */}
            {['page-16', 'page-29', 'page-36'].includes(currentPageData.id) && <BalloonsAnimation count={30} />}

            {/* Map Modal */}
            {showMap && <ProgressMap onClose={() => setShowMap(false)} />}
        </div>
    );
};

export default BookEngine;
