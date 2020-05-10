const webpack = require('webpack')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const path = require('path')

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Animal Crossing New Horizons • Metakit.gg',
      template: 'src/index.html',
      filename: '../../index.html',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist', 'js'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/animal-crossing/new-horizons/dist/js/',
    // publicPath: '/',
  },
})
