module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['>1%', 'last 4 versions'],
        }),
      ],
    },
  },
};
