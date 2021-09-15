
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const WebpackObfuscator = require('webpack-obfuscator');
const mode = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  
  mode: mode,

  entry: "./src/index.js",

  devtool: (mode === 'development') ? 'inline-source-map' : false,

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  module: {
    rules: (function () {
      
      // faster compiling 
      if (mode === 'development') return [
        {
          test: /\.vue$/,
          use: "vue-loader"
        },
        {
          test: /\.js$/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"]
        }
      ];

      if (mode === 'production') return [
        {
          test: /\.vue$/,
          use: "vue-loader"
        },
  
        {
          test: /\.js$/,
          loader: "babel-loader"
        },
  
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"]
        }

        // .. and many more 
      ];

    })(),

  },

  output: {
    // path: path.join(__dirname, "../dist"),
    path: path.join(__dirname, "../demo/scrapbook/dist"),
    filename: "bundle.js"
  },

  devServer: {
    // contentBase: path.join(__dirname, "../public"),
    // contentBase: path.join(__dirname, ".."),
    contentBase: path.join(__dirname, "../demo/scrapbook/"),
    host: '0.0.0.0',
    port: 3012,
    publicPath: "/dist/",
    watchOptions: {
      ignored: /node_modules/
    },
    writeToDisk: true,
  },

  plugins: [ 
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      // ...
    }),
  ]
  
};
