import type { CategoryTemplate } from './shared.js';

export const landingPageTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  sectionBlueprint: `
- **Navbar**: Fixed, glass-morphism, logo + nav links + CTA button
- **Hero**: Full-width gradient bg (from-primary-50 via-white to-accent-50), large heading with gradient text (bg-clip-text), subtitle, dual CTA buttons (primary + secondary/outline)
- **Social proof / Logos**: Trusted-by strip with 4-6 grey logos
- **Features**: 3-column grid, icon in colored rounded-xl box, title, description
- **How it works**: 3-step numbered process with connecting line/arrows
- **Testimonials**: 3 cards with avatar, quote, name, role/company, star rating
- **Pricing**: 3-tier cards (Basic/Pro/Enterprise), highlight popular with ring + badge, feature checkmarks, CTA per tier
- **FAQ**: Accordion with Alpine x-show toggle, chevron rotation, 5-6 real questions
- **CTA Section**: Gradient bg, compelling headline, email input + button
- **Footer**: 4-col grid (Product, Company, Resources, Legal), social icons, copyright`,
  componentPatterns: `
- Hero gradient text: \`bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent\`
- Feature card: \`rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all\`
- Pricing highlight: \`ring-2 ring-primary-600 relative\` with \`<span class="absolute -top-3 bg-primary-600 text-white text-xs px-3 py-1 rounded-full">Popular</span>\``,
  contentGuidance: `Write REAL startup copy. Concrete product name, specific value propositions, actual feature descriptions (not generic "Feature 1"). CTAs should be action-oriented ("Start Free Trial", "Get Started Now"). Testimonials with realistic names, companies, and specific praise. Pricing with realistic tiers and prices.`,
};
