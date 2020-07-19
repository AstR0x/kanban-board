const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pathToPublicFile = name => path.join(__dirname, 'public', name);

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`;


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: pathToPublicFile('index.html'),
      templateParameters: {
        'PLUS_ICON': './assets/plus.svg',
        'CLOSE_ICON': './assets/close.svg',
      },
    }),
    new CopyPlugin(
      {
        patterns: [
          {
            from: pathToPublicFile('favicon.ico'),
            to: path.resolve(__dirname, 'build'),
          },
        ],
      }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  devServer: {
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
