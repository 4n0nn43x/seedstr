import type { CategoryTemplate } from './shared.js';

export const genericWebTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  sectionBlueprint: `
- **Navbar**: Fixed top, glass-morphism, logo + navigation links + primary CTA
- **Hero section**: Compelling headline, supporting text, CTA buttons, optional visual/illustration
- **Main content**: Organized sections relevant to the specific request — use grid/flex layouts
- **Interactive elements**: Forms, buttons, toggles, modals — all must be functional with Alpine.js
- **Footer**: Multi-column with links, social icons, copyright`,
  componentPatterns: `
- Section layout: \`<section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8"><div class="max-w-7xl mx-auto">...</div></section>\`
- Card: \`rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all\`
- Button: \`bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5\``,
  contentGuidance: `Analyze the specific request and build exactly what was asked for. Use real, contextual content — no placeholders. Every interactive element must work. Prioritize functionality and completeness over decoration.`,
};
