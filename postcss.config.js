module.exports = {
  plugins: [
    'autoprefixer',
    ['cssnano', {
      preset: 'advanced',
      safe: true,
      autoprefixer: { add: true },
      reduceIdents: false,
    }],
  ],
};
