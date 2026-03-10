import { logger } from "../utils/logger.js";

/**
 * Code validation for generated project files.
 * Checks for common issues that would break functionality.
 */

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate HTML content for common issues
 */
export function validateHTML(content: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for basic structure
  if (!content.includes("<!DOCTYPE html>") && !content.includes("<!doctype html>")) {
    warnings.push("Missing <!DOCTYPE html> declaration");
  }
  if (!content.includes("<html")) {
    errors.push("Missing <html> tag");
  }
  if (!content.includes("<head>") && !content.includes("<head ")) {
    errors.push("Missing <head> section");
  }
  if (!content.includes("<body>") && !content.includes("<body ")) {
    errors.push("Missing <body> section");
  }

  // Check for viewport meta (responsive design)
  if (!content.includes("viewport")) {
    warnings.push("Missing viewport meta tag (may not be responsive)");
  }

  // Check for unclosed tags (basic check)
  const openTags = (content.match(/<(?!\/|!|meta|link|br|hr|img|input)[a-z][a-z0-9]*[^>]*>/gi) || []).length;
  const closeTags = (content.match(/<\/[a-z][a-z0-9]*>/gi) || []).length;
  if (Math.abs(openTags - closeTags) > 5) {
    warnings.push(`Potential unclosed tags: ${openTags} opening vs ${closeTags} closing tags`);
  }

  // Check for lucide.createIcons() call (web projects using Lucide)
  if (content.includes('data-lucide') && !content.includes('lucide.createIcons')) {
    warnings.push("Lucide icons used but lucide.createIcons() not called — icons won't render");
  }

  // Check for React CDN when using text/babel scripts
  if (content.includes('type="text/babel"') || content.includes("type='text/babel'")) {
    if (!content.includes('react') && !content.includes('React')) {
      warnings.push("Babel JSX script found but React CDN not included");
    }
    if (!content.includes('babel') && !content.includes('Babel')) {
      warnings.push("text/babel script type used but Babel standalone not loaded");
    }
  }

  // Check for Chart.js usage without CDN
  if (content.includes('new Chart(') && !content.includes('chart.js') && !content.includes('Chart.js') && !content.includes('chartjs')) {
    warnings.push("Chart.js constructor used but Chart.js CDN may not be included");
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate JavaScript content for syntax issues
 */
export function validateJS(content: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for common syntax issues
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Mismatched braces: ${openBraces} opening vs ${closeBraces} closing`);
  }

  const openParens = (content.match(/\(/g) || []).length;
  const closeParens = (content.match(/\)/g) || []).length;
  if (openParens !== closeParens) {
    errors.push(`Mismatched parentheses: ${openParens} opening vs ${closeParens} closing`);
  }

  // Check for console.error or throw without catch
  if (content.includes("TODO") || content.includes("FIXME")) {
    warnings.push("Contains TODO/FIXME comments — code may be incomplete");
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate CSS content
 */
export function validateCSS(content: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    errors.push(`Mismatched braces: ${openBraces} opening vs ${closeBraces} closing`);
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate Python content for common issues
 */
export function validatePython(content: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for mixed indentation (tabs + spaces)
  const hasSpaces = /^ {2,}/m.test(content);
  const hasTabs = /^\t/m.test(content);
  if (hasSpaces && hasTabs) {
    errors.push("Mixed indentation: both tabs and spaces used (Python will error)");
  }

  // Check for if __name__ == '__main__' guard (in main.py-like files)
  if (content.includes('import ') && content.includes('def ') && !content.includes("if __name__")) {
    warnings.push("Missing 'if __name__ == \"__main__\"' guard — script may run on import");
  }

  // Check for TODO/FIXME
  if (content.includes("TODO") || content.includes("FIXME")) {
    warnings.push("Contains TODO/FIXME comments — code may be incomplete");
  }

  // Check for bare except
  if (/except\s*:/m.test(content)) {
    warnings.push("Bare 'except:' found — should catch specific exceptions");
  }

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Validate a file based on its extension
 */
export function validateFile(path: string, content: string): ValidationResult {
  const ext = path.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'html':
    case 'htm':
      return validateHTML(content);
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'mjs':
      return validateJS(content);
    case 'css':
      return validateCSS(content);
    case 'py':
      return validatePython(content);
    default:
      return { valid: true, errors: [], warnings: [] };
  }
}

/**
 * Validate all files in a project and log results
 */
export function validateProject(files: Map<string, string>): { allValid: boolean; results: Map<string, ValidationResult> } {
  const results = new Map<string, ValidationResult>();
  let allValid = true;

  for (const [path, content] of files) {
    const result = validateFile(path, content);
    results.set(path, result);

    if (!result.valid) {
      allValid = false;
      logger.warn(`Validation errors in ${path}: ${result.errors.join(', ')}`);
    }
    if (result.warnings.length > 0) {
      logger.debug(`Validation warnings in ${path}: ${result.warnings.join(', ')}`);
    }
  }

  return { allValid, results };
}

export default { validateFile, validateProject, validateHTML, validateJS, validateCSS, validatePython };
