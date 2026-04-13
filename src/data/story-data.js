export const bookData = [
    // --- FRONT COVER ---
    {
        id: 'cover',
        type: 'cover',
        title: 'Laura and the Rainbow Crystal',
        author: 'FlyBooks Creative',
        coverColor: 'bg-emerald-900',
        media: "/assets/image/cover-book-closed.png",
        mediaType: 'image',
        audioSrc: "/assets/audio/narration/p-title-read.mp3",
        next: 'dedication'
    },

    // --- DEDICATION PAGE ---
    {
        id: 'dedication',
        type: 'spread',
        pageNumber: 0,
        layout: 'image-left',
        media: "/assets/video/back-cover.mp4",
        mediaType: 'video',
        text: `Welcome to a magical interactive adventure!

Here is how to play:
1. Swipe or tap the arrows to turn the pages.
2. Tap the coloured magic words to hear special sounds!
3. Look out for the pulsing hand icon—tap it to play with puzzles and explore!

Ready? Let's go!`,
        color: 'bg-[#fcfcfc]',
        next: 'page-1'
    },

    // --- MAIN PATH ---
    {
        id: 'page-1',
        type: 'spread',
        pageNumber: 1,
        layout: 'image-left',
        media: "/assets/image/p01-new.webp",
        mediaType: 'image',
        text: `Today is a very special day.
It is Laura’s fifth birthday!

That morning,
a little leaf popped up at the window.
[[Tap, tap, tap!]]

It was Lilo,
her magic friend!`,
        color: 'bg-green-800',
        audioSrc: "/assets/audio/narration/p-01-read.mp3",
        next: 'page-2'
    },

    {
        id: 'page-2',
        type: 'spread',
        pageNumber: 2,
        layout: 'image-right',
        media: "/assets/image/p02-new.webp",
        clickMedia: "/assets/video/p02-new.mp4",
        mediaType: 'image',
        noLoop: true,
        text: `Lilo jumped onto Laura’s soft bed.
[[Boing… boing…]]

Laura laughed
and bounced too.`,
        color: 'bg-emerald-700',
        audioSrc: "/assets/audio/narration/p-02-read.mp3",
        next: 'page-3'
    },

    {
        id: 'page-3',
        type: 'spread',
        pageNumber: 3,
        layout: 'image-left',
        media: "/assets/image/p03-new.webp",
        clickMedia: "/assets/video/p03-new.mp4",
        mediaType: 'image',
        noLoop: true,
        text: `[[Boing… boing…]]
[[BUMP!]] Oh no!

Laura’s favourite lantern
wobbled…
and wobbled…
and tumbled to the floor.

The lantern flickered once…
then twice…[[Flick… flick…]]
And went dark.
[[Puff!]]`,
        color: 'bg-slate-800',
        audioSrc: "/assets/audio/narration/p-03-read.mp3",
        audioSrc2: "/assets/audio/narration/p-03b-read.mp3",
        autoTriggerInteraction: true,
        next: 'page-4'
    },

    {
        id: 'page-4',
        type: 'spread',
        pageNumber: 4,
        layout: 'image-right',
        media: "/assets/image/p04-new.webp",
        mediaType: 'image',
        text: `Lilo looked at the faded lantern
and had an idea. 

“The Rainbow Crystal
can make your lantern bright again!"

“The crystal is hidden in the forest.
Let’s go on an adventure!”

Laura smiled.
“Let’s go!”`,
        color: 'bg-slate-800',
        audioSrc: "/assets/audio/narration/p-04-read.mp3",
        next: 'page-5'
    },

    {
        id: 'page-5',
        type: 'puzzle',
        pageNumber: 5,
        layout: 'image-right',
        media: "/assets/puzzles/packbag-puzzle/backpack-bg.png",
        mediaType: 'image',
        text: `The Backpack

Laura grabbed her backpack.
Tap the things Laura needs for her adventure.`,
        puzzleType: 'packing',
        items: [
            { id: 'map', src: "/assets/puzzles/packbag-puzzle/item-map.png", correct: true, hoverAudio: "/assets/audio/items/p05/map.mp3", style: { top: '8%', left: '10%', width: '45%' } },
            { id: 'apple', src: "/assets/puzzles/packbag-puzzle/item-apple.png", correct: true, hoverAudio: "/assets/audio/items/p05/apple.mp3", style: { top: '22%', left: '68%', width: '23%' } },
            { id: 'water', src: "/assets/puzzles/packbag-puzzle/item-water.png", correct: true, hoverAudio: "/assets/audio/items/p05/water.mp3", style: { top: '40%', left: '18%', width: '21%' } },
            { id: 'torch', src: "/assets/puzzles/packbag-puzzle/item-torch.png", correct: true, hoverAudio: "/assets/audio/items/p05/torch.mp3", style: { top: '65%', left: '62%', width: '31%' } },
            { id: 'teddy', src: "/assets/puzzles/packbag-puzzle/item-teddy.png", correct: false, hoverAudio: "/assets/audio/items/p05/teddy-bear.mp3", style: { top: '28%', left: '38%', width: '31%' } }
        ],
        color: 'bg-amber-100',
        audioSrc: "/assets/audio/narration/p-05-read.mp3",
        successText: "Well done! All packed! Ready to go!",
        successAudio: "/assets/audio/items/p05/p-05-well-done.mp3",
        next: 'page-6'
    },

    {
        id: 'page-6',
        type: 'spread',
        pageNumber: 6,
        layout: 'image-right',
        media: "/assets/image/p06-new.webp",
        clickMedia: "/assets/video/pink-river.mp4",
        mediaType: 'image',
        text: `Laura and Lilo stepped into the Magic Forest.

Two paths waited ahead.

To the left,
[[buzz, buzz]]
fireflies danced.

To the right
[[Gloop… glop…]]
flowed the Pink River.`,
        color: 'bg-indigo-900',
        audioSrc: "/assets/audio/narration/p-06-read.mp3",
        next: 'page-7'
    },

    {
        id: 'page-7',
        type: 'choice',
        pageNumber: 7,
        layout: 'image-left',
        media: "/assets/image/p07-new.webp",
        clickMedia: "/assets/video/left-fireflies.mp4",
        mediaType: 'image',
        text: `Which path should Laura and Lilo choose?`,
        choices: [
            { label: 'Fireflies Trail', targetId: 'page-8', color: 'bg-yellow-400 text-white hover:bg-yellow-500 shadow-yellow-200' },
            { label: 'Pink River', targetId: 'page-17', color: 'bg-pink-500 text-white hover:bg-pink-600 shadow-pink-200' }
        ],
        color: 'bg-slate-900',
        audioSrc: "/assets/audio/narration/p-07-read.mp3"
    },

    // --- PATH A ---
    {
        id: 'page-8',
        type: 'spread',
        pageNumber: 8,
        layout: 'image-right',
        media: "/assets/image/p08-new.webp",
        mediaType: 'image',
        text: `Along the firefly trail,
they met Barnaby the Beaver.

“Oh dear,” said Barnaby.
“My basket has tipped over!”
“My berries are everywhere!”`,
        color: 'bg-yellow-900',
        audioSrc: "/assets/audio/narration/p-08-read.mp3",
        next: 'page-9'
    },

    {
        id: 'page-9',
        type: 'puzzle',
        pageNumber: 9,
        layout: 'image-right',
        media: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-background.png",
        mediaType: 'image',
        text: `Barnaby’s Basket

Can you help Barnaby?
Drag the berries into the basket.
Watch out for the bugs!`,
        puzzleType: 'beaver-basket',
        basket: {
            src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-basket.png",
            style: { top: '60%', left: '35%', width: '30%', height: '30%' }
        },
        items: [
            { id: 'r1', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-raspberry-0011.png", correct: true, style: { top: '22%', left: '18%', width: '16%' } },
            { id: 'r2', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-raspberry-0012.png", correct: true, style: { top: '32%', left: '46%', width: '16%' } },
            { id: 'r3', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-raspberry-0013.png", correct: true, style: { top: '50%', left: '60%', width: '16%' } },
            { id: 'b1', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-blueberry-0001.png", correct: true, style: { top: '56%', left: '76%', width: '15%' } },
            { id: 'b2', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-blueberry-0002.png", correct: true, style: { top: '19%', left: '71%', width: '15%' } },
            { id: 'b3', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-blueberry-0003.png", correct: true, style: { top: '46%', left: '30%', width: '15%' } },
            { id: 'b4', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-blueberry-0004.png", correct: true, style: { top: '14%', left: '33%', width: '15%' } },
            { id: 'b5', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-blueberry-0014.png", correct: true, style: { top: '56%', left: '11%', width: '15%' } },
            { id: 'bug1', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-bug-0007.png", correct: false, style: { top: '45%', left: '15%', width: '14%' } },
            { id: 'bug2', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-bug-0009.png", correct: false, style: { top: '25%', left: '62%', width: '14%' } },
            { id: 'ladybird', src: "/assets/puzzles/berry-puzzle/p13-a-beaver-puzzle-ladybug-0010.png", correct: false, style: { top: '40%', left: '80%', width: '14%' } }
        ],
        color: 'bg-amber-800',
        audioSrc: "/assets/audio/narration/p-09-read.mp3",
        successText: `Good Job! The berry basket is full.\nNo bugs were harmed!`,
        successAudio: "/assets/audio/items/p09/p09-well-done.mp3",
        next: 'page-10'
    },

    {
        id: 'page-10',
        type: 'spread',
        pageNumber: 10,
        layout: 'image-right',
        media: "/assets/video/p10-beaver.mp4",
        mediaType: 'video',
        noLoop: true,
        fallbackImage: "/assets/image/p10-new.webp",
        text: `Barnaby was so happy
he did a little beaver dance.

“Thank you!” he said,
handing Laura a small jar.
“Take this berry syrup.”

Laura asked about the Rainbow Crystal.
“I don’t know about crystals,”
said Barnaby.

“But the Ancient Tree might.”`,
        color: 'bg-emerald-800',
        audioSrc: "/assets/audio/narration/p-10-read.mp3",
        next: 'page-11'
    },

    {
        id: 'page-11',
        type: 'spread',
        pageNumber: 11,
        layout: 'image-left',
        media: "/assets/image/p11-new.webp",
        mediaType: 'image',
        text: `Soon, Laura and Lilo reached
the Ancient Tree.

This was Barkly.
Barkly opened his sleepy eyes
and rumbled,

“To pass through my roots,
you must solve a puzzle."`,
        color: 'bg-green-950',
        audioSrc: "/assets/audio/narration/p-11-read.mp3",
        next: 'page-12'
    },

    {
        id: 'page-12',
        type: 'puzzle',
        pageNumber: 12,
        layout: 'image-right',
        media: "/assets/puzzles/ancient-tree-puzzle/lawn-background-puzzle.png",
        mediaType: 'image',
        text: `Barkly’s Mushrooms

Barkly’s roots are blocking the path.
He will only move if the colours match.
Tap two mushrooms that are the same colour.`,
        puzzleType: 'match-pairs',
        items: [
            { id: 'm1-a', pairId: 1, src: "/assets/puzzles/ancient-tree-puzzle/mushroom-red.png", style: { order: 1 } },
            { id: 'm2-a', pairId: 2, src: "/assets/puzzles/ancient-tree-puzzle/mushroom-pink.png", style: { order: 2 } },
            { id: 'm3-a', pairId: 3, src: "/assets/puzzles/ancient-tree-puzzle/mushroom-cyan.png", style: { order: 3 } },
            { id: 'm1-b', pairId: 1, src: "/assets/puzzles/ancient-tree-puzzle/mushroom-red.png", style: { order: 4 } },
            { id: 'm3-b', pairId: 3, src: "/assets/puzzles/ancient-tree-puzzle/mushroom-cyan.png", style: { order: 5 } },
            { id: 'm2-b', pairId: 2, src: "/assets/puzzles/ancient-tree-puzzle/mushroom-pink.png", style: { order: 6 } }
        ],
        color: 'bg-slate-900',
        audioSrc: "/assets/audio/narration/p-12-read.mp3",
        successText: "Brilliant! You matched them all!",
        successAudio: "/assets/audio/items/p12/p-12-well-done.mp3",
        next: 'page-13'
    },

    {
        id: 'page-13',
        type: 'spread',
        pageNumber: 13,
        layout: 'image-right',
        media: "/assets/video/p13a.mp4",
        mediaType: 'video',
        noLoop: true,
        text: `"You are very clever!" 
said the Ancient Tree.

“What you seek lies beyond
the Giant Glowing Mushrooms.”

Then Slowly…
[[creak by creak…]]
Barkly lifted his wooden roots.

Laura and Lilo stepped into
an underground passage.`,
        color: 'bg-slate-900',
        audioSrc: "/assets/audio/narration/p-13-read.mp3",
        next: 'page-14'
    },

    {
        id: 'page-secret-transition',
        type: 'spread',
        pageNumber: 13,
        layout: 'image-right',
        media: "/assets/video/tree-welcome.mp4",
        mediaType: 'video',
        noLoop: true,
        playSound: true,
        text: `"I see you found three Crystals,
And a secret path has revealed!"
said the Ancient Tree.`,
        color: 'bg-slate-900',
        next: 'page-13B'
    },

    {
        id: 'page-13B',
        type: 'choice',
        pageNumber: 13,
        layout: 'image-left',
        media: "/assets/video/p13a.mp4",
        mediaType: 'video',
        noLoop: true,
        text: `Choose Your Path:`,
        choices: [
            { label: 'Giant Mushrooms', targetId: 'page-14', color: 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200' },
            { label: 'Secret Path', targetId: 'page-39', color: 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-200' }
        ],
        color: 'bg-slate-900',
        audioSrc: "/assets/audio/narration/p-13b-read.mp3"
    },

    {
        id: 'page-14',
        type: 'spread',
        pageNumber: 14,
        layout: 'image-left',
        media: "/assets/image/p14-new.webp",
        clickMedia: "/assets/image/p14b-new.webp",
        mediaType: 'image',
        text: `On the other side
they walked between
the Giant Glowing Mushrooms.

Touch them.
They glow!`,
        color: 'bg-indigo-950',
        audioSrc: "/assets/audio/narration/p-14-read.mp3",
        next: 'page-15'
    },

    {
        id: 'page-15',
        type: 'spread',
        pageNumber: 15,
        layout: 'image-right',
        media: "/assets/image/p15-new.webp",
        clickMedia: "/assets/video/p15-crystal-glow.mp4",
        mediaType: 'image',
        text: `The last mushroom faded.

A bright light shimmered
on the moss.
[[Shimmer… shimmer…]]

The Rainbow Crystal!`,
        color: 'bg-yellow-800',
        audioSrc: "/assets/audio/narration/p-15-read.mp3",
        next: 'page-16'
    },

    {
        id: 'page-16',
        type: 'spread',
        pageNumber: 16,
        layout: 'image-right',
        media: "/assets/image/p16-new.webp",
        mediaType: 'image',
        text: `At home Laura placed the crystal
inside her lantern.

[[Whoosh!]]

The bedroom filled
with rainbows.

To celebrate, they had birthday pancakes
covered in Barnaby’s berry syrup.

The best berry birthday!!`,
        color: 'bg-yellow-800',
        audioSrc: "/assets/audio/narration/p-16-read.mp3",
        next: 'end-page-a'
    },

    // --- PATH B ---
    {
        id: 'page-17',
        type: 'spread',
        pageNumber: 17,
        layout: 'image-left',
        media: "/assets/image/p17-new.webp",
        mediaType: 'image',
        text: `Laura reached the Pink River.
It was wide.
Too wide to jump.

Pink water bubbled and sparkled.
[[Blub, blub, blub!]]

Flat stones rested on the surface,
making a path across.`,
        color: 'bg-pink-900',
        audioSrc: "/assets/audio/narration/p-17-read.mp3",
        next: 'page-18'
    },

    {
        id: 'page-18',
        type: 'puzzle',
        pageNumber: 18,
        layout: 'image-right',
        media: "/assets/puzzles/pink-river-puzzle/river-background-puzzle.png",
        mediaType: 'image',
        text: `River Stones

To cross the Pink River
Tap the stones in order: 1, 2, 3, 4, 5.`,
        puzzleType: 'stones-order',
        items: [
            { id: 'stone-1', number: 1, src: "/assets/puzzles/pink-river-puzzle/river-stone-base.png", style: { top: '72%', left: '42%', width: '22%' } },
            { id: 'stone-2', number: 2, src: "/assets/puzzles/pink-river-puzzle/river-stone-base.png", style: { top: '40%', left: '28%', width: '32%' } },
            { id: 'stone-3', number: 3, src: "/assets/puzzles/pink-river-puzzle/river-stone-base.png", style: { top: '52%', left: '60%', width: '20%' } },
            { id: 'stone-4', number: 4, src: "/assets/puzzles/pink-river-puzzle/river-stone-base.png", style: { top: '27%', left: '51%', width: '18%' } },
            { id: 'stone-5', number: 5, src: "/assets/puzzles/pink-river-puzzle/river-stone-base.png", style: { top: '10%', left: '68%', width: '20%' } }
        ],
        color: 'bg-pink-700',
        audioSrc: "/assets/audio/narration/p-18-read.mp3",
        successText: "Spot on! A perfect path across the water.",
        successAudio: "/assets/audio/items/p18/p-18-read-well-done.mp3",
        next: 'page-19'
    },

    {
        id: 'page-19',
        type: 'spread',
        pageNumber: 19,
        layout: 'image-right',
        media: "/assets/image/p19-new.webp",
        mediaType: 'image',
        text: `On the other side,
they met a little hedgehog
named Hugo.

He was curled into
a prickly ball.

“You’re shy,” said Laura.
“And sooo hungry” said Hugo

“You are always hungry!” said Lilo`,
        color: 'bg-pink-800',
        audioSrc: "/assets/audio/narration/p-19-read.mp3",
        next: 'page-20'
    },

    {
        id: 'page-20',
        type: 'puzzle',
        pageNumber: 20,
        layout: 'image-right',
        media: "/assets/puzzles/hedgehog-puzzle/backpack-bg.png",
        mediaType: 'image',
        text: `Hugo’s Snack

Look in your backpack.
Tap a snack to give to Hugo`,
        puzzleType: 'packing',
        items: [
            { id: 'map', src: "/assets/puzzles/hedgehog-puzzle/item-map.png", correct: false, hoverAudio: "/assets/audio/items/p20/map.mp3", style: { top: '8%', left: '10%', width: '45%' } },
            { id: 'apple', src: "/assets/puzzles/hedgehog-puzzle/item-apple.png", correct: true, hoverAudio: "/assets/audio/items/p20/apple.mp3", style: { top: '22%', left: '68%', width: '23%' } },
            { id: 'water', src: "/assets/puzzles/hedgehog-puzzle/item-water.png", correct: false, hoverAudio: "/assets/audio/items/p20/water.mp3", style: { top: '40%', left: '18%', width: '21%' } },
            { id: 'torch', src: "/assets/puzzles/hedgehog-puzzle/item-torch.png", correct: false, hoverAudio: "/assets/audio/items/p20/torch.mp3", style: { top: '65%', left: '62%', width: '31%' } }
        ],
        color: 'bg-pink-700',
        audioSrc: "/assets/audio/narration/p-20-read.mp3",
        successText: "Well Done! An apple a day keeps the doctor away.",
        successAudio: "/assets/audio/items/p20/p-20-well-done.mp3",
        next: 'page-21'
    },

    {
        id: 'page-21',
        type: 'spread',
        pageNumber: 21,
        layout: 'image-left',
        media: "/assets/video/p21-hedghog-apple.mp4",
        mediaType: 'video',
        text: `Laura took the apple
and gently rolled it to Hugo.
[[Crunch, crunch]]

“Thank you,” Hugo smiled.
“Squeaky the Squirrel is ahead,”
he whispered.

“He found a silver dinosaur book!
“I’m soooo hungry”`,
        color: 'bg-pink-700',
        audioSrc: "/assets/audio/narration/p-21-read.mp3",
        next: 'page-22'
    },

    {
        id: 'page-22',
        type: 'spread',
        pageNumber: 22,
        layout: 'image-right',
        media: "/assets/image/p22-new.webp",
        mediaType: 'image',
        text: `Soon, they found Squeaky.
[[Eek! Eek!]]
“Oh no!” he cried. 

“I buried my Golden Nut.
Now I can’t remember where!”
I know it was near the fruit trees.
“The orchard!” said Laura.`,
        color: 'bg-emerald-900',
        audioSrc: "/assets/audio/narration/p-22-read.mp3",
        next: 'page-23'
    },

    {
        id: 'page-23',
        type: 'puzzle',
        pageNumber: 23,
        layout: 'image-right',
        media: "/assets/puzzles/find-nut/0005-map-start.png",
        mediaType: 'image',
        text: `The Orchard

Help Squeaky to find his Golden Nut.
Tap the holes to dig and find it.`,
        puzzleType: 'find-nut',
        items: [
            { id: 'Golden Nut', src: "/assets/puzzles/find-nut/0001-nut.png", correct: true, hoverAudio: "/assets/audio/items/p23/p-23-golden-nut.mp3", style: { top: '60%', left: '50%', width: '22%', height: '15%' } },
            { id: 'Silver Key', src: "/assets/puzzles/find-nut/0002-key.png", correct: false, hoverAudio: "/assets/audio/items/p23/p-23-silver-key.mp3", style: { top: '45%', left: '53%', width: '22%', height: '17%' } },
            { id: 'Magic Book', src: "/assets/puzzles/find-nut/0003-book.png", correct: false, hoverAudio: "/assets/audio/items/p23/p-23-magic-book.mp3", style: { top: '58%', left: '23%', width: '22%', height: '15%' } },
            { id: 'Dinosaur Bone', src: "/assets/puzzles/find-nut/0004-bone.png", correct: false, hoverAudio: "/assets/audio/items/p23/p-23-dinosaur-bone.mp3", style: { top: '42%', left: '29%', width: '22%', height: '15%' } }
        ],
        color: 'bg-teal-900',
        audioSrc: "/assets/audio/narration/p-23-read.mp3",
        successText: "Good job! You found the Golden Nut.",
        successAudio: "/assets/audio/items/p23/p-23-well-done.mp3",
        next: 'page-24'
    },

    {
        id: 'page-24',
        type: 'choice',
        pageNumber: 24,
        layout: 'image-left',
        media: "/assets/image/p24-new.webp",
        mediaType: 'image',
        text: `Where should Laura explore next?`,
        choices: [
            { label: 'Purple Waterfall', targetId: 'page-25', color: 'bg-purple-500 text-white hover:bg-purple-600 shadow-purple-200' },
            { label: 'Silver Cave', targetId: 'page-30', color: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200' }
        ],
        color: 'bg-teal-900',
        audioSrc: "/assets/audio/narration/p-24-read.mp3"
    },

    // --- PATH B1 ---
    {
        id: 'page-25',
        type: 'spread',
        pageNumber: 25,
        layout: 'image-right',
        media: "/assets/image/p25-new.webp",
        mediaType: 'image',
        text: `They could hear the waterfall.
[[Rush, Gush, Splash!]] They were close.

Oh No!
The bridge is broken.

Laura checked her map
They have to cross the bridge.

This is the only way.`,
        color: 'bg-green-800',
        audioSrc: "/assets/audio/narration/p-25-read.mp3",
        next: 'page-26'
    },

    {
        id: 'page-26',
        type: 'puzzle',
        pageNumber: 26,
        layout: 'image-right',
        media: "/assets/puzzles/bridge-puzzle/bridge-bg-puzzle.png",
        mediaType: 'image',
        text: `The Broken Bridge

The bridge is broken!
Tap the shapes that fit to fix the bridge.`,
        puzzleType: 'selection-reveal',
        items: [
            { id: 'circle', src: "/assets/puzzles/bridge-puzzle/bridge-circle.png", revealSrc: "/assets/puzzles/bridge-puzzle/bridge-circle-correct.png", correct: true, style: { top: '15%', left: '22.5%', width: '15%' } },
            { id: 'pentagon', src: "/assets/puzzles/bridge-puzzle/bridge-pentagon.png", correct: false, style: { top: '15%', left: '42.5%', width: '15%' } },
            { id: 'rectangle', src: "/assets/puzzles/bridge-puzzle/bridge-rectangle.png", revealSrc: "/assets/puzzles/bridge-puzzle/bridge-rectangle-correct.png", correct: true, style: { top: '15%', left: '62.5%', width: '15%' } },
            { id: 'star', src: "/assets/puzzles/bridge-puzzle/bridge-star.png", correct: false, style: { top: '32%', left: '32.5%', width: '15%' } },
            { id: 'triangle', src: "/assets/puzzles/bridge-puzzle/bridge-triangle.png", revealSrc: "/assets/puzzles/bridge-puzzle/bridge-triangle-correct.png", correct: true, style: { top: '32%', left: '52.5%', width: '15%' } }
        ],
        color: 'bg-emerald-800',
        audioSrc: "/assets/audio/narration/p-26-read.mp3",
        successText: "Good job! The bridge is safe now.",
        successAudio: "/assets/audio/items/p26/p-26-read-well-done.mp3",
        next: 'page-27'
    },

    {
        id: 'page-27',
        type: 'spread',
        pageNumber: 27,
        layout: 'image-right',
        media: "/assets/video/p27-waterfall.mp4",
        mediaType: 'video',
        text: `The bridge was now safe.

And there it was
The Purple Waterfall!

Purple water shimmered and flowed,
surrounded by rocks covered
in glowing green moss.`,
        color: 'bg-cyan-900',
        audioSrc: "/assets/audio/narration/p-27-read.mp3",
        next: 'page-28'
    },

    {
        id: 'page-28',
        type: 'spread',
        pageNumber: 28,
        layout: 'image-left',
        media: "/assets/image/p28-new.webp",
        mediaType: 'image',
        text: `Behind the falling water,
a sparkle shimmered bright.
 
The Rainbow Crystal!
 
Laura placed it
inside her lantern.
 
Warm, magical light
filled the air.`,
        color: 'bg-pink-900',
        audioSrc: "/assets/audio/narration/p-28-read.mp3",
        next: 'page-29'
    },

    {
        id: 'page-29',
        type: 'spread',
        pageNumber: 29,
        layout: 'image-right',
        media: "/assets/video/p29-new.mp4",
        mediaType: 'video',
        text: `Back at home, 
Laura celebrated her birthday 
with her family and friends.

Lilo leaned close and whispered,
 “The Rainbow Crystals aren’t finished… yet.”`,
        color: 'bg-blue-900',
        audioSrc: "/assets/audio/narration/p-29-read.mp3",
        next: 'end-page-b1'
    },

    // --- PATH B2 ---
    {
        id: 'page-30',
        type: 'spread',
        pageNumber: 30,
        layout: 'image-left',
        media: "/assets/image/p30-new.webp",
        mediaType: 'image',
        text: `Squeaky danced and said:
“Thank you!”

“I’ll show you the way
to the Silver Cave!” he said.

They reached a wooden door
set into the mountain.

It was locked.`,
        color: 'bg-slate-800',
        audioSrc: "/assets/audio/narration/p-30-read.mp3",
        next: 'page-31'
    },

    {
        id: 'page-31',
        type: 'spread',
        pageNumber: 31,
        layout: 'image-right',
        media: "/assets/image/p31-new.webp",
        mediaType: 'image',
        text: `“The crystal might be inside,”
Lilo whispered.

Squeaky bounced.
“There’s a silver key
near the fruit trees…

I just can’t remember where!”
 
“Near the fruit trees…
The Orchard!” Laura said.`,
        color: 'bg-slate-800',
        audioSrc: "/assets/audio/narration/p-31-read.mp3",
        next: 'page-32'
    },

    {
        id: 'page-32',
        type: 'puzzle',
        pageNumber: 32,
        layout: 'image-right',
        media: "/assets/puzzles/find-key/0005-map-start-key.png",
        mediaType: 'image',
        text: `The Orchard

Back to the Orchard.
Tap the holes to dig and find the Silver Key.`,
        puzzleType: 'find-nut',
        items: [
            { id: 'Silver Key', src: "/assets/puzzles/find-key/0002-key.png", correct: true, hoverAudio: "/assets/audio/items/p32/p-32-silver-key.mp3", style: { top: '45%', left: '53%', width: '22%', height: '17%' } },
            { id: 'Nothing Here', src: "/assets/puzzles/find-key/0001-nut-empty.png", correct: false, hoverAudio: "/assets/audio/items/p32/p-32-nothing.mp3", style: { top: '60%', left: '50%', width: '22%', height: '15%' } },
            { id: 'Magic Book', src: "/assets/puzzles/find-key/0003-book.png", correct: false, hoverAudio: "/assets/audio/items/p32/p-32-magic-book.mp3", style: { top: '58%', left: '23%', width: '22%', height: '15%' } },
            { id: 'Dinosaur Bone', src: "/assets/puzzles/find-key/0004-bone.png", correct: false, hoverAudio: "/assets/audio/items/p32/p-32-dinosaur-bone.mp3", style: { top: '42%', left: '29%', width: '22%', height: '15%' } }
        ],
        color: 'bg-indigo-900',
        audioSrc: "/assets/audio/narration/p-32-read.mp3",
        successText: "Super Star!! You found the Silver Key!",
        successAudio: "/assets/audio/items/p32/p-32-well-done.mp3",
        next: 'page-33'
    },

    {
        id: 'page-33',
        type: 'spread',
        pageNumber: 33,
        layout: 'image-right',
        media: "/assets/image/p33-new.webp",
        clickMedia: "/assets/image/p33b-new.webp",
        mediaType: 'image',
        text: `The key turned.
[[Click… clack!]]
The door opened.

Laura switched on her torch.

This wasn’t a cave.
It was a tunnel.`,
        color: 'bg-indigo-950',
        audioSrc: "/assets/audio/narration/p-33-read.mp3",
        next: 'page-34'
    },

    {
        id: 'page-34',
        type: 'spread',
        pageNumber: 34,
        layout: 'image-left',
        media: "/assets/image/p34-new.webp",
        mediaType: 'image',
        text: `Tiny bugs glowed
on the walls,
sparkling like rainbow glitter.

Laura passed through
one last door.`,
        color: 'bg-blue-900',
        audioSrc: "/assets/audio/narration/p-34-read.mp3",
        next: 'page-35'
    },

    {
        id: 'page-35',
        type: 'spread',
        pageNumber: 35,
        layout: 'image-right',
        media: "/assets/image/p35-new.webp",
        clickMedia: "/assets/video/p35-gift.mp4",
        mediaType: 'image',
        confettiOnClick: true,
        noLoop: true,
        text: `In the clearing
stood a big present box
with Laura’s name on it.

Barnaby, Hugo and Squeaky
jumped out of the box.`,
        color: 'bg-yellow-600',
        audioSrc: "/assets/audio/narration/p-35-read.mp3",
        audioSrc2: "/assets/audio/narration/p-35b-read.mp3",
        autoTriggerInteraction: true,
        next: 'page-36'
    },

    {
        id: 'page-36',
        type: 'spread',
        pageNumber: 36,
        layout: 'image-left',
        media: "/assets/image/p36-new.webp",
        mediaType: 'image',
        text: `“Surprise!”
they shouted in unison.

A birthday party!
For Laura!

There was berry cake.
There were glowing balloons.
Everyone was there.`,
        color: 'bg-pink-700',
        audioSrc: "/assets/audio/narration/p-36-read.mp3",
        next: 'page-37'
    },

    {
        id: 'page-37',
        type: 'spread',
        pageNumber: 37,
        layout: 'image-right',
        media: "/assets/video/p37-new.mp4",
        mediaType: 'video',
        text: `“This is our present for you,”
said Barnaby the beaver.

The Rainbow Crystal!

Fireflies wrote
Happy Birthday
in the air.`,
        color: 'bg-pink-700',
        audioSrc: "/assets/audio/narration/p-37-read.mp3",
        next: 'page-38'
    },

    {
        id: 'page-38',
        type: 'spread',
        pageNumber: 38,
        layout: 'image-left',
        media: "/assets/video/p38-new.mp4",
        mediaType: 'video',
        text: `Laura’s lantern,
with the Rainbow Crystal,
was glowing again.

Her heart felt warm and loved.
Brighter than ever.`,
        color: 'bg-pink-700',
        audioSrc: "/assets/audio/narration/p-38-read.mp3",
        next: 'end-page-b2'
    },

    // --- END PAGES ---
    {
        id: 'end-page-a',
        type: 'back-cover',
        pageNumber: 'The End',
        media: "/assets/video/p16-the-end.mp4",
        mediaType: 'video',
        text: "",
        audioSrc: "/assets/audio/narration/p-16-the-end.mp3",
        next: 'back-cover'
    },

    {
        id: 'end-page-b1',
        type: 'back-cover',
        pageNumber: 'The End',
        media: "/assets/video/p29-the-end.mp4",
        mediaType: 'video',
        text: "",
        audioSrc: "/assets/audio/narration/p-29-the-end.mp3",
        next: 'back-cover'
    },

    {
        id: 'end-page-b2',
        type: 'back-cover',
        pageNumber: 'The End',
        media: "/assets/video/p38-the-end.mp4",
        mediaType: 'video',
        text: "",
        audioSrc: "/assets/audio/narration/p-38-the-end.mp3",
        next: 'back-cover'
    },

    {
        id: 'back-cover',
        type: 'cover',
        title: null,
        author: 'flyboat.online',
        coverColor: 'bg-emerald-900',
        media: "/assets/video/back-cover.mp4",
        mediaType: 'video',
        next: 'cover'
    },

    // --- PATH A2: SECRET PATH ---
    {
        id: 'page-39',
        type: 'interaction',
        puzzleType: 'musical-garden',
        pageNumber: 39,
        layout: 'image-right',
        media: "/assets/image/p39-new.webp",
        mediaType: 'image',
        text: `Beyond the roots 
lay a Secret Garden. 

Flowers of every colour 
were waiting to sing. 


If you touch the flowers
You can hear them play!`,
        items: [
            { id: 'flower-4', src: "/assets/puzzles/secret-garden/flower004.png", note: 261.63, style: { top: '57%', left: '21%', width: '20%', height: '20%' } },
            { id: 'flower-3', src: "/assets/puzzles/secret-garden/flower003.png", note: 329.63, style: { top: '50%', left: '40%', width: '13%', height: '20%' } },
            { id: 'flower-2', src: "/assets/puzzles/secret-garden/flower002.png", note: 392.00, style: { top: '60%', left: '52%', width: '19%', height: '19%' } },
            { id: 'flower-1', src: "/assets/puzzles/secret-garden/flower001.png", note: 523.25, style: { top: '52%', left: '70%', width: '13%', height: '20%' } }
        ],
        color: 'bg-amber-900',
        audioSrc: "/assets/audio/narration/p-39-read.mp3",
        next: 'page-40'
    },

    {
        id: 'page-40',
        type: 'spread',
        pageNumber: 40,
        layout: 'image-left',
        media: "/assets/image/p40-new.webp",
        clickMedia: "/assets/video/p40-rainbow-cave.mp4",
        mediaType: 'image',
        text: `They passed through the garden.
Ahead of them stood
the Purple Waterfall again.

But this time,
there was an entrance
to the Rainbow Cave.`,
        color: 'bg-indigo-900',
        audioSrc: "/assets/audio/narration/p-40-read.mp3",
        next: 'page-41'
    },

    {
        id: 'page-41',
        type: 'spread',
        pageNumber: 41,
        layout: 'image-right',
        media: "/assets/image/p41-new.webp",
        mediaType: 'image',
        text: `The cave walls were covered in rainbow crystals.

At the end of the cave,
they found a slate wall 
with words engraved into the stone:

“4 Br1ght s4y 
m4g1c y0u
R41nb0w 4s w0rd 
D4y Cryst4l must”`,
        color: 'bg-violet-900',
        audioSrc: "/assets/audio/narration/p-41-read.mp3",
        next: 'page-42'
    },

    {
        id: 'page-42',
        type: 'spread',
        pageNumber: 42,
        layout: 'image-left',
        media: "/assets/image/p42-new.webp",
        mediaType: 'image',
        text: `The words seem to be a code.

“We need the Magic Book,” Lilo said.
Laura saw the book before, but where?

Laura and Lilo
at the same time said:
“The Orchard!”`,
        color: 'bg-slate-900',
        audioSrc: "/assets/audio/narration/p-42-read.mp3",
        next: 'page-43'
    },

    {
        id: 'page-43',
        type: 'puzzle',
        pageNumber: 43,
        layout: 'image-right',
        media: "/assets/puzzles/find-book/0005-map-start-book.png",
        mediaType: 'image',
        text: `The Orchard

Back to the Orchard.
They need the Magic Book to read the message.
Tap to dig the holes to find it.`,
        puzzleType: 'find-nut',
        items: [
            { id: 'Magic Book', src: "/assets/puzzles/find-book/0003-book.png", hoverAudio: "/assets/audio/items/p43/p-43-magic-book.mp3", correct: true, style: { top: '58%', left: '23%', width: '22%', height: '15%' } },
            { id: 'Nothing here', src: "/assets/puzzles/find-book/0001-nut-empty.png", hoverAudio: "/assets/audio/items/p43/p-43-nothing.mp3", correct: false, style: { top: '60%', left: '50%', width: '22%', height: '15%' } },
            { id: 'Nothing here 2', src: "/assets/puzzles/find-book/0002-key-empty.png", hoverAudio: "/assets/audio/items/p43/p-43-nothing.mp3", correct: false, style: { top: '45%', left: '53%', width: '22%', height: '17%' } },
            { id: 'Dinosaur Bone', src: "/assets/puzzles/find-book/0004-bone.png", hoverAudio: "/assets/audio/items/p43/p-43-dinosaur-bone.mp3", correct: false, style: { top: '42%', left: '29%', width: '22%', height: '15%' } }
        ],
        successText: `Brilliant! You found the Magic Book!`,
        successAudio: "/assets/audio/items/p43/p-43-well-done.mp3",
        color: 'bg-emerald-900',
        audioSrc: "/assets/audio/narration/p-43-read.mp3",
        next: 'page-44'
    },

    {
        id: 'page-44',
        type: 'spread',
        pageNumber: 44,
        layout: 'image-left',
        media: "/assets/image/p44-new.webp",
        mediaType: 'image',
        text: `Laura opened the Magic Book.
The words began to move.

“Rainbow Crystal,
bright as day,
A magic word
you must say.”`,
        color: 'bg-indigo-900',
        audioSrc: "/assets/audio/narration/p-44-read.mp3",
        next: 'page-45'
    },

    {
        id: 'page-45',
        type: 'puzzle',
        puzzleType: 'choice',
        pageNumber: 45,
        layout: 'image-right',
        media: "/assets/image/p45-new.webp",
        mediaType: 'image',
        text: `The Magic Word

To the Rainbow Crystal be bright again,
Tap the correct magic word.`,
        choices: [
            { label: 'Banana', targetId: 'page-45', audioSrc: "/assets/audio/items/p45/p-45-banana.mp3", color: 'bg-yellow-400 text-slate-800 hover:bg-yellow-500 shadow-yellow-200' },
            { label: 'Chicken', targetId: 'page-45', audioSrc: "/assets/audio/items/p45/p-45-chicken.mp3", color: 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200' },
            { label: 'Potato', targetId: 'page-45', audioSrc: "/assets/audio/items/p45/p-45-potato.mp3", color: 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-300' },
            { label: 'Please', targetId: 'page-46', audioSrc: "/assets/audio/items/p45/p-45-please.mp3", color: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200' }
        ],
        color: 'bg-indigo-950',
        audioSrc: "/assets/audio/narration/p-45-read.mp3",
        successText: "Splendid! The crystal are glowing!",
        successAudio: "/assets/audio/items/p45/p-45-welldone.mp3",
        next: 'page-46'
    },

    {
        id: 'page-46',
        type: 'spread',
        pageNumber: 46,
        layout: 'image-left',
        media: "/assets/video/p46-reveal.mp4",
        mediaType: 'video',
        text: `The cave walls shimmered.

A bigger, brighter crystal appeared.
The Rainbow Crystal! 

Its glow filled the magic forest.
It was her best birthday adventure ever.`,
        color: 'bg-cyan-900',
        audioSrc: "/assets/audio/narration/p-46-read.mp3",
        next: 'end-page-secret'
    },

    {
        id: 'end-page-secret',
        type: 'back-cover',
        pageNumber: 'The Secret Heart',
        media: "/assets/video/crystal-end.mp4",
        mediaType: 'video',
        text: `You discovered
the Secret Heart
of the Magic Forest!

The end`,
        audioSrc: "/assets/audio/narration/p-16-the-end.mp3",
        next: 'back-cover'
    }
];