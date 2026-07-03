module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // React
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',              // Not needed in modern React projects
    'react/react-in-jsx-scope': 'off',      // Not needed with React 17+ JSX transform
    'react/no-unescaped-entities': 'off',   // Allow apostrophes in JSX text

    // React Refresh
    'react-refresh/only-export-components': 'off',

    // Hooks — set-state-in-effect triggers false positives on Radix/Embla UI
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks/exhaustive-deps': 'off',

    // Unused vars — warn only, ignore vars prefixed with _
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_|^React$', argsIgnorePattern: '^_' }],
  },
}
