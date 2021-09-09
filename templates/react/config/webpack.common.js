const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const PROJ_ROOT = path.dirname(__dirname);

module.exports = {
  entry: {
    main: path.resolve(PROJ_ROOT, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(PROJ_ROOT, 'dist'),
    filename: 'index.[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
