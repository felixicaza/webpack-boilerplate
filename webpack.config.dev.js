const merge = require('webpack-merge'),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   base = require('./webpack.config.js');

const development = merge(base, {
   mode: 'development',
   devtool: 'eval',
   output: {
      filename: 'js/bundle.[hash:3].js',
      chunkFilename: 'js/vendor.[hash:3].js',
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.pug',
         filename: 'index.html',
         title: 'Webpack Environment',
         minify: false,
      }),
      new MiniCssExtractPlugin({
         filename: 'css/bundle.[hash:3].css',
         chunkFilenmae: 'css/vendor.[hash:3].css',
      }),
   ],
});

module.exports = development;
