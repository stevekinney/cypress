module.exports = {
  darkMode: 'class', // This can be 'media' if preferred.
  mode: 'jit',
  // Don't add a glob below `public` as Rollup doesn't
  // recognize them and will rebuild in an infinite loop.
  purge: ['./src/**/*.svelte', './src/**/*.html', './public/index.html'],
  theme: {},
  variants: {},
  plugins: [],
};
