/**
 * Prompt builder: composes 3-layer system prompts based on project classification.
 * Layer 1: Base rules (universal)
 * Layer 2: Category-specific template
 * Layer 3: Web enhancements (web only)
 */

import { classifyProject, getProjectBuildingPrompt } from '../templates/index.js';
import { WEB_ENHANCEMENTS } from '../templates/categories/shared.js';
import { landingPageTemplate } from '../templates/categories/landing-page.js';
import { dashboardTemplate } from '../templates/categories/dashboard.js';
import { gameTemplate } from '../templates/categories/game.js';
import { portfolioTemplate } from '../templates/categories/portfolio.js';
import { ecommerceTemplate } from '../templates/categories/ecommerce.js';
import { calculatorToolTemplate } from '../templates/categories/calculator-tool.js';
import { blogContentTemplate } from '../templates/categories/blog-content.js';
import { reactAppTemplate } from '../templates/categories/react-app.js';
import { genericWebTemplate } from '../templates/categories/generic-web.js';
import { pythonScriptTemplate } from '../templates/categories/python-script.js';
import { nodeScriptTemplate } from '../templates/categories/node-script.js';
import { automationTemplate } from '../templates/categories/automation.js';
import { dataAnalysisTemplate } from '../templates/categories/data-analysis.js';
import type { CategoryTemplate } from '../templates/categories/shared.js';
import type { ProjectCategory } from '../templates/index.js';
import type { Job } from '../types/index.js';

const CATEGORY_TEMPLATES: Record<ProjectCategory, CategoryTemplate> = {
  'landing-page': landingPageTemplate,
  'dashboard': dashboardTemplate,
  'game': gameTemplate,
  'portfolio': portfolioTemplate,
  'ecommerce': ecommerceTemplate,
  'calculator-tool': calculatorToolTemplate,
  'blog-content': blogContentTemplate,
  'react-app': reactAppTemplate,
  'generic-web': genericWebTemplate,
  'python-script': pythonScriptTemplate,
  'node-script': nodeScriptTemplate,
  'automation': automationTemplate,
  'data-analysis': dataAnalysisTemplate,
  'api-backend': pythonScriptTemplate, // Reuse python-script with different guidance
  'text-response': {
    type: 'text',
    fileStructure: 'response.md, README.md',
    sectionBlueprint: `
- **response.md**: The main content, formatted in clean Markdown with proper headings, lists, code blocks as needed
- **README.md**: Brief context about what was requested and how to read the response`,
    componentPatterns: '',
    contentGuidance: 'Write thorough, well-structured Markdown content. Use proper headings, lists, code blocks, and formatting. Content should be comprehensive and directly address the request.',
  },
};

/**
 * Build the complete system prompt for a job based on classification.
 */
export function buildSystemPrompt(job: Job): string {
  const effectiveBudget = job.jobType === 'SWARM' && job.budgetPerAgent
    ? job.budgetPerAgent
    : job.budget;

  const { type, category } = classifyProject(job.prompt);
  const template = CATEGORY_TEMPLATES[category];

  // Layer 1: Base rules (universal)
  const basePrompt = buildBasePrompt(type);

  // Layer 2: Category-specific instructions
  const categoryPrompt = buildCategoryPrompt(type, category, template);

  // Layer 3: Web enhancements (web only) + design system
  const enhancementsPrompt = type === 'web' ? buildWebLayer(template) : '';

  // Budget-aware quality guidance
  const qualityGuidance = getQualityGuidance(effectiveBudget);

  // Compose final prompt
  const budgetLine = `Job Budget: $${effectiveBudget.toFixed(2)} USD${job.jobType === 'SWARM' ? ` (your share of $${job.budget.toFixed(2)} total across ${job.maxAgents} agents)` : ''}`;

  return `${basePrompt}\n${categoryPrompt}\n${enhancementsPrompt}\n${qualityGuidance}\n${budgetLine}`;
}

function buildBasePrompt(type: string): string {
  return `You are an elite AI developer agent competing in the Seedstr Blind Hackathon ($10K prize pool). You MUST produce the HIGHEST QUALITY output possible. An independent AI judge evaluates your work on three criteria:

1. **Functionality** (CRITICAL — threshold 5/10, below = disqualified): Code must actually WORK. Every button, link, form, and interactive element must be functional. No broken features.
2. **Design** (differentiator): Visual quality, modern aesthetics, responsive layout, consistent color palette, typography, spacing, animations.
3. **Speed** (tiebreaker): How fast you respond. Be thorough but efficient.

## ABSOLUTE RULES:
- NEVER use placeholder text ("Lorem ipsum", "placeholder", "sample text") — write REAL, contextual, meaningful content
- NEVER leave TODO, FIXME, or incomplete sections — every line of code must be production-ready
- NEVER generate broken code — mentally verify all logic, matching tags, event handlers before creating files
- ALWAYS create a COMPLETE, WORKING deliverable — the AI judge will try to open and use it
- Package ALL files with create_file + finalize_project. Every submission MUST be a zip.

## How to Respond:
- **ALL deliverables = zip**: Whether it's a website, script, or text response — ALWAYS use create_file for each file, then finalize_project to package as .zip
- **Web projects**: Create HTML/CSS/JS files with all CDN dependencies in <head>
- **Script projects**: Create source files + requirements/package.json + README
- **Text requests**: Create response.md (content) + README.md (context), then zip them
- **When unsure**: BUILD IT as files and zip. The hackathon values deliverables.

## Code Quality:
- Semantic HTML5: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
- Proper error handling (try/catch, null checks, fallback values)
- Accessible: proper alt texts, ARIA labels, keyboard navigation, focus states
- Cross-browser: avoid bleeding-edge CSS, use standard approaches
- Performance: lazy loading images, efficient event delegation, no memory leaks`;
}

function buildCategoryPrompt(type: string, category: ProjectCategory, template: CategoryTemplate): string {
  let prompt = `\n## Project Classification: ${type.toUpperCase()} → ${category}\n`;
  prompt += `\n### Required Files:\n${template.fileStructure}\n`;
  prompt += `\n### Structure & Sections:\n${template.sectionBlueprint}\n`;

  if (template.componentPatterns) {
    prompt += `\n### Component Patterns:\n${template.componentPatterns}\n`;
  }

  prompt += `\n### Content Guidance:\n${template.contentGuidance}\n`;

  return prompt;
}

function buildWebLayer(template: CategoryTemplate): string {
  let prompt = '';

  // CDN dependencies (design system from templates/index.ts)
  const designSystem = getProjectBuildingPrompt();
  prompt += `\n${designSystem}\n`;

  // Extra CDN additions for specific categories
  if (template.cdnAdditions) {
    prompt += `\n### Additional CDN Dependencies (add to <head> alongside the standard ones):\n\`\`\`html\n${template.cdnAdditions}\n\`\`\`\n`;
  }

  // Web enhancements
  prompt += WEB_ENHANCEMENTS;

  return prompt;
}

function getQualityGuidance(budget: number): string {
  if (budget < 2) {
    return `\n## Quality Level (Budget: $${budget.toFixed(2)}): Working and correct > complex and broken. Focus on core functionality, clean code, and a polished result. Keep scope manageable.`;
  } else if (budget <= 10) {
    return `\n## Quality Level (Budget: $${budget.toFixed(2)}): Balance functionality with polish. Implement all requested features with good design, animations, and attention to detail.`;
  } else {
    return `\n## Quality Level (Budget: $${budget.toFixed(2)}): Premium delivery. Rich interactions, thorough content, exceptional design, comprehensive features. Go above and beyond.`;
  }
}
