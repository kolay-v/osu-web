const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const config = {
  mode: 'development',
  devtool: 'none',
  output: {
    path: undefined
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    hot: true,
    contentBase: path.resolve(__dirname, '..', 'public'),
    publicPath: '/',
    host: '0.0.0.0',
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true
    })
  ]
}

module.exports = merge.smart(config, baseConfig)
