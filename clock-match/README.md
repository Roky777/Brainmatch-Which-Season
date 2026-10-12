# Clock Match

Run `npm start`, then open `/clock-match/` or choose Clock Match in the shared library.

Uses the existing Shape Friends engine, three visual worlds, card preview, Practice, Beat Sparky, hints, pause/audio, and independent saved progress. Easy has 4 cards (2 pairs), Medium 6 cards (3 pairs), Hard 8 cards (4 pairs), following the latest shared-game sizing rather than the larger grids in the chapter brief.

Easy samples 6, 7, 8 and 9 o'clock. Medium samples 1, 2, 4 and 10 o'clock. Hard samples all eight times. Repeat plays shuffle the available pairs. Cards show only an analog clock or its numerical time; no routine/activity text appears on them.

The clock face, numeral positions and hands are deterministic SVG artwork. Every minute hand points to 12, and the shorter, warm-coloured hour hand is rotated exactly 30 degrees per hour. Generate the assets with `node clock-match/scripts/generate-card-art.mjs`.

The 200 XP journey awards 14 XP for a first Practice clear and 8 XP for a first Beat Sparky clear per world/board, with a final 2 XP completion bonus: 3 worlds × 3 boards × (14 + 8) + 2 = 200. Replays do not duplicate XP.
