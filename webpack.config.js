// path for source code
const path = require('path')
// clean output
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// creation of HTML files to serve your webpack bundles
const HTMLWebpackPlugin = require('html-webpack-plugin')
// Copies individual files or entire directories, which already exist, to the build directory
const CopyPlugin = require('copy-webpack-plugin')
// extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

// function to add pattern
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}
// entry point
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      // import '../../../../../../core/Component
      // import '@core/Component
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  // This option controls if and how source maps are generated.
  devtool: isDev ? 'source-map' : false,
  //  Quickly develop an application
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  // loaders
  module: {
    rules: [
      {
        // Loads a Sass/SCSS file and compiles it to CSS.
        test: /\.s[ac]ss$/i,
        use: [
          {
            // hot loader
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        // Сompiler for writing next generation JavaScript.
        test: /\.js$/,
        exclude: /node_modules/,
        // local array with loaders
        use: jsLoaders()
      }
    ]
  }
}
