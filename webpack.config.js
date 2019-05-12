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
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },
         {
            test: /\.(sa|sc)ss$/,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
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
            test: /\.pug$/,
            use: {
               loader: 'pug-loader',
               options: {
                  pretty: true,
               },
            },
         },
      ],
   },
};

module.exports = config;
