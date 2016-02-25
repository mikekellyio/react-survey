var path = require('path');

config = {
  entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'app')
        }, {
          test: /\.css$/, // Only .css files
          loader: 'style!css' // Run both loaders
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass'
        }]
    }
};

module.exports = config;
