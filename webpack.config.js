// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  devtool: 'cheap-module-eval-source-map',
  //eval：es6源码->es5源码，一一对应，且页面刷新时componentDidMount方法里的断点可命中
  //cheap-eval-source-map：es6源码->es5源码，一一对应，且页面刷新时componentDidMount方法里的断点  无法  命中
  //cheap-module-eval-source-map：es6源码->es6源码，一一对应，不过页面刷新时componentDidMount方法里的断点无法命中，只是后续用户操作（鼠标点击、输入等）后的断点可命中
  //eval-source-map：es6源码->es6源码，一一对应，不过页面刷新时componentDidMount方法里的断点无法命中，只是后续用户操作（鼠标点击、输入等）后的断点可命中
  //source-map/nosources-source-map：只有生成后的bundle文件，是压缩的文件，无源码，无法调试，可用生产环境

  entry: {
    bundle: './src/index.js',
    vendors: ['react', 'react-dom']
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    path: `../qifei/src/main/resources/static`,
    filename: '[name].js'
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
        loader: ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader: "css-loader"}),
        options: { minimize: 'true' }
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
    new webpack.optimize.UglifyJsPlugin({minimize: true, parallel: true}),
    //new HtmlWebpackPlugin({template: './src/index.html'}),//据我所知，这个东西会把我项目里的index.html生成一下，并自动把Webpack生成的bundle.js、vendors.js、bundle.css引用到新生成的页面里去
    new ExtractTextPlugin("./bundle.css"),
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("development") 
       }
    })
  ]
};

module.exports = config;