/**
 * Shared web enhancements - compact descriptions for LLM to expand.
 * Only injected for web project types.
 */

export const WEB_ENHANCEMENTS = `
## Polish & Enhancements (apply where appropriate):
- **Dark/Light toggle**: Button with sun/moon icon, toggle \`dark\` class on <html>, persist in localStorage. Use Tailwind \`dark:\` prefix.
- **Scroll animations**: IntersectionObserver on \`[data-animate]\` elements — add \`opacity-100 translate-y-0\` when visible, start hidden with \`opacity-0 translate-y-4\`.
- **Toast notifications**: Small fixed bottom-right div, auto-dismiss after 3s, use Alpine.js x-show with transition.
- **Responsive hamburger**: Hidden md:flex nav links, burger icon toggles mobile menu with Alpine x-show + slide transition.
- **Modal/Dialog**: Alpine x-show overlay + centered card, close on backdrop click or Escape key, trap focus inside.
- **Number counters**: Animate numbers from 0 to target on scroll into view using requestAnimationFrame.
`;

export interface CategoryTemplate {
  type: 'web' | 'script' | 'text';
  fileStructure: string;
  cdnAdditions?: string;
  sectionBlueprint: string;
  componentPatterns: string;
  contentGuidance: string;
}
