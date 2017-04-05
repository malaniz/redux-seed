var webpack = require('webpack')
var path = require('path')

var config = {
  devtool: 'inline-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: '/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}

module.exports = config
