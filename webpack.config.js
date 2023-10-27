const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// @todo
// [link] https://dev.to/alecgodwin/how-to-setup-webpack-and-babel-for-es6-dpk

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js'
  },
  devServer: {
    static: './dist',
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        
        // The order of execution is from right to left
        // 1) postcss-loader  2) css-loader  3) MiniCssExt...
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  }
};