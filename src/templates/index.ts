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

**Components (use these exact patterns):**

Navbar (fixed, glass-morphism):
\`\`\`html
<nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <a href="#" class="text-xl font-bold text-gray-900">Brand</a>
    <div class="hidden md:flex items-center space-x-8">
      <a href="#features" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Features</a>
    </div>
    <button class="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg">Get Started</button>
  </div>
</nav>
\`\`\`

Hero Section (gradient background):
\`\`\`html
<section class="pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 mb-6">New Release</span>
    <h1 class="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">Build Something<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Amazing</span></h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Description text here with real, contextual content.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">Primary CTA</button>
      <button class="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium px-8 py-3.5 rounded-xl transition-all duration-200">Secondary CTA</button>
    </div>
  </div>
</section>
\`\`\`

Feature Cards (grid layout):
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div class="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
    <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary-200 transition-colors">
      <i data-lucide="zap" class="w-6 h-6 text-primary-600"></i>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">Feature Title</h3>
    <p class="text-gray-600 leading-relaxed">Real description of what this feature does.</p>
  </div>
</div>
\`\`\`

Buttons:
\`\`\`html
<!-- Primary -->
<button class="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">Button</button>
<!-- With icon -->
<button class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200">
  <span>Get Started</span>
  <i data-lucide="arrow-right" class="w-4 h-4"></i>
</button>
\`\`\`

Form Inputs:
\`\`\`html
<input type="text" placeholder="Enter your email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 text-gray-900 placeholder-gray-400">
\`\`\`

Footer:
\`\`\`html
<footer class="bg-gray-900 text-gray-400 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div>
        <h4 class="text-white font-semibold mb-4">Product</h4>
        <ul class="space-y-2 text-sm"><li><a href="#" class="hover:text-white transition-colors">Features</a></li></ul>
      </div>
    </div>
    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p class="text-sm">&copy; 2026 Brand. All rights reserved.</p>
    </div>
  </div>
</footer>
\`\`\`

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
