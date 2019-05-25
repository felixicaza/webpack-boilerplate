const path = require('path'),
   merge = require('webpack-merge'),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   FileManagerPlugin = require('filemanager-webpack-plugin'),
   CompressionPlugin = require('compression-webpack-plugin'),
   HardSourceWebpackPlugin = require('hard-source-webpack-plugin'),
   Critters = require('critters-webpack-plugin'),
   ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin'),
   ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
   base = require('./webpack.config.js');

const production = merge(base, {
   mode: 'production',
   output: {
      filename: path.join('js', '[name].min.[chunkhash:7].js'),
      chunkFilename: path.join('js', '[name].min.[chunkhash:7].js'),
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.pug',
         title: 'Webpack Environment',
         minify: {
            removeStyleLinkTypeAttributes: true,
            collapseInlineTagWhitespace: true,
            removeScriptTypeAttributes: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            removeEmptyElements: true,
            collapseWhitespace: true,
            useShortDoctype: true,
            removeComments: true,
         },
      }),
      new MiniCssExtractPlugin({
         filename: path.join('css', '[name].min.[chunkhash:7].css'),
         chunkFilename: path.join('css', '[name].min.[chunkhash:7].css'),
      }),
      new Critters({
         preload: 'default',
      }),
      new ScriptExtHtmlWebpackPlugin({
         defaultAttribute: 'defer',
      }),
      new ResourceHintWebpackPlugin(),
      new FileManagerPlugin({
         onStart: {
            delete: ['./build'],
         },
         onEnd: {
            copy: [
               {source: './src/img/favicons/apple-touch-icon-180x180-precomposed.png', destination: './build/img/favicons'},
               {source: './src/img/favicons/apple-touch-icon.png', destination: './build/img/favicons'},
               {source: './src/img/favicons/android-chrome-192x192.png', destination: './build/img/favicons'},
               {source: './src/img/favicons/favicon-32x32.png', destination: './build/img/favicons'},
               {source: './src/img/favicons/favicon-16x16.png', destination: './build/img/favicons'},
               {source: './src/img/favicons/favicon-32x32.ico', destination: './build/img/favicons'},
               {source: './src/img/favicons/favicon-16x16.ico', destination: './build/img/favicons'},
               {source: './src/img/favicons/safari-pinned-tab.svg', destination: './build/img/favicons'},
               {source: './src/img/favicons/mstile-144x144.png', destination: './build/img/favicons'},
            ]
         }
      }),
      new CompressionPlugin({
         algorithm: 'gzip',
         compressionOptions: { level: 9 },
         test: /\.(html|css|js)$/,
         filename: '[path].gz[query]',
      }),
      new CompressionPlugin({
         algorithm: 'brotliCompress',
         compressionOptions: { level: 11 },
         test: /\.(html|css|js)$/,
         filename: '[path].br[query]',
      }),
      new HardSourceWebpackPlugin(),
   ],
});

module.exports = production;
