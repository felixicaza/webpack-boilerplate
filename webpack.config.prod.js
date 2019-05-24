const path = require('path'),
   merge = require('webpack-merge'),
   glob = require('glob'),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   FileManagerPlugin = require('filemanager-webpack-plugin'),
   PurgecssPlugin = require('purgecss-webpack-plugin'),
   CompressionPlugin = require('compression-webpack-plugin'),
   HardSourceWebpackPlugin = require('hard-source-webpack-plugin'),
   Critters = require('critters-webpack-plugin'),
   base = require('./webpack.config.js'),
   PATHS = { src: path.join(__dirname, 'src') };

const production = merge(base, {
   mode: 'production',
   output: {
      filename: path.join('js', '[name].min.[chunkhash:7].js'),
      chunkFilename: path.join('js', '[name].min.[chunkhash:7].js'),
   },
   optimization: {
      splitChunks: {
         chunks: 'all',
         minSize: 30000,
         maxSize: 0,
         minChunks: 1,
         maxAsyncRequests: 5,
         maxInitialRequests: 3,
         minSize: 0,
         automaticNameDelimiter: '-',
         name: true,
         cacheGroups: {
            default: {
               minChunks: 2,
               priority: -20,
               reuseExistingChunk: true,
            },
            vendors: {
               test: /[\\/]node_modules[\\/]/,
               priority: -10,
            },
         },
      },
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
      new PurgecssPlugin({
         paths: glob.sync(`${PATHS.src}/**/*.pug`, { nodir: true }),
      }),
      new Critters({
         preload: 'default',
      }),
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
