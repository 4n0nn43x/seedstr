import type { CategoryTemplate } from './shared.js';

export const dataAnalysisTemplate: CategoryTemplate = {
  type: 'script',
  fileStructure: `analysis.py, requirements.txt, README.md, data/sample.csv (optional: utils.py, visualize.py)`,
  sectionBlueprint: `
- **analysis.py**: Main analysis script — load data, clean/transform, analyze, output results/charts
- **requirements.txt**: pandas, numpy, matplotlib (+ others as needed) with pinned versions
- **data/sample.csv**: Small but realistic sample dataset (10-50 rows) demonstrating the expected input format
- **README.md**: Description, data format expected, installation, usage, output explanation
- **visualize.py** (optional): Separate visualization functions if charts are complex`,
  componentPatterns: `
- Data loading: \`df = pd.read_csv('data/sample.csv')\` with \`try/except FileNotFoundError\`
- Analysis pipeline: Load → Clean (dropna, type conversion) → Transform (groupby, pivot) → Analyze (stats, aggregations) → Output (print summary + save charts)
- Visualization: \`fig, axes = plt.subplots(1, 2, figsize=(12, 5))\` with proper labels, titles, \`plt.tight_layout()\`, \`plt.savefig('output/chart.png')\`
- Output: Print formatted summary to console + save charts as PNG files`,
  contentGuidance: `Include realistic sample data in data/sample.csv with headers and 10-50 representative rows. Analysis must produce meaningful insights — not just "print df.describe()". Generate at least 2 visualizations (charts) saved as PNG. Use pandas for data manipulation, matplotlib for charts. Print a clear summary of findings to console. README must explain what the analysis does and how to interpret results.`,
};
