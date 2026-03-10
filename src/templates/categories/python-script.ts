import type { CategoryTemplate } from './shared.js';

export const pythonScriptTemplate: CategoryTemplate = {
  type: 'script',
  fileStructure: `main.py, requirements.txt, README.md (optional: config.py, utils.py)`,
  sectionBlueprint: `
- **main.py**: Entry point with \`if __name__ == '__main__':\` block, argparse CLI arguments, main logic
- **requirements.txt**: One package per line with pinned versions (e.g., requests==2.31.0)
- **README.md**: Project description, requirements, installation (\`pip install -r requirements.txt\`), usage examples with actual CLI commands
- **config.py** (optional): Constants, configuration variables, default values
- **utils.py** (optional): Helper functions, reusable utilities`,
  componentPatterns: `
- Shebang: \`#!/usr/bin/env python3\` at top of main.py
- CLI: \`import argparse; parser = argparse.ArgumentParser(description='...'); parser.add_argument('--flag', ...)\`
- Logging: \`import logging; logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')\`
- Error handling: \`try/except\` with specific exception types, not bare \`except:\``,
  contentGuidance: `Write production-quality Python: type hints on all functions, docstrings (Google style), proper error handling with specific exceptions, logging instead of print(), argparse for CLI interface. Include a \`if __name__ == '__main__':\` guard. requirements.txt must list all non-stdlib imports with version pins. README must show actual usage examples.`,
};
