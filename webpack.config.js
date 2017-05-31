const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './src/index',
    './src/styles/styles'
  ],
  output: {
    path: resolve(__dirname + '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, 'src')
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
        test: /(\.css)$/,
        use: ['style-loader','raw-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  }
};
