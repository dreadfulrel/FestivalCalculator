const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './docs/index',
    './docs/styles/styles'
  ],
  output: {
    path: resolve(__dirname + '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, 'docs')
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test   : /\.css$/,
        loaders: ['style-loader','raw-loader', 'css-loader', 'resolve-url-loader'],
        exclude: /node_modules/
      }, {
        test   : /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  }
};
