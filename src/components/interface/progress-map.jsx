import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useBook } from "../../context/book-context";
import { X } from 'lucide-react';

const MAP_IMAGE_URL = "/assets/progress-map/map-background.png";

const colours = {
    grey: '#475569', yellow: '#eab308', orange: '#f97316',
    pink: '#db2777', purple: '#9333ea', cyan: '#0891b2', lime: '#65a30d'
};

const stations = [
    { id: 1, x: -1800, y: -300, line: "grey" },
    { id: 2, x: -1400, y: -280, line: "grey" },
    { id: 3, x: -990, y: -290, line: "grey" },
    { id: 4, x: -700, y: -310, line: "grey" },
    { id: 5, x: -380, y: -330, line: "grey", isLarge: true },
    { id: 6, x: -70, y: -150, line: "grey" },
    { id: 7, x: 0, y: 300, line: "grey", isChoice: true },
    { id: 8, x: 300, y: 200, line: "yellow" },
    { id: 9, x: 600, y: 50, line: "yellow", isLarge: true },
    { id: 10, x: 1000, y: -100, line: "yellow" },
    { id: 11, x: 1550, y: -120, line: "yellow" },
    { id: 12, x: 1990, y: 100, line: "yellow", isLarge: true },
    { id: 13, x: 1900, y: 600, line: "yellow", isChoice: true },
    { id: 14, x: 2250, y: 500, line: "orange" },
    { id: 15, x: 2700, y: 700, line: "orange" },
    { id: 16, x: 2750, y: 1000, line: "orange", isEnd: true },
    { id: 17, x: -400, y: 400, line: "pink" },
    { id: 18, x: -950, y: 450, line: "pink", isLarge: true },
    { id: 19, x: -1750, y: 500, line: "pink" },
    { id: 20, x: -2350, y: 1000, line: "pink", isLarge: true },
    { id: 21, x: -1950, y: 1450, line: "pink" },
    { id: 22, x: -900, y: 1250, line: "pink" },
    { id: 23, x: 0, y: 1700, line: "pink", isHub: true },
    { id: 24, x: 200, y: 2500, line: "pink", isChoice: true },
    { id: 25, x: 800, y: 2400, line: "purple" },
    { id: 26, x: 1100, y: 2100, line: "purple", isLarge: true },
    { id: 27, x: 1800, y: 1900, line: "purple", isHub: true },
    { id: 28, x: 2400, y: 2050, line: "purple" },
    { id: 29, x: 2200, y: 2300, line: "purple", isEnd: true },
    { id: 30, x: -400, y: 2600, line: "cyan" },
    { id: 31, x: -500, y: 2200, line: "cyan" },
    { id: 32, x: 0, y: 1500, line: "cyan", hidden: true },
    { id: 33, x: -1100, y: 1800, line: "cyan" },
    { id: 34, x: -1450, y: 1900, line: "cyan" },
    { id: 35, x: -1900, y: 2100, line: "cyan" },
    { id: 36, x: -1700, y: 2850, line: "cyan" },
    { id: 37, x: -1200, y: 3050, line: "cyan" },
    { id: 38, x: -800, y: 2850, line: "cyan", isEnd: true },
    { id: 39, x: 2100, y: 1150, line: "lime" },
    { id: 41, x: 1200, y: 1600, line: "lime" },
    { id: 42, x: 800, y: 1600, line: "lime" },
    { id: 44, x: 110, y: 1100, line: "lime" },
    { id: 45, x: 500, y: 800, line: "lime", isLarge: true },
    { id: 46, x: 1000, y: 700, line: "lime", isEnd: true }
];

const routeConfigs = [
    { ids: [1, 2, 3, 4, 5, 6, 7], line: 'grey' },
    { ids: [7, 8, 9, 10, 11, 12, 13], line: 'yellow' },
    { ids: [13, 14, 15, 16], line: 'orange' },
    { ids: [7, 17, 18, 19, 20, 21, 22, 23, 24], line: 'pink' },
    { ids: [24, 25, 26, 27, 28, 29], line: 'purple' },
    { ids: [24, 30, 31, 32, 23, 33, 34, 35, 36, 37, 38], line: 'cyan' },
    { ids: [13, 39, 27, 41, 42, 23, 44, 45, 46], line: 'lime' }
];

function getBezierPoint(t, p0, pc, p1) {
    const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * pc.x + Math.pow(t, 2) * p1.x;
    const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * pc.y + Math.pow(t, 2) * p1.y;
    return { x, y };
}

function getBezierAngle(t, p0, pc, p1) {
    const dx = 2 * (1 - t) * (pc.x - p0.x) + 2 * t * (p1.x - pc.x);
    const dy = 2 * (1 - t) * (pc.y - p0.y) + 2 * t * (p1.y - pc.y);
    return Math.atan2(dy, dx) * (180 / Math.PI);
}

function createPathData(ids) {
    const pts = ids.map(id => stations.find(s => s.id === id)).filter(Boolean);
    if (pts.length < 2) return { d: "", beacons: [] };

    let d = `M ${pts[0].x} ${pts[0].y}`;
    const beacons = [];

    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const mx = (p0.x + p1.x) / 2;
        const my = (p0.y + p1.y) / 2;
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const curveAmount = (p0.id === 31 && p1.id === 32) ? 0.01 : 0.16;
        const pc = { x: mx + (dy * curveAmount), y: my - (dx * curveAmount) };
        d += ` Q ${pc.x} ${pc.y}, ${p1.x} ${p1.y}`;

        [0.35, 0.75].forEach(t => {
            const point = getBezierPoint(t, p0, pc, p1);
            const angle = getBezierAngle(t, p0, pc, p1);
            beacons.push({ x: point.x, y: point.y, angle });
        });
    }
    return { d, beacons };
}

const ProgressMap = ({ onClose }) => {
    const { bookData, currentIndex, history: storyHistoryIndices, isSecretUnlocked, navigateTo } = useBook();
    const [zoom] = useState(0.9);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const svgRef = useRef(null);

    // Map history indices to page IDs
    const historyIds = storyHistoryIndices.map(idx => bookData[idx]?.id).filter(Boolean);
    const currentPageId = bookData[currentIndex]?.id;

    // Derived mapping: Page string id to station number
    const pageToStationMap = useMemo(() => {
        const map = {
            'page-13B': 13,
            'page-32': 23,
            'page-43': 23,
            'page-40': 27,
            // cover, dedication, etc. won't map to anything and are excluded by default
        };
        for (let i = 1; i <= 46; i++) {
            if (!map[`page-${i}`]) map[`page-${i}`] = i;
        }
        return map;
    }, []);

    // Calculate active node and visited stations based on history
    const activeNodeId = pageToStationMap[currentPageId] || 1;

    const visitedNodes = useMemo(() => {
        const v = {};
        // Ensure starting station is active if we don't have history
        v[1] = colours.grey;
        historyIds.forEach(pageId => {
            const stationId = pageToStationMap[pageId];
            if (stationId) {
                const station = stations.find(s => s.id === stationId);
                if (station) {
                    v[stationId] = colours[station.line || 'grey'];
                }
            }
        });
        return v;
    }, [historyIds, pageToStationMap]);

    // Apply offset on mount based on activeNodeId
    useEffect(() => {
        const node = stations.find(s => s.id === activeNodeId);
        if (node) {
            // Center the active node using straightforward coordinate math relative to the viewBox
            // The viewBox is 5400x5000, so center is roughly at 0,0 offset
            setOffset({ x: -node.x, y: -node.y });
        }
    }, [activeNodeId]);

    const handleNodeClick = (clickedId) => {
        let targetPageId = `page-${clickedId}`;

        if (clickedId === 13 && isSecretUnlocked && historyIds.includes('page-13B')) {
            targetPageId = 'page-13B';
        } else if (clickedId === 23) {
            if (historyIds.includes('page-43')) targetPageId = 'page-43';
            else if (historyIds.includes('page-32')) targetPageId = 'page-32';
            else targetPageId = 'page-23';
        } else if (clickedId === 27) {
            if (historyIds.includes('page-40')) targetPageId = 'page-40';
            else targetPageId = 'page-27';
        }

        const targetIndex = bookData.findIndex(p => p.id === targetPageId);
        if (targetIndex !== -1) {
            navigateTo(targetIndex);
            onClose();
        }
    };

    const handleStart = (e) => {
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        if (svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            // Calculate how many SVG units equal 1 screen pixel
            const scaleX = 5400 / svgRect.width;
            const scaleY = 5000 / svgRect.height;

            setDragStart({
                x: clientX * scaleX - offset.x,
                y: clientY * scaleY - offset.y
            });
        }
    };

    const handleMove = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        if (svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const scaleX = 5400 / svgRect.width;
            const scaleY = 5000 / svgRect.height;

            setOffset({
                x: clientX * scaleX - dragStart.x,
                y: clientY * scaleY - dragStart.y
            });
        }
    };

    const handleEnd = () => setIsDragging(false);

    const activeNode = stations.find(s => s.id === activeNodeId);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md pointer-events-auto" style={{ fontFamily: "'Baloo 2', cursive" }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .node { cursor: pointer; transition: opacity 0.2s; }
                .node:hover { opacity: 0.8; }
                .pulse-ring { animation: ring-pulse 2s ease-out infinite; transform-origin: center; transform-box: fill-box; }
                .marker-anim-wrapper { animation: marker-bounce 1.5s ease-in-out infinite; transform-origin: center bottom; transform-box: fill-box; }
                @keyframes ring-pulse { 0% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(1.3); opacity: 0; } }
                @keyframes marker-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); } }
                text { -webkit-user-select: none; user-select: none; pointer-events: none; }
            `}} />

            {/* Header controls outside SVG */}
            <header className="absolute top-0 right-0 p-8 z-[110] flex gap-4 pointer-events-auto">
                <button
                    onClick={onClose}
                    className="p-4 bg-white/10 backdrop-blur hover:bg-white/20 border border-white/20 rounded-2xl transition-all shadow-lg active:scale-95 text-white"
                    title="Close Map"
                >
                    <X size={32} />
                </button>
            </header>

            <div
                id="map-container"
                ref={containerRef}
                className="aspect-[54/50] w-full max-h-[100dvh] max-w-[calc(100dvh*54/50)] flex items-center justify-center overflow-hidden touch-none relative mx-auto"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
            >
                <svg id="map-svg" ref={svgRef} viewBox="-2500 -1500 5400 5000" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
                    <defs>
                        <pattern id="choice-stripes" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                            <rect width="16" height="16" fill="white" fillOpacity="0.4" />
                            <line x1="0" y1="0" x2="0" y2="16" stroke="black" strokeOpacity="0.2" strokeWidth="8" />
                        </pattern>

                        <mask id="hub-mask">
                            <rect x="-3000" y="-1000" width="6000" height="6000" fill="white" />
                            <g id="mask-circles">
                                {stations.filter(s => s.isHub).map(hub => (
                                    <circle key={`mask-${hub.id}`} cx={hub.x} cy={hub.y} r="450" fill="black" />
                                ))}
                            </g>
                        </mask>
                    </defs>

                    <g id="viewport-group" transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
                        {/* Background Map layer */}
                        <image
                            href={MAP_IMAGE_URL}
                            x="-2500"
                            y="-1500"
                            width="5400"
                            height="5000"
                            preserveAspectRatio="xMidYMid slice"
                        />

                        {/* Paths layer masked */}
                        <g id="paths-layer" mask="url(#hub-mask)">
                            {routeConfigs.map((conf, index) => {
                                if (conf.line === 'lime' && !isSecretUnlocked) return null;
                                const { d, beacons } = createPathData(conf.ids);
                                const color = colours[conf.line];
                                if (!d) return null;
                                return (
                                    <g key={`path-${index}`}>
                                        <path d={d} fill="none" stroke="#000" strokeWidth="50" strokeOpacity="0.03" transform="translate(4,4)" />
                                        <path d={d} fill="none" stroke={color} strokeWidth="50" strokeLinecap="round" />
                                        {beacons.map((b, i) => (
                                            <path key={i} d="M -16 -10 L 20 0 L -16 10 L -10 0 Z" fill="white" transform={`translate(${b.x}, ${b.y}) rotate(${b.angle})`} />
                                        ))}
                                    </g>
                                );
                            })}
                        </g>

                        {/* Nodes layer */}
                        <g id="nodes-layer">
                            {stations.filter(s => !s.hidden).map(s => {
                                if (s.line === 'lime' && !isSecretUnlocked) return null;

                                const visitedColor = visitedNodes[s.id];
                                const isActive = activeNodeId === s.id;
                                const isPuzzle = s.isLarge;
                                const size = s.isHub ? 450 : (s.isChoice ? 140 : (isPuzzle ? 95 : (s.isEnd ? 75 : 45)));
                                const d = `M ${s.x - size} ${s.y} Q ${s.x - size} ${s.y - size}, ${s.x} ${s.y - size} Q ${s.x + size} ${s.y - size}, ${s.x + size} ${s.y} Q ${s.x + size} ${s.y + size}, ${s.x} ${s.y + size} Q ${s.x - size} ${s.y + size}, ${s.x - size} ${s.y}`;

                                return (
                                    <g key={`node-${s.id}`} className="node" onClick={() => handleNodeClick(s.id)}>
                                        {s.isHub ? (
                                            <path d={d} fill="transparent" />
                                        ) : (
                                            <>
                                                <path
                                                    d={d}
                                                    fill={visitedColor || "white"}
                                                    stroke={colours[s.line]}
                                                    strokeWidth={isActive ? (s.isChoice || s.isEnd ? 22 : 18) : (s.isChoice || s.isEnd ? 12 : 8)}
                                                />
                                                {s.isChoice && (
                                                    <>
                                                        <path d={d} fill="url(#choice-stripes)" style={{ pointerEvents: 'none' }} />
                                                        <g transform={`translate(${s.x - 70}, ${s.y - 70}) scale(5.8)`} style={{ pointerEvents: 'none' }}>
                                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-2.91-13a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.01 4h.01" fill="none" stroke={visitedColor ? "white" : colours[s.line]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                    </>
                                                )}
                                                {isPuzzle && !s.isChoice && (
                                                    <g transform={`translate(${s.x - 53}, ${s.y - 53}) scale(4.4)`} style={{ pointerEvents: 'none' }}>
                                                        <path d="M19.439 7.85c0-1.571-1.28-2.85-2.85-2.85a2.85 2.85 0 0 0-2.698 1.94 2.85 2.85 0 0 1-5.382 0 2.85 2.85 0 0 0-2.698-1.94c-1.571 0-2.85 1.279-2.85 2.85a2.85 2.85 0 0 0 1.94 2.698 2.85 2.85 0 0 1 0 5.382 2.85 2.85 0 0 0-1.94 2.698c0 1.571 1.279 2.85 2.85 2.85a2.85 2.85 0 0 0 2.698-1.94 2.85 2.85 0 0 1 5.382 0 2.85 2.85 0 0 0 2.698 1.94c1.571 0 2.85-1.279 2.85-2.85a2.85 2.85 0 0 0-1.94-2.698 2.85 2.85 0 0 1 0-5.382 2.85 2.85 0 0 0 1.94-2.698Z" fill="none" stroke={visitedColor ? "white" : colours[s.line]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </g>
                                                )}
                                                {s.isEnd && (
                                                    <circle cx={s.x} cy={s.y} r={size + 15} fill="none" stroke={colours[s.line]} strokeWidth="4" strokeDasharray="8 6" />
                                                )}
                                                {!isPuzzle && !s.isHub && !s.isChoice && !s.isEnd && (
                                                    <text x={s.x} y={s.y + 10} textAnchor="middle" dominantBaseline="middle" className="text-6xl font-extrabold fill-slate-800">
                                                        {s.id}
                                                    </text>
                                                )}
                                            </>
                                        )}
                                    </g>
                                );
                            })}
                        </g>

                        {/* Marker Layer */}
                        <g id="marker-layer">
                            {activeNode && (
                                <g transform={`translate(${activeNode.x}, ${activeNode.y})`} style={{ pointerEvents: 'none' }}>
                                    <circle cx="0" cy="0" r={activeNode.isHub ? 700 : 250} fill="none" stroke="#10b981" strokeWidth="10" className="pulse-ring" />
                                    <g className="marker-anim-wrapper">
                                        <path d="M 0 0 C -30 -60 -50 -75 -50 -110 C -50 -138 -28 -160 0 -160 C 28 -160 50 -138 50 -110 C 50 -75 30 -60 0 0 Z" fill="#059669" stroke="#ffffff" strokeWidth="6" transform={`scale(${activeNode.isHub ? 3.5 : 2.0})`} />
                                        <circle cx="0" cy={activeNode.isHub ? -380 : -220} r={activeNode.isHub ? 55 : 30} fill="#ffffff" />
                                    </g>
                                </g>
                            )}
                        </g>
                    </g>
                </svg>
            </div>
        </div >
    );
};

export default ProgressMap;
