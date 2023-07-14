const Path = require('path');
const Html = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: 'main.js',
    path: Path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }, { test: /\.ttf$/i, type: 'asset/resource' }],
  },
  plugins: [new Html({ template: './src/index.html' })],
};