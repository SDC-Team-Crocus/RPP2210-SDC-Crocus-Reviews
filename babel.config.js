// Node.js supports esm syntax only from v16, but jest doesn't support it yet. Therefore, you have 2 choices:

// 1. Don't use the esm syntax (import / export)
// 2. Add jest-babel with it's config to transpile (convert) esm syntax to cjs one.

module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};