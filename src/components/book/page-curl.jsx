import React from 'react';

export const PageCurl = ({ onClick, pageNumber, showIndicator }) => (
    <div
        onClick={onClick}
        className={`absolute bottom-0 right-0 w-24 h-24 md:w-40 md:h-40 cursor-pointer group z-50 overflow-hidden flex items-end justify-end ${!onClick ? 'hidden' : ''}`}
        title="Turn Page"
    >
        <div className="w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-out relative">
            <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
            <div className="absolute inset-0 filter drop-shadow-[-2px_2px_4px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full bg-gray-50" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)', backgroundImage: 'linear-gradient(135deg, #e5e7eb 0%, #ffffff 40%, #ffffff 100%)' }}></div>
            </div>
        </div>

        {pageNumber > 0 && (
            <div className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                {showIndicator && (
                    <>
                        <div className="absolute w-full h-full bg-blue-500 rounded-full animate-breathe blur-[2px]"></div>
                        <div className="absolute w-full h-full bg-blue-400 rounded-full"></div>
                    </>
                )}
                <span className={`text-sm font-serif font-bold relative z-10 ${showIndicator ? 'text-white' : 'text-gray-500'}`}>
                    {pageNumber}
                </span>
            </div>
        )}
    </div>
);

export const PageCurlBack = ({ onClick }) => (
    <div
        onClick={onClick}
        className={`absolute bottom-0 left-0 w-24 h-24 md:w-40 md:h-40 cursor-pointer group z-50 overflow-hidden flex items-end justify-start ${!onClick ? 'hidden' : ''}`}
        title="Previous Page"
    >
        <div className="w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-out relative">
            <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}></div>
            <div className="absolute inset-0 filter drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]">
                <div className="w-full h-full bg-gray-50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)', backgroundImage: 'linear-gradient(225deg, #e5e7eb 0%, #ffffff 40%, #ffffff 100%)' }} />
            </div>
        </div>
    </div>
);
