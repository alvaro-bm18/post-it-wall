const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // APP ENTRY POINT
  entry: path.join(__dirname, 'src', 'app', 'index.js'),

  // OUTPUT DIRECTORY
  output: {
    path: path.join(__dirname, 'src', 'public'),
    filename: 'bundle.js'
  },

  // EVIROMENT MODE
  mode: process.env.NODE_ENV || 'development',
  devtool: "eval-source-map",

  // VALID THE EXTENSIONS FOR ES5/6 AND REACT(JSX)
  // LOADERS
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [new MiniCssExtractPlugin()],

  // PATH RESOLVE
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
};