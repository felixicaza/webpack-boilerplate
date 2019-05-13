const merge = require('webpack-merge'),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   base = require('./webpack.config.js');

const development = merge(base, {
   mode: 'development',
   devtool: 'eval',
   output: {
      filename: 'js/bundle.[hash].js',
      chunkFilename: 'js/vendor.[hash].js',
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.pug',
         filename: 'index.html',
         title: 'Webpack Environment',
         minify: false,
      }),
      new MiniCssExtractPlugin({
         filename: 'css/bundle.[hash].css',
         chunkFilenmae: 'css/vendor.[hash].css',
      }),
   ],
});

module.exports = development;
