const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const baseConfig = require('./webpack.config.base.js')

const translationBuilder = require('./tasks/buildTranslations')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // contentBase: './',
    // contentBasePublicPath: '/',
    // publicPath: '/',
    host: '0.0.0.0',
    disableHostCheck: true,
    overlay: true,
    // hot: true,
    historyApiFallback: true,
    // before: async (app, server, compiler) => {
    //   app.get('*', async function (req, res, next) {
    //     await translationBuilder()
    //     next()
    //     // res.json({ success: true })
    //   })
    //   // app.post('/user/login', function(req, res, next) {
    //   //     res.json({success: true})
    //   // });
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Animal Crossing New Horizons • Metakit.gg',
      template: 'src/index.html',
      scriptLoading: 'defer',
      filename: 'index.html',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false,
    }),
  ],
  output: {
    path: '/',
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
    // publicPath: '/',
  },
})
