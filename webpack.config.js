const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'xx',
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    contentBase: 'a'
  }
};