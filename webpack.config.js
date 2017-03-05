// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  devtool: 'eval-source-map',
  entry: {
    app: './src/index.js',
    vendors: ['react', 'react-dom']
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    path: `../CommonManage/src/main/resources/static`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader: "css-loader"})
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader: "css-loader!less-loader"})
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      }
    ]
  },  
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "vendors", filename: "vendors.js"}),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //new HtmlWebpackPlugin({template: './src/index.html'}),//据我所知，这个东西会把我项目里的index.html生成一下，并自动把Webpack生成的bundle.js、vendors.js、bundle.css引用到新生成的页面里去
    new ExtractTextPlugin("./bundle.css")
  ]
};

module.exports = config;