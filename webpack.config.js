const path = require('path'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   PurgecssPlugin = require('purgecss-webpack-plugin'),
   BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
   glob = require('glob'),
   PATHS = { src: path.join(__dirname, 'src') };

const config = {
   entry: {
      bundle: ['./src/js/index.js'],
   },
   output: {
      path: path.resolve(__dirname, 'build'),
   },
   optimization: {
      runtimeChunk: 'single',
      splitChunks: {
         chunks: 'all',
         minSize: 0,
         maxInitialRequests: Infinity,
         cacheGroups: {
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name(module) {
                  const packageName = module.context.match(
                     /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                  )[1];
                  return `vendors.${packageName.replace('@', '')}`;
               },
            },
         },
      },
   },
   performance: {
      hints: false,
      maxEntrypointSize: 500000,
      maxAssetSize: 200000,
   },
   module: {
      rules: [
         {
            test: /\.pug$/,
            use: {
               loader: 'pug-loader',
               options: {
                  pretty: true,
               },
            },
         },
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     publicPath: '../',
                  },
               },
               {
                  loader: 'fast-css-loader',
               },
               {
                  loader: 'postcss-loader',
               },
               {
                  loader: 'sass-loader',
               },
            ],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  cacheDirectory: true,
               },
            },
         },
         {
            test: /\.(jpe?g|png|gif|mp4|svg|webp|ico)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[hash:7].[ext]',
                     outputPath: 'img/',
                  },
               },
            ],
         },
         {
            test: /\.modernizrrc\.js$/,
            loader: 'webpack-modernizr-loader',
         },
      ],
   },
   resolve: {
      alias: {
         modernizr$: path.resolve(__dirname, './.modernizrrc.js'),
      },
   },
   plugins: [
      new PurgecssPlugin({
         paths: glob.sync(`${PATHS.src}/**/*.pug`, { nodir: true }),
      }),
      new BundleAnalyzerPlugin(),
   ],
};

module.exports = config;
