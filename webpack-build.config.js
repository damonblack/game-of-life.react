/* eslint-disable no-var,object-shorthand,prefer-template */

var path = require('path')
var assign = require('lodash.assign')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var PATHS = {
  OUTPUT : path.join(__dirname, 'dist'),
  SOURCE : path.join(__dirname, 'src')
}

var config = {
  entry: [PATHS.SOURCE + '/app.jsx'],
  output : {
    path : PATHS.OUTPUT,
    filename : 'game-of-life.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?$/,
        exclude : /node_modules/,
        loader : 'babel'
      },
      {
        test : /\.css$/,
        exclude : /node_modules/,
        loader : ExtractTextPlugin.extract('style',
          'css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test : /sinon\.js$/,
        loader : 'imports?define=>false,require=>false'
      }
    ]
  },
  resolve : {
    extensions : ['', '.js', '.jsx'],
    alias : {
      sinon : 'sinon/pkg/sinon',
      src : PATHS.SOURCE
    }
  },
  plugins : [
    new ExtractTextPlugin('game-of-life.css', { allChunks : true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
    })
  ],
  postcss : [
    require('postcss-normalize'),
    require('autoprefixer')
  ]
};

module.exports = config;

/* eslint-enable no-var,object-shorthand,prefer-template */
