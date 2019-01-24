const fs = require('fs');

module.exports = {
  lintOnSave: false,
  css: {
    extract: false,
    // loaderOptions: {
    //   sass: {
    //     data: fs.readFileSync('src/assets/sass/mixins.scss', 'utf-8'),
    //     filename: '[name].[ext]',
    //   },
    // },
  },
};
