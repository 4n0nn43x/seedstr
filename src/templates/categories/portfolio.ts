import type { CategoryTemplate } from './shared.js';

export const portfolioTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  cdnAdditions: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
    <script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>`,
  sectionBlueprint: `
- **Navbar**: Fixed, minimal, name/logo left, nav links right (About, Projects, Skills, Contact)
- **Hero**: Large name/title, professional tagline, subtle animated background or gradient, CTA to projects
- **About**: 2-column — photo/avatar left, bio text right, brief personal intro with personality
- **Projects grid**: 3-column card grid, each with thumbnail/screenshot, project title, description, tech tags (pills), links (live demo + GitHub icons)
- **Skills section**: Categorized skill groups (Frontend, Backend, Tools), progress bars or tag clouds
- **Experience timeline**: Vertical timeline with company, role, dates, brief description
- **Contact section**: Contact form (name, email, message) + social links (GitHub, LinkedIn, Twitter, Email)
- **Footer**: Minimal, copyright + "Built with" tech stack`,
  componentPatterns: `
- Project card: \`group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all\` with image \`group-hover:scale-105 transition-transform\`
- Skill tag: \`px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700\`
- Timeline item: \`relative pl-8 border-l-2 border-gray-200\` with dot \`absolute -left-2 w-4 h-4 rounded-full bg-primary-600\``,
  contentGuidance: `Professional tone with personality. Use realistic but fictional project examples with specific tech stacks and outcomes. Skills should be specific technologies (React, Node.js, PostgreSQL) not generic ("programming"). Contact form should have validation and a success toast. Social links should use Lucide icons. Initialize GLightbox for project image galleries.`,
};
