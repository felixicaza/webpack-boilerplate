const path = require('path'),
   merge = require('webpack-merge'),
   glob = require('glob'),
   HtmlWebpackPlugin = require('html-webpack-plugin'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   PreloadWebpackPlugin = require('preload-webpack-plugin'),
   FileManagerPlugin = require('filemanager-webpack-plugin'),
   PurgecssPlugin = require('purgecss-webpack-plugin'),
   CompressionPlugin = require('compression-webpack-plugin'),
   HardSourceWebpackPlugin = require('hard-source-webpack-plugin'),
   base = require('./webpack.config.js'),
   PATHS = { src: path.join(__dirname, 'src') };

const production = merge(base, {
   mode: 'production',
   output: {
      filename: 'js/bundle.min.[chunkhash].js',
      chunkFilename: 'js/vendor.min.[chunkhash].js',
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
         automaticNameDelimiter: '~',
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
         filename: 'index.html',
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
      new PreloadWebpackPlugin({
         rel: 'preload',
         as(entry) {
            if (/\.css$/.test(entry)) return 'style';
            if (/\.(woff(2)?|ttf|eot)$/.test(entry)) return 'font';
            if (/\.(png|jpe?g|svg|ico|webp)$/.test(entry)) return 'image';
            return 'script';
         },
         include: 'allChunks',
      }),
      new MiniCssExtractPlugin({
         filename: 'css/bundle.min.[chunkhash].css',
         chunkFilename: 'css/vendor.min.[chunkshash].css',
      }),
      new PurgecssPlugin({
         paths: glob.sync(`${PATHS.src}/**/*.pug`, { nodir: true }),
      }),
      new FileManagerPlugin({
         onStart: {
            delete: ['./build'],
         },
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
