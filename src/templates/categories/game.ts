import type { CategoryTemplate } from './shared.js';

export const gameTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  sectionBlueprint: `
- **Game container**: Centered on page, fixed aspect ratio, border/shadow
- **Canvas or DOM game area**: \`<canvas id="gameCanvas">\` with appropriate size (e.g., 600x400) OR DOM-based grid for puzzle/board games
- **HUD/Scoreboard**: Score display, high score (from localStorage), level/lives if applicable
- **Controls overlay**: Semi-transparent overlay showing keyboard controls (arrows/WASD/space)
- **Game state screens**: Start screen (title + "Press Space to Start"), Pause overlay, Game Over screen with final score + "Play Again" button
- **Instructions panel**: Below or beside game, brief rules explanation`,
  componentPatterns: `
- Game loop: \`requestAnimationFrame\`-based loop with delta time, separate update() and draw() functions
- Input handling: \`addEventListener('keydown'/'keyup')\` with key state object for smooth movement
- Collision detection: AABB or distance-based depending on game type
- State machine: gameState variable ('menu' | 'playing' | 'paused' | 'gameover') controlling update/render flow`,
  contentGuidance: `The game MUST be fully playable. Implement a working game loop with keyboard controls, collision detection, scoring, and progressive difficulty. Include at least 3 difficulty increases (speed/frequency/complexity). High score must persist in localStorage. Game Over must show final score and allow restart. The game should be fun and responsive — test edge cases like boundary wrapping, rapid input, etc.`,
};
