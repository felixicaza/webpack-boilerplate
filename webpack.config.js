const path = require('path'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin'),
   PurgecssPlugin = require('purgecss-webpack-plugin'),
   glob = require('glob'),
   PATHS = { src: path.join(__dirname, 'src') };

const config = {
   entry: {
      bundle: ['./src/js/index.js'],
   },
   output: {
      path: path.resolve(__dirname, 'build'),
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
            test: /\.(sa|sc)ss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                     publicPath: '../',
                  },
               },
               {
                  loader: 'css-loader',
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
      ],
   },
   plugins: [
      new PurgecssPlugin({
         paths: glob.sync(`${PATHS.src}/**/*.pug`, { nodir: true }),
      }),
   ]
};

module.exports = config;
