export default {
  /**
   * TypeScript & TSX files - run ESLint with auto-fix
   * Lints React components, TypeScript files with:
   * - TypeScript ESLint rules
   * - React hooks rules
   * - React refresh rules
   */
  "*.{ts,tsx}": ["eslint --fix"],

  /**
   * JSON files - validate format
   * Ensures package.json, tsconfig.json, and other JSON configs are valid
   */
  "*.json": ["eslint --fix"],

  /**
   * Documentation files - no linting (optional check)
   * You can add markdown linting here if needed
   */
  "*.md": [],
};
