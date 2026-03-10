/**
 * Pre-built UI templates and design system for high-quality project generation.
 * Inspired by v0/Vercel's approach: Tailwind CSS + modern component patterns.
 */

export interface Template {
  name: string;
  description: string;
  files: { path: string; content: string }[];
}

// ─────────────────────────────────────────
// Project Classification Types
// ─────────────────────────────────────────

export type ProjectType = 'web' | 'script' | 'text';

export type WebCategory =
  | 'landing-page' | 'dashboard' | 'game' | 'portfolio' | 'ecommerce'
  | 'calculator-tool' | 'blog-content' | 'react-app' | 'generic-web';

export type ScriptCategory =
  | 'python-script' | 'node-script' | 'automation' | 'data-analysis' | 'api-backend';

export type TextCategory = 'text-response';

export type ProjectCategory = WebCategory | ScriptCategory | TextCategory;

export interface ProjectClassification {
  type: ProjectType;
  category: ProjectCategory;
}

// ─────────────────────────────────────────
// Classifier
// ─────────────────────────────────────────

/**
 * Classify a prompt into project type and category using weighted keyword scoring.
 */
export function classifyProject(prompt: string): ProjectClassification {
  const lower = prompt.toLowerCase();

  // ── Script detection ──
  const scriptKeywords: [string, ScriptCategory, number][] = [
    ['python', 'python-script', 3],
    ['flask', 'api-backend', 4],
    ['fastapi', 'api-backend', 4],
    ['django', 'api-backend', 4],
    ['express', 'api-backend', 4],
    ['rest api', 'api-backend', 5],
    ['api server', 'api-backend', 5],
    ['api endpoint', 'api-backend', 5],
    ['backend', 'api-backend', 3],
    ['server', 'api-backend', 2],
    ['scraper', 'python-script', 5],
    ['scraping', 'python-script', 5],
    ['crawler', 'python-script', 5],
    ['bot', 'python-script', 3],
    ['cli', 'node-script', 3],
    ['command line', 'node-script', 3],
    ['script', 'python-script', 2],
    ['automate', 'automation', 4],
    ['automation', 'automation', 5],
    ['cron', 'automation', 4],
    ['scheduled', 'automation', 3],
    ['data analysis', 'data-analysis', 5],
    ['pandas', 'data-analysis', 5],
    ['numpy', 'data-analysis', 4],
    ['matplotlib', 'data-analysis', 4],
    ['csv', 'data-analysis', 3],
    ['dataset', 'data-analysis', 4],
    ['analyze data', 'data-analysis', 5],
    ['node', 'node-script', 2],
    ['npm', 'node-script', 3],
    ['package.json', 'node-script', 4],
  ];

  // Score script categories
  const scriptScores = new Map<ScriptCategory, number>();
  let totalScriptScore = 0;
  for (const [keyword, category, weight] of scriptKeywords) {
    if (lower.includes(keyword)) {
      scriptScores.set(category, (scriptScores.get(category) || 0) + weight);
      totalScriptScore += weight;
    }
  }

  // ── Web detection ──
  const webKeywords: [string, WebCategory, number][] = [
    // React
    ['react', 'react-app', 5],
    ['jsx', 'react-app', 5],
    ['hooks', 'react-app', 3],
    ['usestate', 'react-app', 5],
    ['useeffect', 'react-app', 5],
    ['component', 'react-app', 2],
    // Dashboard
    ['dashboard', 'dashboard', 5],
    ['admin panel', 'dashboard', 5],
    ['analytics', 'dashboard', 4],
    ['chart', 'dashboard', 3],
    ['metrics', 'dashboard', 3],
    // Game
    ['game', 'game', 5],
    ['snake', 'game', 5],
    ['tetris', 'game', 5],
    ['pong', 'game', 5],
    ['puzzle', 'game', 4],
    ['arcade', 'game', 5],
    ['platformer', 'game', 5],
    // Portfolio
    ['portfolio', 'portfolio', 5],
    ['personal website', 'portfolio', 5],
    ['resume', 'portfolio', 4],
    ['cv website', 'portfolio', 5],
    // E-commerce
    ['ecommerce', 'ecommerce', 5],
    ['e-commerce', 'ecommerce', 5],
    ['shop', 'ecommerce', 4],
    ['store', 'ecommerce', 3],
    ['cart', 'ecommerce', 4],
    ['product', 'ecommerce', 2],
    // Calculator / tool
    ['calculator', 'calculator-tool', 5],
    ['converter', 'calculator-tool', 5],
    ['generator', 'calculator-tool', 3],
    ['tool', 'calculator-tool', 2],
    // Blog
    ['blog', 'blog-content', 5],
    ['article', 'blog-content', 3],
    ['post', 'blog-content', 2],
    // Landing page
    ['landing page', 'landing-page', 5],
    ['homepage', 'landing-page', 4],
    ['saas', 'landing-page', 4],
    ['startup', 'landing-page', 3],
    // Generic web strong indicators
    ['website', 'generic-web', 3],
    ['web app', 'generic-web', 3],
    ['webapp', 'generic-web', 3],
    ['frontend', 'generic-web', 3],
    ['front-end', 'generic-web', 3],
    ['html', 'generic-web', 2],
    ['webpage', 'generic-web', 3],
    ['spa', 'generic-web', 3],
    ['responsive', 'generic-web', 2],
    ['pwa', 'generic-web', 3],
    ['chrome extension', 'generic-web', 3],
    ['browser extension', 'generic-web', 3],
    ['widget', 'generic-web', 2],
    ['clone', 'generic-web', 3],
    ['replica', 'generic-web', 3],
    ['prototype', 'generic-web', 2],
    ['mockup', 'generic-web', 2],
    ['wireframe', 'generic-web', 2],
    ['quiz', 'generic-web', 3],
    ['todo app', 'generic-web', 3],
    ['gallery', 'generic-web', 3],
    ['mobile app', 'generic-web', 3],
    ['single page', 'generic-web', 3],
  ];

  // Score web categories
  const webScores = new Map<WebCategory, number>();
  let totalWebScore = 0;
  for (const [keyword, category, weight] of webKeywords) {
    if (lower.includes(keyword)) {
      webScores.set(category, (webScores.get(category) || 0) + weight);
      totalWebScore += weight;
    }
  }

  // Also check action + target combos for generic web
  const actionWords = ['build', 'create', 'make', 'design', 'develop', 'code', 'implement', 'construct'];
  const targetWords = ['page', 'site', 'app', 'ui', 'interface', 'form', 'layout', 'screen', 'view', 'panel'];
  const hasAction = actionWords.some(a => lower.includes(a));
  const hasTarget = targetWords.some(t => lower.includes(t));
  if (hasAction && hasTarget) {
    webScores.set('generic-web', (webScores.get('generic-web') || 0) + 2);
    totalWebScore += 2;
  }

  // ── Determine winner ──

  // If script scores dominate, it's a script
  if (totalScriptScore > totalWebScore && totalScriptScore >= 3) {
    const bestScript = [...scriptScores.entries()].sort((a, b) => b[1] - a[1])[0];
    return { type: 'script', category: bestScript[0] };
  }

  // If web scores are present, it's web
  if (totalWebScore >= 2) {
    let bestWeb = [...webScores.entries()].sort((a, b) => b[1] - a[1])[0];

    // If "react" + another web category, check if react should win
    if (bestWeb[0] === 'generic-web' && webScores.has('react-app') && (webScores.get('react-app') || 0) >= 3) {
      bestWeb = ['react-app', webScores.get('react-app')!];
    }

    // Promote generic-web to landing-page if no specific category matched strongly
    if (bestWeb[0] === 'generic-web' && bestWeb[1] <= 5) {
      // Check if any specific category has a reasonable score
      const specificCategories = [...webScores.entries()].filter(([cat]) => cat !== 'generic-web');
      if (specificCategories.length > 0) {
        const topSpecific = specificCategories.sort((a, b) => b[1] - a[1])[0];
        if (topSpecific[1] >= 3) {
          return { type: 'web', category: topSpecific[0] };
        }
      }
    }

    return { type: 'web', category: bestWeb[0] };
  }

  // If some script score exists but not dominant
  if (totalScriptScore > 0) {
    const bestScript = [...scriptScores.entries()].sort((a, b) => b[1] - a[1])[0];
    return { type: 'script', category: bestScript[0] };
  }

  // Default: text response
  return { type: 'text', category: 'text-response' };
}

// ─────────────────────────────────────────
// Design System (used by web projects)
// ─────────────────────────────────────────

// The canonical HTML head that MUST be in every generated HTML file
const HTML_HEAD_BLOCK = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Alpine.js for reactivity -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
    <!-- Inter Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <!-- Tailwind Config -->
    <script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
            colors: {
              primary: { 50:'#eff6ff',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#3b82f6',600:'#2563eb',700:'#1d4ed8',800:'#1e40af',900:'#1e3a8a',950:'#172554' },
              accent:  { 50:'#faf5ff',100:'#f3e8ff',200:'#e9d5ff',300:'#d8b4fe',400:'#c084fc',500:'#a855f7',600:'#9333ea',700:'#7e22ce',800:'#6b21a8',900:'#581c87',950:'#3b0764' },
            },
            animation: {
              'fade-in': 'fadeIn 0.5s ease-out',
              'slide-up': 'slideUp 0.5s ease-out',
              'slide-down': 'slideDown 0.3s ease-out',
              'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
              fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
              slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
              slideDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
              scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
            },
          },
        },
      }
    </script>
    <style>
      * { font-family: 'Inter', system-ui, sans-serif; }
      html { scroll-behavior: smooth; }
      body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      /* Custom scrollbar */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    </style>`;

export const TEMPLATE_INSTRUCTIONS = `
## UI/Design Standards (MANDATORY for ALL frontend/web projects)

### CRITICAL: Required CDN Dependencies (include in EVERY HTML file <head>)
\`\`\`html
<head>
    ${HTML_HEAD_BLOCK}
</head>
\`\`\`

After the closing </body> tag, initialize Lucide icons:
\`\`\`html
<script>lucide.createIcons();</script>
\`\`\`

### Using Lucide Icons
Use Lucide icons throughout the UI for a polished look:
\`\`\`html
<i data-lucide="home" class="w-5 h-5"></i>
<i data-lucide="search" class="w-5 h-5"></i>
<i data-lucide="settings" class="w-5 h-5"></i>
<i data-lucide="arrow-right" class="w-4 h-4"></i>
<i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>
<i data-lucide="x-circle" class="w-5 h-5 text-red-500"></i>
\`\`\`
Common icons: home, search, menu, x, plus, minus, edit, trash-2, settings, user, mail, phone, map-pin, calendar, clock, star, heart, share-2, download, upload, external-link, check, check-circle, alert-circle, info, arrow-right, arrow-left, chevron-down, chevron-right, sun, moon, github, twitter, linkedin

### Design System Rules (follow strictly):

**Layout & Spacing:**
- Max content width: max-w-7xl mx-auto
- Section padding: py-16 md:py-24 px-4 sm:px-6 lg:px-8
- Card padding: p-6 md:p-8
- Gap between elements: space-y-4 or gap-6

**Color Usage:**
- Primary actions: bg-primary-600 hover:bg-primary-700 text-white
- Secondary actions: bg-white border border-gray-200 hover:bg-gray-50 text-gray-700
- Accent highlights: text-accent-600, bg-accent-50
- Text hierarchy: text-gray-900 (headings), text-gray-600 (body), text-gray-400 (muted)
- Backgrounds: bg-white (cards), bg-gray-50 (sections), bg-gray-900 (dark sections/footer)

**Typography:**
- Page title: text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight
- Section titles: text-3xl md:text-4xl font-bold
- Card titles: text-xl font-semibold
- Body text: text-base text-gray-600 leading-relaxed
- Small/caption: text-sm text-gray-500

**Components (use these patterns):**
- Navbar: fixed top-0, glass-morphism (bg-white/80 backdrop-blur-lg), h-16, border-b border-gray-100
- Hero: pt-32 pb-20, gradient bg (from-primary-50 via-white to-accent-50), centered text, gradient text with bg-clip-text, dual CTA buttons
- Feature Cards: grid 1/2/3 cols, rounded-2xl, border border-gray-100, shadow-sm, icon in colored rounded-xl container, hover:shadow-xl hover:-translate-y-1
- Buttons: primary (bg-primary-600 hover:bg-primary-700 text-white rounded-lg), secondary (bg-white border border-gray-200), with-icon (inline-flex items-center gap-2), focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
- Form Inputs: rounded-xl border border-gray-200, focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
- Footer: bg-gray-900 text-gray-400 py-16, grid cols-2 md:cols-4, border-t border-gray-800

**Animations & Micro-interactions:**
- All interactive elements: transition-all duration-200 or duration-300
- Cards on hover: hover:shadow-xl hover:-translate-y-1
- Buttons on hover: hover:shadow-lg hover:-translate-y-0.5
- Links: hover:text-primary-600 transition-colors
- Use animate-fade-in, animate-slide-up for entrance animations
- Focus states: focus:ring-2 focus:ring-primary-500 focus:ring-offset-2

**Responsive Breakpoints:**
- Mobile first: default styles for mobile
- sm: (640px) - small adjustments
- md: (768px) - tablet layout changes
- lg: (1024px) - desktop layout
- xl: (1280px) - wide desktop

**Dark Mode (when appropriate):**
- Add class="dark" to <html> element
- Use dark: prefix: dark:bg-gray-900 dark:text-white dark:border-gray-800
`;

/**
 * Get the full system prompt enhancement for project building (web design system)
 */
export function getProjectBuildingPrompt(): string {
  return TEMPLATE_INSTRUCTIONS;
}

/**
 * Detect if a prompt is asking for a web project.
 * Now delegates to classifyProject internally.
 */
export function isWebProjectRequest(prompt: string): boolean {
  return classifyProject(prompt).type === 'web';
}

export default {
  getProjectBuildingPrompt,
  isWebProjectRequest,
  classifyProject,
  TEMPLATE_INSTRUCTIONS,
};
