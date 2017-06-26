var webpack = require('webpack');
var WebpackExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const env = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

module.exports = {
  entry: './scripts/init.js',
  output: {
    path: __dirname,
    filename: 'build/[name].js',
  },
  devtool: isProduction ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          path.resolve(__dirname, 'scripts')
        ]
      },
      {
        test: /\.monk$/,
        use: 'monkberry-loader'
      },
      {
        test: /\.scss$/,
        use: WebpackExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        })
      },
      {
        test: /\.css$/,
        use: WebpackExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new WebpackExtractTextPlugin('[name].css')
  ],
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9009
  }
};