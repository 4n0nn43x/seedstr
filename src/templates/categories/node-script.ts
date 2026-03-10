import type { CategoryTemplate } from './shared.js';

export const nodeScriptTemplate: CategoryTemplate = {
  type: 'script',
  fileStructure: `index.js, package.json, README.md`,
  sectionBlueprint: `
- **index.js**: Entry point, ESM imports, main logic, process.exit codes for success/failure
- **package.json**: name, version, description, "type": "module", scripts (start, dev), dependencies with versions
- **README.md**: Description, installation (\`npm install\`), usage examples, environment variables if any`,
  componentPatterns: `
- ESM: \`import fs from 'node:fs';\` and \`import { something } from 'package';\`
- CLI args: Use \`process.argv.slice(2)\` for simple scripts or commander package for complex CLI
- Error handling: \`try/catch\` with \`process.exit(1)\` on fatal errors
- Async: \`async function main() { ... } main().catch(err => { console.error(err); process.exit(1); });\``,
  contentGuidance: `Use modern Node.js patterns: ESM imports (not require), async/await, proper error handling with process.exit codes. package.json must have "type": "module" and list all dependencies. Include meaningful error messages. README must show installation and usage with actual command examples.`,
};
