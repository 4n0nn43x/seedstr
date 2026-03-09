/**
 * Pre-built UI templates and design system for high-quality project generation.
 * Inspired by v0/Vercel's approach: Tailwind CSS + modern component patterns.
 */

export interface Template {
  name: string;
  description: string;
  files: { path: string; content: string }[];
}

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

### File Structure (ALWAYS create ALL of these):
1. **index.html** — Complete page with all sections, navbar, hero, features, footer
2. **styles.css** — Custom animations, keyframes, any styles beyond Tailwind utilities
3. **app.js** — All JavaScript: Alpine.js components, event handlers, interactive features, data management. Initialize lucide icons at the end.
4. **README.md** — Project name, description, features list, tech stack, how to open/run
`;

/**
 * Get the full system prompt enhancement for project building
 */
export function getProjectBuildingPrompt(): string {
  return TEMPLATE_INSTRUCTIONS;
}

/**
 * Detect if a prompt is asking for a project that should be built as files
 * Uses broad matching to avoid missing valid project requests
 */
export function isWebProjectRequest(prompt: string): boolean {
  const lower = prompt.toLowerCase();

  // Strong indicators — any one of these means it's a project
  const strongKeywords = [
    'website', 'web app', 'webapp', 'landing page', 'portfolio',
    'dashboard', 'frontend', 'front-end', 'html', 'webpage',
    'react', 'next.js', 'nextjs', 'vue', 'angular', 'svelte',
    'homepage', 'blog', 'e-commerce', 'ecommerce', 'shop', 'store',
    'gallery', 'todo app', 'calculator app', 'game', 'quiz',
    'single page', 'spa', 'responsive', 'mobile app', 'pwa',
    'chrome extension', 'browser extension', 'widget',
    'saas', 'platform', 'tool', 'application', 'prototype',
    'mockup', 'wireframe', 'clone', 'replica',
  ];
  if (strongKeywords.some(kw => lower.includes(kw))) return true;

  // Combination indicators — "build/create/make" + noun
  const actionWords = ['build', 'create', 'make', 'design', 'develop', 'code', 'implement', 'construct'];
  const targetWords = ['page', 'site', 'app', 'ui', 'interface', 'form', 'layout', 'component', 'screen', 'view', 'panel', 'project'];
  const hasAction = actionWords.some(a => lower.includes(a));
  const hasTarget = targetWords.some(t => lower.includes(t));
  if (hasAction && hasTarget) return true;

  return false;
}

export default {
  getProjectBuildingPrompt,
  isWebProjectRequest,
  TEMPLATE_INSTRUCTIONS,
};
