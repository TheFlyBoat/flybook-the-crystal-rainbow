import React from 'react';
import { useBook } from "../../context/book-context";
import BackgroundShapes from "./background-shapes";

const ThemeWrapper = ({ children }) => {
    const { getThemeClass } = useBook();

    return (
        <div className={`flex flex-col h-screen w-full overflow-hidden font-sans select-none transition-colors duration-1000 ${getThemeClass()}`}>
            <BackgroundShapes />
            <div className="relative z-10 flex flex-col h-full w-full">
                {children}
            </div>
        </div>
    );
};

export default ThemeWrapper;
