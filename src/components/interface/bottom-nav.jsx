import React from 'react';
import { useBook } from "../../context/book-context";
import { ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';

const BottomNav = () => {
    const {
        goToPrevPage,
        history,
        goToNextPage,
        currentPageData,
        puzzleSolved
    } = useBook();

    const isNextDisabled =
        (!currentPageData.next && currentPageData.type !== 'choice') ||
        (currentPageData.type === 'puzzle' && !puzzleSolved) ||
        (currentPageData.type === 'choice') ||
        currentPageData.type === 'back-cover';

    return (
        <div className="fixed bottom-10 left-0 right-0 flex items-center justify-between px-20 pointer-events-none z-40">
            {/* BACK BUTTON (ORANGE STONE) */}
            <div className="pointer-events-auto">
                <button
                    onClick={goToPrevPage}
                    disabled={history.length <= 1}
                    className="btn-discovery btn-discovery-orange w-24 h-24 md:w-32 md:h-32 text-white group relative"
                >
                    <ChevronLeft size={64} strokeWidth={5} />
                    {/* Tooltip */}
                    <span className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-orange-500 border-4 border-orange-100 font-black text-sm px-4 py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-2 whitespace-nowrap shadow-xl">
                        Go Back
                    </span>
                </button>
            </div>

            {/* NEXT BUTTON (TEAL STONE) */}
            <div className="pointer-events-auto">
                <button
                    onClick={goToNextPage}
                    disabled={isNextDisabled}
                    className="btn-discovery btn-discovery-teal w-24 h-24 md:w-32 md:h-32 text-white group relative"
                >
                    <ChevronRight size={64} strokeWidth={5} />
                    {/* Tooltip */}
                    <span className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-teal-500 border-4 border-teal-100 font-black text-sm px-4 py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-2 whitespace-nowrap shadow-xl">
                        Go Next!
                    </span>
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
