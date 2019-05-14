const path = require('path'),
   MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
   entry: {
      main: ['./src/js/index.js'],
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
                     name: '[name].[hash].[ext]',
                     outputPath: 'img/',
                  },
               },
            ],
         },
      ],
   },
};

module.exports = config;
