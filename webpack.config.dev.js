const path = require('path'),
   merge = require('webpack-merge'),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   Critters = require('critters-webpack-plugin'),
   ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin'),
   ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
   base = require('./webpack.config.js');

const development = merge(base, {
   mode: 'development',
   devtool: 'eval',
   output: {
      filename: path.join('js', '[name].[hash:7].js'),
      chunkFilename: path.join('js', '[name].[hash:7].js'),
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.pug',
         title: 'Webpack Environment',
         minify: false,
      }),
      new MiniCssExtractPlugin({
         filename: path.join('css', '[name].[hash:7].css'),
         chunkFilename: path.join('css', '[name].[hash:7].css'),
      }),
      new Critters({
         preload: 'default',
         compress: false,
      }),
      new ScriptExtHtmlWebpackPlugin({
         defaultAttribute: 'defer',
      }),
      new ResourceHintWebpackPlugin(),
   ],
});

module.exports = development;
