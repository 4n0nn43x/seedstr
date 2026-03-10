import type { CategoryTemplate } from './shared.js';

export const automationTemplate: CategoryTemplate = {
  type: 'script',
  fileStructure: `main.py, requirements.txt, README.md, .env.example (optional: config.py)`,
  sectionBlueprint: `
- **main.py**: Entry point with CLI arguments including \`--dry-run\` flag, main automation logic, logging
- **requirements.txt**: Dependencies with pinned versions
- **.env.example**: Template showing required environment variables (API keys, URLs) with placeholder values
- **README.md**: Description, setup instructions, environment variables documentation, usage with examples, dry-run explanation
- **config.py** (optional): Load .env variables, default settings, configurable parameters`,
  componentPatterns: `
- Dry-run: \`parser.add_argument('--dry-run', action='store_true', help='Preview actions without executing')\` — check throughout code
- Retry logic: \`for attempt in range(max_retries): try: ... break except Exception: time.sleep(2 ** attempt)\`
- Idempotent: Check state before modifying (e.g., \`if not exists: create()\`), log skipped actions
- .env loading: \`from dotenv import load_dotenv; load_dotenv(); API_KEY = os.getenv('API_KEY')\``,
  contentGuidance: `Build idempotent automation: operations should be safe to re-run. Include --dry-run mode that previews all actions without executing. Implement retry logic with exponential backoff for network operations. Use .env for secrets/configuration, never hardcode credentials. Comprehensive logging (INFO for actions, DEBUG for details, WARNING for retries, ERROR for failures). README must document all environment variables.`,
};
