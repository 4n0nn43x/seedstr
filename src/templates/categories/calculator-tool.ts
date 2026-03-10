import type { CategoryTemplate } from './shared.js';

export const calculatorToolTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, app.js, README.md`,
  sectionBlueprint: `
- **Header**: Tool name, brief description, icon
- **Input area**: Appropriate input fields for the tool (text inputs, selects, sliders, textareas), clearly labeled with placeholders
- **Action buttons**: Primary "Calculate/Convert/Generate" button, secondary "Clear/Reset" button
- **Output/Result area**: Styled result display, large readable output, copy-to-clipboard button with success feedback
- **History panel**: List of recent calculations/conversions (stored in Alpine.js data or localStorage), click to reload, clear history button
- **Real-time preview**: If applicable, show live preview as user types (debounced input handler)
- **Info section**: Brief explanation of the tool's formula/logic, tips for usage`,
  componentPatterns: `
- Input group: \`<label class="block text-sm font-medium text-gray-700 mb-1">\` + \`<input class="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20">\`
- Result display: \`bg-gray-50 rounded-xl p-6 border border-gray-100\` with large \`text-3xl font-bold text-primary-600\`
- Copy button: \`navigator.clipboard.writeText(result)\` with toast "Copied!" feedback`,
  contentGuidance: `The tool MUST actually work — implement real calculation/conversion logic in JavaScript. Input validation is required (handle empty, NaN, negative where inappropriate). Show clear error messages for invalid input. Real-time preview when possible. History should persist across page reloads via localStorage. Copy-to-clipboard must work.`,
};
