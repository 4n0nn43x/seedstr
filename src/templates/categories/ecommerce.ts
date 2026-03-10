import type { CategoryTemplate } from './shared.js';

export const ecommerceTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  sectionBlueprint: `
- **Navbar**: Fixed, logo left, search bar center, cart icon with item count badge (Alpine.js reactive), user icon
- **Hero banner**: Full-width promotional banner, headline + CTA, subtle gradient overlay on image bg
- **Category filters**: Horizontal pill/tag bar for filtering products (Alpine.js @click to filter), "All" selected by default
- **Product grid**: 3-4 column responsive grid, each card with image, product name, price, rating stars, "Add to Cart" button
- **Cart drawer/sidebar**: Slide-in from right (Alpine x-show + transition), list of items with quantity +/- controls, remove button, subtotal, "Checkout" button
- **Checkout summary**: Simple modal or section with order summary, item list, subtotal, shipping, tax, total
- **Footer**: 4-column (Shop, Support, About, Newsletter signup)`,
  componentPatterns: `
- Product card: \`rounded-xl overflow-hidden border border-gray-100 group\` with image \`group-hover:scale-105 transition-transform\` and quick-add button
- Cart badge: \`<span x-text="cart.length" x-show="cart.length > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">\`
- Price: \`<span class="text-lg font-bold text-gray-900">$49.99</span> <span class="text-sm text-gray-400 line-through">$69.99</span>\``,
  contentGuidance: `Use REALISTIC products with actual names, descriptions, prices, and categories. Include at least 8-12 products across 3-4 categories. Cart must work: add/remove items, update quantities, calculate totals correctly. Prices should be consistent (no $0 items). Include product ratings (4.2/5 stars pattern). Filter buttons must actually filter the product grid using Alpine.js.`,
};
