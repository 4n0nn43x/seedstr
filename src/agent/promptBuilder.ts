/**
 * Prompt builder: composes 3-layer system prompts based on project classification.
 * Layer 1: Base rules (universal) — compact
 * Layer 2: Category-specific template
 * Layer 3: Web design system (web only) — compressed
 *
 * Token budget target: <3K for web, <1.5K for script, <1K for text
 */

import { classifyProject, TEMPLATE_INSTRUCTIONS } from '../templates/index.js';
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
  'api-backend': pythonScriptTemplate,
  'text-response': {
    type: 'text',
    fileStructure: 'response.md, README.md',
    sectionBlueprint: `
- **response.md**: Main content in clean Markdown (headings, lists, code blocks)
- **README.md**: Brief context about the request`,
    componentPatterns: '',
    contentGuidance: 'Thorough, well-structured Markdown. Directly address the request with comprehensive content.',
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

  const parts: string[] = [];

  // Layer 1: Base rules (compact, type-aware)
  parts.push(buildBasePrompt(type));

  // Layer 2: Category-specific
  parts.push(buildCategoryPrompt(category, template));

  // Layer 3: Web design system (web only, compressed)
  if (type === 'web') {
    parts.push(buildWebLayer(template));
  }

  // Quality + budget
  parts.push(getQualityGuidance(effectiveBudget));
  parts.push(`Budget: $${effectiveBudget.toFixed(2)}${job.jobType === 'SWARM' ? ` (share of $${job.budget.toFixed(2)} across ${job.maxAgents} agents)` : ''}`);

  return parts.join('\n');
}

function buildBasePrompt(type: string): string {
  // Core rules — same for all types, compact
  let prompt = `You are an elite AI developer. An AI judge scores your work on: Functionality (threshold 5/10 or disqualified), Design (differentiator), Speed (tiebreaker).

## RULES:
- NEVER placeholder text, TODO/FIXME, or broken code — everything production-ready
- NEVER mention the AI model, hackathon, competition, or agent in generated content — no "Built by [model]", no "for [hackathon]", no self-references
- ALL deliverables packaged as zip via create_file + finalize_project
- Write REAL, contextual, meaningful content throughout`;

  // Type-specific delivery instructions
  if (type === 'web') {
    prompt += `
- Create HTML/CSS/JS files with CDN deps in <head>, call lucide.createIcons() after </body>
- Semantic HTML5, accessible (ARIA, alt, focus states), responsive, cross-browser`;
  } else if (type === 'script') {
    prompt += `
- Create source files + dependency file (requirements.txt / package.json) + README.md
- Proper error handling, logging, CLI arguments, type hints/docs`;
  } else {
    prompt += `
- Create response.md (content) + README.md (context), then zip`;
  }

  return prompt;
}

function buildCategoryPrompt(category: ProjectCategory, template: CategoryTemplate): string {
  let prompt = `\n## Category: ${category}\nFiles: ${template.fileStructure}`;
  prompt += `\n### Sections:\n${template.sectionBlueprint}`;

  if (template.componentPatterns) {
    prompt += `\n### Patterns:\n${template.componentPatterns}`;
  }

  prompt += `\n### Guidance:\n${template.contentGuidance}`;
  return prompt;
}

function buildWebLayer(template: CategoryTemplate): string {
  let prompt = `\n${TEMPLATE_INSTRUCTIONS}`;

  if (template.cdnAdditions) {
    prompt += `\n### Extra CDN (add to <head>):\n\`\`\`html\n${template.cdnAdditions}\n\`\`\``;
  }

  prompt += WEB_ENHANCEMENTS;
  return prompt;
}

function getQualityGuidance(budget: number): string {
  if (budget < 2) {
    return `\nQuality: Working > complex. Core functionality, clean code, keep scope tight.`;
  } else if (budget <= 10) {
    return `\nQuality: Balance functionality with polish. Good design, animations, attention to detail.`;
  } else {
    return `\nQuality: Premium. Rich interactions, exceptional design, comprehensive features.`;
  }
}
