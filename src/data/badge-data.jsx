import React from 'react';
import { Medal, Backpack, Footprints, Apple, Search, Map, Palette, Hammer, Sprout, Key, Compass, Book, Wand2 } from 'lucide-react';

export const puzzleBadges = [
    { id: 'page-5', icon: <Backpack />, label: 'Packer', color: 'bg-orange-400' },
    { id: 'page-7', icon: <Compass />, label: 'Thinker', color: 'bg-rose-400' },
    { id: 'page-9', icon: <Sprout />, label: 'Berry Picker', color: 'bg-lime-400' },
    { id: 'page-12', icon: <Palette />, label: 'Matcher', color: 'bg-purple-400' },
    { id: 'page-18', icon: <Footprints />, label: 'Crosser', color: 'bg-cyan-400' },
    { id: 'page-20', icon: <Apple />, label: 'Snacker', color: 'bg-red-400' },
    { id: 'page-23', icon: <Search />, label: 'Finder', color: 'bg-amber-400' },
    { id: 'page-24', icon: <Map />, label: 'Explorer', color: 'bg-emerald-400' },
    { id: 'page-26', icon: <Hammer />, label: 'Builder', color: 'bg-indigo-400' },
    { id: 'page-32', icon: <Key />, label: 'Unlocker', color: 'bg-teal-400' },
    { id: 'page-43', icon: <Book />, label: 'Bookworm', color: 'bg-emerald-600' },
    { id: 'page-45', icon: <Wand2 />, label: 'Wizard', color: 'bg-indigo-600' },
];

export const endingBadges = [
    { id: 'end-page-a', icon: <Medal />, label: 'Friend', color: 'bg-blue-400' },
    { id: 'end-page-b1', icon: <Medal />, label: 'Hero', color: 'bg-green-400' },
    { id: 'end-page-b2', icon: <Medal />, label: 'Guest', color: 'bg-pink-400' },
    { id: 'end-page-secret', icon: <Medal />, label: 'Discoverer', color: 'bg-sky-400' },
];
