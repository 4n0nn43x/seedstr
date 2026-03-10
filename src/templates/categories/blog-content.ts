import type { CategoryTemplate } from './shared.js';

export const blogContentTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  cdnAdditions: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-javascript.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>`,
  sectionBlueprint: `
- **Navbar**: Simple, blog name/logo, nav links (Home, Categories, About), dark mode toggle
- **Article header**: Title (text-4xl font-bold), author card (avatar + name + date), reading time estimate, category tags
- **Table of Contents sidebar**: Fixed left or scrollspy, auto-generated from h2/h3 headings, highlight active section
- **Article body**: Max-w-3xl mx-auto, proper typography (prose-like), headings h2/h3, paragraphs, code blocks (Prism.js highlighted), blockquotes, lists, images with captions
- **Code blocks**: Syntax-highlighted with Prism.js, copy button on hover, language label
- **Share buttons**: Fixed sidebar or bottom — Twitter, LinkedIn, copy link, with share icons
- **Author bio**: Card at bottom with avatar, name, bio, social links
- **Related articles**: 3-card grid of suggested reads at bottom`,
  componentPatterns: `
- Reading time: Calculate from word count (\`Math.ceil(text.split(/\\s+/).length / 200)\` minutes)
- TOC scrollspy: IntersectionObserver on headings, highlight matching TOC link with \`text-primary-600 font-medium\`
- Code block: \`<pre><code class="language-javascript">\` with Prism.highlightAll() called on load`,
  contentGuidance: `Write a REAL, structured article with actual paragraphs of meaningful content — not placeholder text. Include proper headings hierarchy (h2 > h3), code examples if technical topic, blockquotes, and lists. Reading time should be calculated from actual word count. Prism.js must be initialized for code highlighting. TOC should be auto-generated from DOM headings.`,
};
