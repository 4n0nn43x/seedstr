import type { CategoryTemplate } from './shared.js';

export const dashboardTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  cdnAdditions: `<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>`,
  sectionBlueprint: `
- **Sidebar**: Fixed left w-64, dark bg (bg-gray-900), logo at top, nav links with icons (Lucide), active state highlight, user profile at bottom
- **Top bar**: Sticky, search input, notification bell with badge, user avatar dropdown
- **Stat cards**: 4-column grid, each with icon, label, large number, trend indicator (up/down arrow + percentage in green/red)
- **Charts row**: 2-column grid — Bar chart (monthly data) + Line chart (trend over time), use Chart.js
- **Secondary charts**: Doughnut/pie chart (category breakdown) + recent activity feed
- **Data table**: Full-width with search input, column headers with sort arrows, alternating row colors, pagination, status badges (colored pills)
- **Activity feed**: Timeline-style list, avatar + action text + timestamp`,
  componentPatterns: `
- Stat card: \`bg-white rounded-xl p-6 shadow-sm border border-gray-100\` with \`<span class="text-green-600 text-sm font-medium">+12.5%</span>\`
- Chart container: \`<canvas id="barChart" class="w-full h-64"></canvas>\` initialized with \`new Chart(ctx, { type: 'bar', data: {...} })\`
- Table row: \`hover:bg-gray-50 transition-colors\` with status \`<span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>\``,
  contentGuidance: `Use REALISTIC sample data — named metrics (Revenue, Users, Orders, Conversion Rate), actual numbers that make sense together. Chart data should tell a coherent story (e.g., growing revenue trend). Table entries should have realistic names, dates, amounts. Sidebar nav should have 6-8 relevant sections. All charts must render with Chart.js using \`new Chart()\`.`,
};
