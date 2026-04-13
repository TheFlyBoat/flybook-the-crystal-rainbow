import React from 'react';
import MagicWord, { MAGIC_WORD_REGISTRY } from "./magic-word";
import { useBook } from "../../context/book-context";

const ContentArea = ({ data, isChoice, isPuzzle, puzzleSolved, navigateTo, getIndexById, isLeftPage }) => {
    const { playSFX } = useBook();

    // Padding applies to *the inside of the page*, symmetrical.
    const pagePadding = 'px-1 md:px-2 lg:px-1';

    // --- LOGIC: MAGIC WORDS PARSER ---
    const renderContentWithMagicWords = (text) => {
        if (!text) return null;

        // First, recursively process a string or array of strings for magic words `[[word]]`
        const processMagicWords = (content) => {
            if (typeof content !== 'string') return content;
            const pattern = /\[\[(.*?)\]\]/g;
            const parts = [];
            let lastIndex = 0;
            let match;
            while ((match = pattern.exec(content)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(content.substring(lastIndex, match.index));
                }
                parts.push(<MagicWord key={`mw-${match.index}`}>{match[1]}</MagicWord>);
                lastIndex = pattern.lastIndex;
            }
            if (lastIndex < content.length) {
                parts.push(content.substring(lastIndex));
            }
            return parts.length > 0 ? parts : content;
        };

        // Second, process the parts for "Rainbow Crystal(s)" or "Crystal(s)"
        const processCrystals = (partsArray) => {
            if (!Array.isArray(partsArray)) partsArray = [partsArray];

            const newParts = [];
            let globalKey = 0;

            const crystalPattern = /(Rainbow Crystals|Rainbow Crystal|rainbow crystals|rainbow crystal|Crystals|Crystal|crystals|crystal)/gi;

            partsArray.forEach(part => {
                if (typeof part !== 'string') {
                    newParts.push(part);
                    return;
                }

                let match;
                let lastIndex = 0;
                while ((match = crystalPattern.exec(part)) !== null) {
                    if (match.index > lastIndex) {
                        newParts.push(part.substring(lastIndex, match.index));
                    }
                    // Style the matched string
                    newParts.push(
                        <strong key={`rc-${globalKey++}`} className="text-2xl md:text-3xl lg:text-5xl font-black font-baloo bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-pulse drop-shadow-md px-1">
                            {match[0]}
                        </strong>
                    );
                    lastIndex = crystalPattern.lastIndex;
                }
                if (lastIndex < part.length) {
                    newParts.push(part.substring(lastIndex));
                }
            });

            return newParts;
        };

        // Run both parsers
        const parsedWithMagicWords = processMagicWords(text);
        const finalParsed = processCrystals(parsedWithMagicWords);

        return finalParsed;
    };

    // --- LOGIC: PATH COLOR MAPPING ---
    const getPathStyle = (pageId) => {
        const id = pageId?.toLowerCase() || '';

        // Secret Path (Blue)
        if (/^page-(39|43|44|45|46)$/.test(id) || id === 'end-page-secret') {
            return 'bg-sky-100 text-sky-700 border-sky-200';
        }

        // Silver Cave (Green)
        if (/^page-(30|31|32|33|34|35|36|37|38|41|42)$/.test(id) || id === 'end-page-b2') {
            return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        }

        // Purple Waterfall (Purple)
        if (/^page-(25|26|27|28|29|40)$/.test(id) || id === 'end-page-b1') {
            return 'bg-purple-100 text-purple-700 border-purple-200';
        }

        // Pink River (Pink)
        if (/^page-(17|18|19|20|21|22|23|24)$/.test(id)) {
            return 'bg-pink-100 text-pink-700 border-pink-200';
        }

        // Glowing Mushrooms (Orange)
        if (/^page-(14|15|16)$/.test(id) || id === 'end-page-a') {
            return 'bg-orange-100 text-orange-700 border-orange-200';
        }

        // Fireflies Trail (Yellow)
        if (/^page-(8|9|10|11|12|13|13b)$/.test(id)) {
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }

        // Home (Grey/White)
        return 'bg-slate-100 text-slate-500 border-slate-100';
    };

    return (
        <div className={`flex-1 flex flex-col ${pagePadding} py-12 relative z-10 h-full`}>

            {/* PAGE LABEL */}
            {data.pageNumber !== undefined && (
                <div className={`w-full flex ${isLeftPage ? 'justify-start' : 'justify-end'} mb-2`}>
                    <span className={`px-4 py-1 rounded-full text-[10px] md:text-sm font-black tracking-widest uppercase shadow-sm border-2 ${getPathStyle(data.id)}`}>
                        {isPuzzle ? '🧩 Activity' : (isChoice ? '✨ What will you do?' : '📖 Story')}
                    </span>
                </div>
            )}

            {/* TRUE PAGE-LEVEL CENTERING */}
            <div className="flex-1 flex flex-col justify-center">

                {/* THIS centers the text block inside the PAGE, not the book */}
                <div className={`mx-auto w-full max-w-full ${isChoice ? 'text-center' : 'text-left'}`}>

                    <div
                        className={`font-serif text-gray-800 antialiased whitespace-pre-wrap ${isChoice ? 'font-baloo font-bold' : ''}`}
                        style={{
                            fontSize: isChoice ? 'clamp(1.1rem, 2.5vh, 2.5rem)' : 'clamp(0.85rem, 2.5vh, 1.4rem)',
                            lineHeight: isChoice ? '1.2' : 'clamp(1.2rem, 3vh, 2.2rem)'
                        }}
                    >
                        {isPuzzle && data.text?.includes('\n\n') ? (
                            <>
                                <h2 className="font-black mb-4 sm:mb-6 text-gray-900 tracking-tight font-baloo"
                                    style={{ fontSize: 'clamp(1.2rem, 4vh, 3rem)', lineHeight: '1.1' }}>
                                    {data.text.split('\n\n')[0]}
                                </h2>
                                <div className="opacity-90">
                                    {renderContentWithMagicWords(data.text.split('\n\n').slice(1).join('\n\n'))}
                                </div>
                            </>
                        ) : (
                            renderContentWithMagicWords(data.text)
                        )}
                    </div>

                    {/* CHOICE BUTTONS */}
                    {isChoice && (
                        <div className="flex flex-col gap-4 mt-10 max-w-md mx-auto">
                            {data.choices.map((choice, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigateTo(getIndexById(choice.targetId))}
                                    onMouseEnter={() => choice.audioSrc && playSFX(choice.audioSrc)}
                                    className={`w-full py-4 px-6 rounded-[2rem] border-4 border-black/5 shadow-lg 
                                                font-baloo font-black text-lg md:text-2xl 
                                                transition-transform hover:scale-105 active:scale-95
                                                ${choice.color}`}
                                >
                                    {choice.label}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ContentArea;
