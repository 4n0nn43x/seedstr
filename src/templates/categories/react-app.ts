import type { CategoryTemplate } from './shared.js';

export const reactAppTemplate: CategoryTemplate = {
  type: 'web',
  fileStructure: `index.html, styles.css, README.md`,
  cdnAdditions: `<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>`,
  sectionBlueprint: `
- **index.html**: Contains React/ReactDOM/Babel CDN scripts, a \`<div id="root">\` mount point, and one or more \`<script type="text/babel">\` blocks with JSX components
- **Component architecture**: App (root) > Header, Main content area, Footer. Break into logical sub-components.
- **State management**: Use React.useState for local state, React.useEffect for side effects, React.useContext if sharing state across components
- **Interactivity**: Forms with controlled inputs, event handlers, conditional rendering, list rendering with .map() and keys`,
  componentPatterns: `
- Script block: \`<script type="text/babel">\` wrapping all JSX code
- Component: \`function MyComponent() { const [state, setState] = React.useState(initialValue); return (<div>...</div>); }\`
- Root render: \`const root = ReactDOM.createRoot(document.getElementById('root')); root.render(<App />);\`
- Styling: Use Tailwind classes directly in className attributes. Link styles.css for custom CSS.`,
  contentGuidance: `Use functional components with hooks (useState, useEffect, useContext, useRef). Break the app into 3-5+ meaningful components. All state must be managed with React hooks — no vanilla DOM manipulation. Forms must use controlled inputs. Lists must use .map() with unique keys. Wrap ALL JSX in \`<script type="text/babel">\` blocks. Do NOT use import/export — all components in script tags within index.html. Tailwind classes via className for styling.`,
};
