import { logger } from "../utils/logger.js";

/**
 * Basic code validation for generated project files.
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

export default { validateFile, validateProject, validateHTML, validateJS, validateCSS };
