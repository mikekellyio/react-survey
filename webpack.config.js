const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'app/styles')
};

process.env.BABEL_ENV = TARGET;

const common = {
  devtool: 'eval-source-map',
  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        loaders: ['style', 'css'],
        // Include accepts either a path or an array of paths.
        includes: [PATHS.app, 'node_modules']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.style
      },
      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only app files! Without this it will go through entire project.
        // In addition to being slow, that will most likely result in an error.
        include: PATHS.app
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },
      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, PATHS.style)]
  }
};


// Default configuration
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')

        // You can set this to JSON.stringify('development') for your
        // development target to force NODE_ENV to development mode
        // no matter what
      }),
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  });

}

if(TARGET === 'build') {
  module.exports = merge(common, {
    plugins: [
      // Setting DefinePlugin affects React library size!
      // DefinePlugin replaces content "as is" so we need some extra quotes
      // for the generated code to make sense
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'

        // You can set this to JSON.stringify('development') for your
        // development target to force NODE_ENV to development mode
        // no matter what
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
