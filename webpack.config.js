const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const configObj = {};
  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
  ];

  if (isProd) {
    basePlugins.push(
      new ImageminPlugin({
        bail: false,
        cache: true,
        imageminOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      })
    );
  }
  return basePlugins;
};

module.exports = {
  mode: 'development',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
  },
  devServer: {
    port: 3000,
    open: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|svg|mp3|gif)$/i,
        loader: 'file-loader',
        options: {
          name: (file) => {
            let dirNameInsideAssets = path.relative(
              path.join(__dirname, 'src'),
              path.dirname(file)
            );
            return `${dirNameInsideAssets}/[name].[ext]`;
          },
        },
      },
    ],
  },
  optimization: optimization(),
  plugins: plugins(),
};
